import React, { useState } from 'react';

function UploadForm() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleFileSelection = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setUploadedFile(file);
    updateUploadedFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setUploadedFile(file);
    updateUploadedFile(file);
  };

  const updateUploadedFile = (file) => {
    const uploadedImageName = document.getElementById("uploaded-image-name");
    uploadedImageName.textContent = file.name;
    uploadedImageName.style.display = 'inline';

    const uploadedImageIcon = document.getElementById("uploaded-image-icon");
    uploadedImageIcon.style.display = 'inline';
  };

  const handleFileUpload = () => {
    if (uploadedFile) {
      setLoading(true);
      uploadFileToBackend(uploadedFile);
    } else {
      console.error('No file selected.');
    }
  };

  const uploadFileToBackend = (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Failed to upload file');
        }
      })
      .then(data => {
        processImage(file.name);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  const processImage = (fileName) => {
    fetch('http://127.0.0.1:5000/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ filename: fileName })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to trigger OCR processing');
        }
        return response.json();
      })
      .then(data => {
        setLoading(false);
        setOcrResult(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const copyText = () => {
    navigator.clipboard.writeText(ocrResult.ocr_result)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch(error => {
        console.error('Error copying text:', error);
      });
  };

  const goToUploadScreen = () => {
    setOcrResult(null);
    window.location.reload();
  };
  return (
    <div>
      <div id="image-to-text" className="container"></div>
      {!ocrResult && !loading && (
        <div>
          <input type="file" id="file-input" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} onChange={handleFileSelection} />
          <div className="image-upload-box" onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className="inner-box upload" onClick={() => document.getElementById('file-input').click()}>
              <i className="fa-regular fa-folder fa-lg icon"></i>
              <span className="second-heading drop-file">Lohistage fail siia või sirvige arvutist</span>
            </div>
            <div className="inner-box display">
              <i id="uploaded-image-icon" className="fa-solid fa-image uploaded-image-icon" style={{ display: 'none' }}></i>
              <span id="uploaded-image-name" className="regular-text" style={{ display: 'none' }}></span>
            </div>
            <button id="process-button" type="button" className="btn btn-outline-light" onClick={handleFileUpload}>Töötle</button>
          </div>
        </div>
      )}

      {loading && (
        <div id="progress-bar-container" className="container-fluid">
          <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="col-12 progress-bar-box">
              <span className="main-heading drop-file">Teostan tekstituvastust</span>
              <div className="progress">
                <div className="progress-bar" id="progress-bar" role="progressbar" style={{ width: '0%' }} aria-valuenow="0"
                  aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {ocrResult && (
        <div id="ocr-result-container" className="container-fluid">
          <div style={{ position: 'relative' }}>
          <i className="fa-solid fa-arrow-left back-arrow-icon" onClick={goToUploadScreen}></i>
          </div>
          <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="col-md-6">
              <div className="image-box">
                <img id="uploaded-image" className="img-fluid" src={ocrResult.image_url} alt="Uploaded" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-box" style={{ overflowY: 'auto', position: 'relative' }}>
                {isCopied ? (
                  <i className="fa-solid fa-check check-icon"></i>
                ) : (
                  <i className="fa-regular fa-copy copy-icon" onClick={copyText}></i>
                )}
                {/* Text format like txt file */}
                <pre style={{ color: 'white' }}>{ocrResult.ocr_result}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UploadForm;