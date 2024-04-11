import os
import pytesseract
import cv2
import numpy as np
import re
from datetime import datetime
from PIL import Image
import math
from database_connection import connect_and_insert

def read_config_file(file_path):
    with open(file_path, 'r') as config_file:
        return config_file.read().strip()

def enhance_image(image):
    border_size = 30
    without_borders = image[border_size:-border_size, border_size:-border_size]
    gray = cv2.cvtColor(without_borders, cv2.COLOR_BGR2GRAY)
    denoised = cv2.fastNlMeansDenoising(gray, None, h=5, templateWindowSize=7, searchWindowSize=21)
    gamma = 0.8
    gamma_corrected = cv2.convertScaleAbs(denoised, alpha=(1 / gamma), beta=0)
    adaptive_thresh = cv2.adaptiveThreshold(gamma_corrected, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                            cv2.THRESH_BINARY, 11, 2)
    return adaptive_thresh

# Text cleanup
def clean_up_text(original_text):
    cleaned_text = re.sub(r'[^\w.,öäüõÖÄÜÕ()\s-]', '', original_text)
    cleaned_text = re.sub(r'\b\w\b', '', cleaned_text)
    cleaned_text = re.sub(r'\b\w{2}\b\s*\n\s*\b\w{2}\b', '', cleaned_text)
    cleaned_text = re.sub(r'\n\s*\n\s*\n+', '\n\n', cleaned_text)
    return cleaned_text

def is_list(ocr_text):
    list_patterns = ["1.", "2.", "3.", "a)", "b)", "c)"]
    return any(pattern in ocr_text for pattern in list_patterns)

def is_table(ocr_text):
    table_patterns = ["|"]
    lines = ocr_text.split('\n')
    num_columns = max(len(line.split()) for line in lines)
    if num_columns > 1:
        return any(any(pattern in line for pattern in table_patterns) for line in lines)
    return False


def is_regular_text(ocr_text):
    regular_text_pattern = r'.{20,}' 
    num_line_breaks = ocr_text.count('\n')
    consecutive_lines = max(len(line.strip()) for line in ocr_text.split('\n'))
    return (re.match(regular_text_pattern, ocr_text) is not None 
            and num_line_breaks >= 2 
            and consecutive_lines >= 3)


def determine_psm(ocr_text):
    if is_regular_text(ocr_text):
        return "--psm 3"  
    elif is_list(ocr_text) and not is_table(ocr_text):
        return "--psm 3"  
    elif is_table(ocr_text) and not is_list(ocr_text): 
        return "--psm 6"
    elif is_list(ocr_text) and is_table(ocr_text): 
        return "--psm 6"
    else:
        return "--psm 3"

# Filesize to readable form
def convert_bytes_to_human_readable(size_bytes):
    """
    Convert bytes to a human-readable format (e.g., KB, MB, GB).
    """
    if size_bytes == 0:
        return "0 bytes"

    units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    exponent = int(math.log(size_bytes, 1024))
    size = size_bytes / (1024 ** exponent)

    formatted_size = f"{size:.2f} {units[exponent]}"
    return formatted_size


def process_image(image_path, output_folder):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    config_file_path = os.path.join(script_dir, 'config', 'tesseract_config.txt')
    
    ocr_config = read_config_file(config_file_path)
    
    image = cv2.imread(image_path)

    start_time = datetime.now()  # Processing start time
    
    # Initial ocr without enhancement
    print(f"Processing image: {image_path}")
    ocr_text = pytesseract.image_to_string(image, config=ocr_config)

    psm = None
    
    # OCR for regular text
    if is_regular_text(ocr_text):
        psm = "--psm 3"
        enhanced_image = image  
    else:
        # Enhancement for non regular text
        enhanced_image = enhance_image(image)
        ocr_text = pytesseract.image_to_string(enhanced_image, config=ocr_config)
        
        # OCR for list/table
        if is_list(ocr_text) or is_table(ocr_text):
            psm = determine_psm(ocr_text)

    ocr_text = pytesseract.image_to_string(enhanced_image, config=f"{ocr_config} -l est --oem 3")

    # Text cleanup
    cleaned_text = clean_up_text(ocr_text)

    # Save cleaned OCR 
    output_filename = os.path.splitext(os.path.basename(image_path))[0] + '.txt'
    output_path = os.path.join(output_folder, output_filename)
    with open(output_path, 'w') as output_file:
        output_file.write(cleaned_text)
    
    #DATABASE INFO 
    image_width, image_height = Image.open(image_path).size

    file_size = os.path.getsize(image_path)

    file_format = os.path.splitext(image_path)[1].replace('.', '')

    processing_date = start_time.strftime('%Y-%m-%d %H:%M:%S')

    enhancement_applied = not np.array_equal(image, enhanced_image)

    enhancement_status = "Yes" if enhancement_applied else "No"

    if psm:
        page_segmentation = psm.split()[1]
    else:
        page_segmentation = determine_psm(ocr_text).split()[1]

    # Duration time
    end_time = datetime.now()  
    duration_time = (end_time - start_time).total_seconds()

    image_dimensions = f"{image_width}x{image_height}"

    file_size_bytes = os.path.getsize(image_path)
    file_size = convert_bytes_to_human_readable(file_size_bytes)

    end_time = datetime.now()  
    duration_time = (end_time - start_time).total_seconds()

    tesseract_version = str(pytesseract.get_tesseract_version())

    data = {
        'filename': os.path.basename(image_path),
        'processing_date': processing_date,
        'image_size': image_dimensions, 
        'file_size': file_size,
        'file_format': file_format,
        'tesseract_version': tesseract_version, 
        'enhancement_settings': enhancement_status,
        'page_segmentation': page_segmentation,
        'duration_time': duration_time,
        'ocr_text': cleaned_text,  
        'image_url': image_path
}

    # Database connection
    connect_and_insert(data)

    return cleaned_text, output_path

