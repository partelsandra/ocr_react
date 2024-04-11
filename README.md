# OCR Application

This project is an Optical Character Recognition (OCR) application that allows users to upload images and extract text from them. It consists of a frontend built with React for the user interface and a backend built with Flask for image processing and database interaction.

## Tesseract Installation

To use the OCR functionality, you need to install Tesseract-OCR. Follow the instructions [here](https://tesseract-ocr.github.io/tessdoc/Installation.html) to install Tesseract on your system.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/partelsandra/ocr_react
    ```

2. **Navigate to the project directory:**

    ```bash
    cd ocr_react
    ```

3. **Follow the installation instructions for the frontend and backend:**

    For frontend installation, refer to the [frontend README](https://github.com/partelsandra/ocr_react/blob/main/frontend/README.md).

    For backend installation, refer to the [backend README](https://github.com/partelsandra/ocr_react/blob/main/backend/README.md).


## Usage

1. **Start the frontend:**

    Follow the instructions in the frontend README to start the frontend.

2. **Start the backend:**

    Follow the instructions in the backend README to start the backend.

3. **Interact with the application:**

    - Access the frontend at http://localhost:3000 in your web browser.
    - Upload images for OCR processing.
    - View the extracted text results.

## Dependencies

### Frontend

- React: JavaScript library for building user interfaces.
- react-dom: React package for working with the DOM.
- react-scripts: Set of scripts and configuration used by Create React App.

### Backend

- Flask: Web framework for building the API endpoints.
- Flask-CORS: Extension for handling Cross-Origin Resource Sharing (CORS) headers.
- PyTesseract: Python wrapper for Google's Tesseract-OCR Engine.
- OpenCV (cv2): Library for computer vision tasks.
- Pillow (PIL): Python Imaging Library for image processing tasks.
- NumPy: Library for numerical computing.
- mysql-connector-python: Library for connecting to MySQL databases.
