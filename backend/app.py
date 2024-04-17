import os
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename
from flask_cors import CORS
import flask  
from ocr_processing import process_image

app = Flask(__name__)
CORS(app, origins='https://ocr-react-frontend.onrender.com')

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'saved_images')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        if 'file' not in request.files:
            return 'No file part', 400
        file = request.files['file']
        if file.filename == '':
            return 'No selected file', 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            
            return 'File uploaded successfully', 200
        else:
            return 'File upload failed', 400
    
    except Exception as e:
        return 'An error occurred during file upload', 500

@app.route('/process', methods=['POST'])
def process_image_endpoint():
    try:
        data = request.get_json()
        filename = data.get('filename')

        image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        output_folder = 'ocr_results'  

        process_image(image_path, output_folder)

        ocr_result_path = os.path.splitext(filename)[0] + '.txt'
        ocr_result_url = os.path.join(output_folder, ocr_result_path)
        with open(ocr_result_url, 'r') as ocr_file:
            ocr_result = ocr_file.read()

        image_url = flask.request.host_url + flask.request.script_root + '/backend/saved_images/' + filename

        return jsonify({
            'image_url': image_url,
            'ocr_result': ocr_result
        }), 200
    
    except Exception as e:
        return 'An error occurred during OCR processing', 500

@app.route('/backend/saved_images/<filename>')
def uploaded_file(filename):
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
