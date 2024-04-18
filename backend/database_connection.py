import mysql.connector
from mysql.connector import Error
def connect_and_insert(data):
    try:
        connection = mysql.connector.connect(host='localhost',
                                             database='ocr_image_data',
                                             user='ocradmin',
                                             password='qwerty')

        if connection.is_connected():
                    print("Connected to MySQL")
                    cursor = connection.cursor()

                    # Data to ocr_data
                    cursor.execute("INSERT INTO ocr_data (Filename, Processing_Date, Image_File_Path, Image_Size, File_Size, File_Format) VALUES (%s, NOW(), %s, %s, %s, %s)",
                                (data['filename'], data['image_url'], data['image_size'], data['file_size'], data['file_format']))

                    connection.commit()

                    image_id = cursor.lastrowid

                    # data to procesing_data
                    cursor.execute("INSERT INTO processing_data (Image_ID, Duration_Time, Tesseract_Version, Enhancement_Settings, Page_Segmentation) VALUES (%s, %s, %s, %s, %s)",
                                (image_id, data['duration_time'], data['tesseract_version'], data['enhancement_settings'], data['page_segmentation']))

                    connection.commit()

    except Error as e:
        print("Error while connecting to MySQL", e)
    finally:
        if (connection.is_connected()):
            cursor.close()
            connection.close()
print("MySQL connection closed")