import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import './styles.css';

function App() {
  const [ocrResult, setOcrResult] = useState('');

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#image-to-text">Image to Text</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-to-use">How to Use</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#kkk">KKK</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <UploadForm onOcrResult={setOcrResult} />

      <div id="progress-bar-container" className="container-fluid" style={{ display: 'none' }}>
        {/* Progress bar */}
        <div id="progress-bar-container" className="container-fluid" style={{ display: 'none' }}>
          <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="col-12 progress-bar-box">
              <span className="main-heading drop-file">Performing text recognition</span>
              <div className="progress">
                <div className="progress-bar" id="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ocrResult && (
        <div id="ocr-result-container" className="container-fluid">
          {/* OCR result */}
          <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
            {/* Image box */}
            <div className="col-md-6">
              <div className="image-box">
                {/* Placeholder image */}
                <img id="uploaded-image" className="img-fluid" src="" alt="Uploaded" />
              </div>
            </div>
            {/* Text box */}
            <div className="col-md-6">
              <div className="text-box" style={{ overflowY: 'auto', position: 'relative' }}>
                {/* Display the OCR result text */}
                <span className="regular-text">{ocrResult}</span>
              </div>
            </div>
          </div>
          <div id="toast-container"></div>
        </div>
      )}

      <div id="how-to-use" className="container">
        {/* How to use */}
        <div id="how-to-use" className="container">
          <div className="row mt-5">
            {/* Box 1 */}
            <div className="col-6">
              <div className="custom-box smaller-box">
                <span className="main-heading tool">How to use</span>
                <span className="regular-text">
                  <ol>
                    <li>Upload images</li>
                    <li>Drag and drop Images into the input box
                      or select images from your local device. </li>
                    <li>Press process button </li>
                    <li>Image is being processed </li>
                    <li>After loading it will display the image and
                      the extracted text</li>
                    <li>You can now see the result and copy the text.</li>
                  </ol>
                </span>
              </div>
            </div>
            {/* Box 2 */}
            <div className="col-6">
              <div className="custom-box smaller-box">
                <span className="main-heading format">Supported file formats </span>
                <span className="regular-text">This photo to text converter supports multiple image file formats.
                  You can upload the images in the following file format to get text from them.
                  <ul>
                    <br />
                    <li>JPG</li>
                    <li>PNG</li>
                    <li>JPEG</li>
                  </ul>
                </span>
              </div>
            </div>
          </div>
          {/* Box 3 */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="custom-box bigger-box">
                <span className="main-heading converter">How does the image to text converter work? </span>
                <span className="regular-text">Based on OCR technology, the image to text tool is developed with
                  advanced libraries and text recognition models. Different patterns of characters are classified
                  into different prototypes. Commonly, an Image OCR tool performs the following functions: First,
                  our tool scans and extract text from the Image.Then it does page segmentation and arranges text
                  according to the image. After the text is fully extracted, our tool performs very light text
                  corrections to make it more accurate.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="kkk" className="container">
        {/* KKK */}
        {/* Box 4 */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="custom-box bigger-box-kkk">
              <span className="main-heading kkk">KKK</span>
              <span className="regular-text">
                <ul>
                  <li>What information is stored?
                    <ul>
                      <li>Filename: The name of the uploaded file.</li>
                      <li>Processing Date: The date and time when the image was processed.</li>
                      <li>Image File Path: The location of the processed image file.</li>
                      <li>Unprocessed File Information: Details of files that could not be processed.
                      </li>
                      <li>File Size: The size of the uploaded file.</li>
                      <li>File Format: The format of the uploaded image file.</li>
                      <li>Processing Details:
                        <ul>
                          <li>Completion Date: The date and time when processing was completed.
                          </li>
                          <li>Tesseract Version: The OCR engine version used.</li>
                          <li>Enhancement Settings: Any applied settings for better processing.
                          </li>
                          <li>Page Segmentation: Details of page segmentation if applicable.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <br />
                  <li>Will the information stored in the database be deleted after a certain period?</li>
                  <p>No, the information stored in our database will remain unless otherwise specified.
                  </p>
                  <li>How many files can I process at once?</li>
                  <p>Only one file can be uploaded and is being processed at a time. Press the button back
                    to process a new file.
                  </p>
                </ul>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
