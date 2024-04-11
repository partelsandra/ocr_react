# Backend Documentation

This repository contains the backend code for OCR application. It consists of a Flask server that handles image processing using OCR (Optical Character Recognition) and interacts with a MySQL database for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Database Connection](#database-connection)
- [Dependencies](#dependencies)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/partelsandra/ocr_react
    ```

2. Navigate to the backend directory:
    ```bash
    cd backend
    ```

3. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
    Ensure MySQL is installed and running on your system.

## Usage

1. Start the Flask server:
    ```bash
    python app.py
    ```
    This will start the Flask server, which will be listening for incoming requests.

2. Upload an image for processing:
    - Send a POST request to the `/upload` endpoint with the image file attached.
    - The server will save the uploaded image to the `saved_images` folder.

3. Process the uploaded image:
    - Send a POST request to the `/process` endpoint with the filename of the uploaded image.
    - The server will process the image using OCR, save the result to a text file in the `ocr_results` folder, and insert relevant data into the MySQL database.
    - The response will include the URL of the processed image and the OCR result.

## Database Connection

- Update the database connection parameters in `database_connection.py` to match your MySQL database configuration (host, database, user, password).
- Ensure that the MySQL server is running and accessible from the backend.

## Dependencies

- Flask: Web framework for building the API endpoints.
- Flask-CORS: Extension for handling Cross-Origin Resource Sharing (CORS) headers.
- PyTesseract: Python wrapper for Google's Tesseract-OCR Engine.
- OpenCV (cv2): Library for computer vision tasks.
- Pillow (PIL): Python Imaging Library for image processing tasks.
- NumPy: Library for numerical computing.
- mysql-connector-python: Library for connecting to MySQL databases.