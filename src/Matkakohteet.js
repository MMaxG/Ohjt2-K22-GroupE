import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { LoremIpsum } from 'react-lorem-ipsum';
import { KohdeLista, KohdeSivu } from './KohdeLista'
import { Kohde } from './Kohde'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AddMatkakohde } from './LisaaMatkakohde';
import { getValue } from '@testing-library/user-event/dist/utils';
//import { PoistaKohde } from './PoistaMatkakohde';
import { KohteenSivu } from './MatkakohteenSivu';

function Matkakohteet() {
  //Muuttujat hakuehtojen tallennukseen
  const [nimi, setNimi] = useState("");
  const [maa, setMaa] = useState("");
  const [kaupunki, setKaupunki] = useState("");
  const [url, setUrl] = useState('http://localhost:5000/api/v1/matkakohde?'); //url ilman hakuehtoja
  const [query, setQuery] = useState('');
  const [kohteet, setKohteet] = useState([]);
  const otsikot = { nimi: "Kohteen nimi", maa: "Maa", kaupunki: "Paikkakunta", kuvaus: "Kuvaus", siirry: "Siirry", poista: "Poista", };

  const [haettu, setHaettu] = useState(false);
  const [lisaa, setLisaa] = useState(false);
  const [testiID, setTestiID] = useState(2345);

  //const [poistettavaID, setPoistettavaID] = useState("");
  //const [poistetaan, setPoistetaan] = useState(null);


  //Queryn kasaus
  const doSearchQuery = (nimi, maa, kaupunki) => {
    console.log("Aloitetaan Queryn luonti... ");
    let r = [];
    if (nimi != "") r.push("kohdenimi=" + nimi);
    if (maa != "") r.push("maa=" + maa);
    if (kaupunki != "") r.push("paikkakunta=" + kaupunki);
    console.log("nimi: " + nimi + ", Maa: " + maa + ", Kaupunki: " + kaupunki)
    // laitetaan query-muuttujaan kellonaika jotta haku toteutuu koska state muuttuja on muuttunut
    r.push(Date.now());
    return r.join("&");
  };

  //Haku napin toiminta
  useEffect(() => {
    const fetchKohde = async () => {
      console.log("Aloitetaan haku...");
      console.log("URL + query: " + url + query);
      const r = await fetch(url + query);
      const data = await r.json();
      setKohteet(data);
      console.log("data: " + data);
      console.log("Kohteet: " + kohteet);
    };
    if (query != "") fetchKohde();
  }, [query]);

  const haeClicked = () => {
    setHaettu(true);
    console.log("Haku nappia painettu...");
    console.log("nimi: " + nimi + ", maa: " + maa + ", kaupunki: " + kaupunki);
    setQuery(doSearchQuery(nimi, maa, kaupunki));
  };
  const lisaaClicked = () => {
    setLisaa(true);
    setHaettu(false);
  }
  const palaaCliked = () => {
    setLisaa(false);
    setHaettu(false);
  }


  /* JavaScript for toggle Mobile Menu */
  const showMenu = () => {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
  }

  const hideMenu = () => {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
  }

  if (haettu == true && lisaa == false) {
    return (
      <div className="App">
        <html>
          <head>
            <meta name="viewport" content="with=device-width, initial-scale=1.0"></meta>
            <link rel="stylesheet" href="App.css"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" ></link>
          </head>
          <body>

            {/* Matkakohteet */}
            <section class="sub-header">
              <nav>
                <Link to="/koti"><img src={require('./images/logo.png')} alt="logo"></img></Link> {/* } jos ei toimi kokeile {require('./path').default}. SVG toimii erilailla vrt import ja <img src={Logo}/> */}
                <div class="nav-links" id="navLinks">
                  <FontAwesomeIcon icon={faXmark} class="fa fa-xmark" onClick={hideMenu} />
                  <ul>
                    <Link to="/koti" class="links">Koti</Link>
                    <Link to="/matkakohteet" class="links">Matkakohteet</Link>
                    <Link to="/porukka" class="links">Porukan matkat</Link>
                    <Link to="/omat" class="links">Omat matkat</Link>
                    <Link to="/kayttaja" class="links">Omat tiedot</Link>
                    <Link to="/kirjaudu" class="links">Kirjaudu</Link>
                    <Link to="/rekisteroidy" class="links">Rekisteröidy</Link>
                  </ul>
                </div>
                <FontAwesomeIcon icon={faBars} class="fa fa-bars" onClick={showMenu} />
              </nav>
              <h1>Matkakohteet</h1>
            </section>

            {/* Matkakohteiden sisältö */}


            <section class="matkakohteet">
              <div class="matkakohteet-col">
                <table class="table">
                  <tr>
                    <td>Kohteen nimi:</td>
                    <td><input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)}></input></td>
                  </tr>

                  <tr>
                    <td>Maa:</td>
                    <td><input type="text" value={maa} onChange={(e) => setMaa(e.target.value)} /></td>
                  </tr>

                  <tr>
                    <td>Kaupunki:</td>
                    <td><input type="text" value={kaupunki} onChange={(e) => setKaupunki(e.target.value)} /></td>
                  </tr>

                  <tr>
                    <td><button onClick={() => lisaaClicked()}>Lisää kohde</button></td> {/* laitetaan lisäysvalikko näkyviin */}
                    <td><button onClick={() => haeClicked()}>Hae kohteita</button></td>
                  </tr>
                </table>
                <KohdeLista kohteet={kohteet} otsikot={otsikot} />
                {/*<AddMatkakohde /> {/* Voidaan muuttaa piilotettavaksi tai eri sivuksi */}
              </div>
            </section>

            {/* Footer */}

            <section class="footer">
              {/*<LoremIpsum></LoremIpsum>*/}
              <p>Made By Ryhmä E</p>
            </section>
          </body>
        </html>
      </div>
    );
  }
  else if (haettu == false && lisaa == true) {
    return (
      <div className="App">
        <html>
          <head>
            <meta name="viewport" content="with=device-width, initial-scale=1.0"></meta>
            <link rel="stylesheet" href="App.css"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" ></link>
          </head>
          <body>

            {/* Matkakohteet */}
            <section class="sub-header">
              <nav>
                <Link to="/koti"><img src={require('./images/logo.png')} alt="logo"></img></Link> {/* } jos ei toimi kokeile {require('./path').default}. SVG toimii erilailla vrt import ja <img src={Logo}/> */}
                <div class="nav-links" id="navLinks">
                  <FontAwesomeIcon icon={faXmark} class="fa fa-xmark" onClick={hideMenu} />
                  <ul>
                    <Link to="/koti" class="links">Koti</Link>
                    <Link to="/matkakohteet" class="links">Matkakohteet</Link>
                    <Link to="/porukka" class="links">Porukan matkat</Link>
                    <Link to="/omat" class="links">Omat matkat</Link>
                    <Link to="/kayttaja" class="links">Omat tiedot</Link>
                    <Link to="/kirjaudu" class="links">Kirjaudu</Link>
                    <Link to="/rekisteroidy" class="links">Rekisteröidy</Link>
                  </ul>
                </div>
                <FontAwesomeIcon icon={faBars} class="fa fa-bars" onClick={showMenu} />
              </nav>
              <h1>Matkakohteet</h1>
            </section>

            {/* Matkakohteiden sisältö */}


            <section class="matkakohteet">
              <div class="matkakohteet-col">
                <table>
                  <tr><button onClick={() => palaaCliked()}>PALAA</button></tr>
                  <tr><AddMatkakohde /> {/* Voidaan muuttaa piilotettavaksi tai eri sivuksi */}</tr>
                </table>
              </div>
            </section>

            {/* Footer */}

            <section class="footer">
              {/*<LoremIpsum></LoremIpsum>*/}
              <p>Made By Ryhmä E</p>
            </section>
          </body>
        </html>
      </div>
    );
  }
  else{
    return (
      <div className="App">
        <html>
          <head>
            <meta name="viewport" content="with=device-width, initial-scale=1.0"></meta>
            <link rel="stylesheet" href="App.css"></link>
            <link rel="preconnect" href="https://fonts.googleapis.com"></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" ></link>
          </head>
          <body>

            {/* Matkakohteet */}
            <section class="sub-header">
              <nav>
                <Link to="/koti"><img src={require('./images/logo.png')} alt="logo"></img></Link> {/* } jos ei toimi kokeile {require('./path').default}. SVG toimii erilailla vrt import ja <img src={Logo}/> */}
                <div class="nav-links" id="navLinks">
                  <FontAwesomeIcon icon={faXmark} class="fa fa-xmark" onClick={hideMenu} />
                  <ul>
                    <Link to="/koti" class="links">Koti</Link>
                    <Link to="/matkakohteet" class="links">Matkakohteet</Link>
                    <Link to="/porukka" class="links">Porukan matkat</Link>
                    <Link to="/omat" class="links">Omat matkat</Link>
                    <Link to="/kayttaja" class="links">Omat tiedot</Link>
                    <Link to="/kirjaudu" class="links">Kirjaudu</Link>
                    <Link to="/rekisteroidy" class="links">Rekisteröidy</Link>
                  </ul>
                </div>
                <FontAwesomeIcon icon={faBars} class="fa fa-bars" onClick={showMenu} />
              </nav>
              <h1>Matkakohteet</h1>
            </section>

            {/* Matkakohteiden sisältö */}


            <section class="matkakohteet">
              <div class="matkakohteet-col">
                <table class="table">
                  <tr>
                    <td>Kohteen nimi:</td>
                    <td><input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)}></input></td>
                  </tr>

                  <tr>
                    <td>Maa:</td>
                    <td><input type="text" value={maa} onChange={(e) => setMaa(e.target.value)} /></td>
                  </tr>

                  <tr>
                    <td>Kaupunki:</td>
                    <td><input type="text" value={kaupunki} onChange={(e) => setKaupunki(e.target.value)} /></td>
                  </tr>

                  <tr>
                    <td><button onClick={() => lisaaClicked()}>Lisää kohde</button></td> {/* laitetaan lisäysvalikko näkyviin */}
                    <td><button onClick={() => haeClicked()}>Hae kohteita</button></td>
                  </tr>
                </table>
                
              </div>
            </section>

            {/* Footer */}

            <section class="footer">
              {/*<LoremIpsum></LoremIpsum>*/}
              <p>Made By Ryhmä E</p>
            </section>
          </body>
        </html>
      </div>
    );
  }

}

export { Matkakohteet };




//TO DO

//Haku toimimaan (tehty)
//lista (uusi komponennti joka luo listan saatujen tietojan avulla tai luo tiedon avulla suoraan sivulla) (done)
//Lisää kohde (tee uusisivu/rajapinta johon tiedot voi syöttää ja sitten tiedot urlissa tietokantaan)
//laatikot pois maa ja kaupunki kohdista (done)
