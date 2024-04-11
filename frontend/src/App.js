import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import './styles.css';

function App() {
  const [setOcrResult] = useState('');

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

      <div id="how-to-use" className="container">
        {/* How to use */}
        <div id="how-to-use" className="container">
          <div className="row mt-5">
            {/* Box 1 */}
            <div className="col-6">
              <div className="custom-box smaller-box">
                <span className="main-heading tool">Kuidas kasutada?</span>
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
              <span className="main-heading kkk">Korduma kippuvad küsimused</span>
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
                  <p>Korraga saab üles laadida ja töödelda ainult ühe faili. Uue faili töötlemiseks vajutage tagasi nuppu mis asub ekraani vasakul servas.</p>
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
