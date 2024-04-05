import React from 'react';

const OCRResult = ({ imageUrl, ocrResult }) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="col-md-6">
          <div className="image-box">
            <img className="img-fluid" src={imageUrl} alt="Uploaded Image" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="text-box" style={{ overflowY: 'auto', position: 'relative' }}>
            <i className="fa-regular fa-copy copy-icon"></i>
            <span className="regular-text">{ocrResult}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OCRResult;
