import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { LoremIpsum } from 'react-lorem-ipsum';
import { KohdeLista, KohdeSivu } from './PorukanmatkatLista'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getValue } from '@testing-library/user-event/dist/utils';
import { MatkaSivu } from './PorukanmatkatLista';

function PorukanMatkat() {
  //Muuttujat hakuehtojen tallennukseen
  const [alkupvm, setAlkupvm] = useState("");
  const [loppupvm, setLoppupvm] = useState("");
  const [yksityinen, setYksityinen] = useState(1);
  
  const [url, setUrl] = useState('http://localhost:5000/api/v1/matka?'); //url ilman hakuehtoja
  const [query, setQuery] = useState('');
  const [matkat, setMatkat] = useState([]);
  const otsikot = { alkupvm: "Matkan Alku:", loppupvm: "Matkan loppu:", yksityinen: "Yksityinen:", idmatka: "Matkan ID:", siirry: "Siirry" };

  const [haettu, setHaettu] = useState(false);

  //Queryn kasaus
  const doSearchQuery = (alkupvm, loppupvm, yksityinen) => {
    console.log("Aloitetaan Queryn luonti... ");
    let r = [];
    if (alkupvm != "")r.push("alkupvm=" + alkupvm);
    if (loppupvm != "")r.push("loppupvm=" + loppupvm);
    if (yksityinen != "")r.push("yksityinen=" + yksityinen);
    console.log("alku: "+alkupvm+", loppu: "+loppupvm+", yksityinen: "+yksityinen)
    return r.join("&");
  };

  //Haku napin toiminta
  useEffect(() => {
    const fetchKohde = async () => {
      console.log("Aloitetaan haku...");
      console.log("URL + query: " + url + query);
      const r = await fetch(url + query);
      const data = await r.json();
      setMatkat(data);
      console.log("data: " + data);
      console.log("Kohteet: " + matkat);
    };
    if (query != "") fetchKohde();
  }, [query]);

  const haeClicked = () => {
    setHaettu(true);
    console.log("ALKU: " + alkupvm + ", LOPPU: " + loppupvm);
    console.log("Haku nappia painettu...");
    console.log("URL + query:" + url + query);
    setQuery(doSearchQuery(alkupvm, loppupvm, yksityinen));
  };


  /* JavaScript for toggle Mobile Menu */
  const showMenu = () => {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
  }

  const hideMenu = () => {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
  }

  if(haettu == true){
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
                <h1>Porukan matkat</h1>
              </section>
  
              {/* Matkakohteiden sisältö */}
  
  
              <section class="matkakohteet">
                <div class="matkakohteet-col">
                  <table class="table">
                    <tr>
                      <td>Alkupvm:</td> {/*päivämäärä maxilta? */}
                      <td><input type="date" value={alkupvm} onChange={(e) => setAlkupvm(e.target.value)}></input></td>
                    </tr>
  
                    <tr>
                      <td>loppupvm:</td>
                      <td><input type="date" value={loppupvm} onChange={(e) => setLoppupvm(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <td><button onClick={() => haeClicked()}>Hae matkoja</button></td>
                    </tr>
                  </table>
                  <MatkaSivu matkat={matkat} otsikot={otsikot} yksityinen={yksityinen} />
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
                <h1>Porukan matkat</h1>
              </section>
  
              {/* Matkakohteiden sisältö */}
  
  
              <section class="matkakohteet">
                <div class="matkakohteet-col">
                  <table class="table">
                    <tr>
                      <td>Alkupvm:</td> {/*päivämäärä maxilta? */}
                      <td><input type="date" value={alkupvm} onChange={(e) => setAlkupvm(e.target.value)}></input></td>
                    </tr>
  
                    <tr>
                      <td>loppupvm:</td>
                      <td><input type="date" value={loppupvm} onChange={(e) => setLoppupvm(e.target.value)} /></td>
                    </tr>
                    <tr>
                      <td><button onClick={() => haeClicked()}>Hae matkoja</button></td>
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

export { PorukanMatkat };




//TO DO

//Haku toimimaan (tehty)
//lista (uusi komponennti joka luo listan saatujen tietojan avulla tai luo tiedon avulla suoraan sivulla) (done)
//Lisää kohde (tee uusisivu/rajapinta johon tiedot voi syöttää ja sitten tiedot urlissa tietokantaan)
//laatikot pois maa ja kaupunki kohdista (done)
