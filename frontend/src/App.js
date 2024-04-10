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
                <a className="nav-link active" aria-current="page" href="#image-to-text">Pilt tekstiks</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#how-to-use">Kuidas kasutada</a>
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
                {/* OCR result text */}
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
                    <li>Laadige üles pilte</li>
                    <li>Lohista pilt sisendkasti või valige pilte oma kohalikust seadmest</li>
                    <li>Vajutage töötle nuppu</li>
                    <li>Pilti töödeldakse</li>
                    <li>Pärast laadimist kuvatakse pilt ja saadud tekstitulemus</li>
                    <li>Nüüd saate tulemust vaadata ja teksti kopeerida</li>
                  </ol>
                </span>
              </div>
            </div>
            {/* Box 2 */}
            <div className="col-6">
              <div className="custom-box smaller-box">
                <span className="main-heading format">Toetatud failiformaadid</span>
                <span className="regular-text">Selle pildi tekstiks teisendaja toetab mitmeid pildifaili formaate. Saate laadida üles pilte järgmistes failivormingutes, et sealt teksti saada.
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
                <span className="main-heading converter">Kuidas töötab pildist tekstiks teisendaja?</span>
                <span className="regular-text">Põhinedes optilise märgituvastuse (OCR) tehnoloogial, on pildist tekstiks tööriist välja töötatud edasijõudnud raamatukogude ja tekstituvastuse mudelite abil. Erinevaid märgitüüpe klassifitseeritakse erinevatesse prototüüpidesse. Tavaliselt teostab pildi OCR tööriist järgmisi funktsioone: Esiteks skaneerib ja eraldab tööriist teksti pildilt. Seejärel teostab lehekülje segmenteerimist ja paigutab teksti vastavalt pildile. Pärast teksti täielikku eraldamist teeb tööriist väga kergeid tekstikorrektuure, et see oleks täpsem.</span>
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
                  <li>Mis teave on salvestatud?
                    <ul>
                      <li>Failinimi: Üles laaditud faili nimi.</li>
                      <li>Töötlemise kuupäev: Kuupäev ja kellaaeg, mil pilti töödeldi.</li>
                      <li>Pildifaili tee: Töödeldud pildifaili asukoht.</li>
                      <li>Töötlemata failiinfo: Üksikasjad failide kohta, mida ei õnnestunud töödelda.</li>
                      <li>Faili suurus: Üles laaditud faili suurus.</li>
                      <li>Failivorming: Üles laaditud pildifaili vorming.</li>
                      <li>Töötlemise üksikasjad:
                        <ul>
                          <li>Lõpetamise kuupäev: Kuupäev ja kellaaeg, mil töötlemine lõpetati.</li>
                          <li>Tesseracti versioon: Kasutatud OCR-mootori versioon.</li>
                          <li>Täiustamise sätted: Rakendatud sätted paremaks töötlemiseks.</li>
                          <li>Lehekülje segmenteerimine: Lehekülje segmenteerimise üksikasjad vajadusel.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <br />
                  <li>Kas andmed, mis on andmebaasis salvestatud, kustutatakse teatud aja möödudes?</li>
                  <p>Ei, meie andmebaasis olevad andmed jäävad alles, kui ei ole teisiti määratud.</p>
                  <li>Mitu faili saan korraga töödelda?</li>
                  <p>Korraga saab üles laadida ja töödelda ainult ühe faili. Uue faili töötlemiseks vajutage tagasi nuppu.</p>
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
