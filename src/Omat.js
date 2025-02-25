import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoremIpsum from 'react-lorem-ipsum';
import { Link } from "react-router-dom";
import Cards from './Cards';
import OmatLisaaMatka from './OmatLisaaMatka';
import { useState } from "react";
import { OmatMatkat } from './OmatMatkat';

function Omat() {

  const [active, setActive] = useState("FirstCard");

  /* JavaScript for toggle Mobile Menu */
  const showMenu = () => {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "0";
  }

  const hideMenu = () => {
    var navLinks = document.getElementById("navLinks");
    navLinks.style.right = "-200px";
  }

  return (
    <div className="App">
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
          <link rel="stylesheet" href="App.css"></link>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" ></link>
        </head>
        <body>
          {/* Omat Matkat */}
          <section className="sub-header">
            <nav>
              <Link to="/koti"><img src={require('./images/logo.png')} alt="logo"></img></Link> {/* } jos ei toimi kokeile {require('./path').default}. SVG toimii erilailla vrt import ja <img src={Logo}/> */}
              <div className="nav-links" id="navLinks">
                <FontAwesomeIcon icon={faXmark} className="fa fa-xmark" onClick={hideMenu} />
                <ul>
                  <Link to="/koti" className="links">Koti</Link>
                  <Link to="/matkakohteet" className="links">Matkakohteet</Link>
                  <Link to="/porukka" className="links">Porukan matkat</Link>
                  <Link to="/omat" className="links">Omat matkat</Link>
                  <Link to="/kayttaja" className="links">Omat tiedot</Link>
                  <Link to="/kirjaudu" className="links">Kirjaudu</Link>
                  <Link to="/rekisteroidy" className="links">Rekisteröidy</Link>
                </ul>
              </div>
              <FontAwesomeIcon icon={faBars} className="fa fa-bars" onClick={showMenu} />
            </nav>
            <h1>Omat matkat</h1>
            <div className="nav-btn-container">
              <nav>
                <div className="nav-btn"><button className="omat-nav-btn omat-selaa-btn" onClick={() => setActive("FirstCard")}>SELAA</button></div>
                <div className="nav-btn"><button className="omat-nav-btn omat-lisaa-btn" onClick={() => setActive("SecondCard")}>LISÄÄ</button></div>
              </nav>
            </div>
          </section>
          <div>
            {active === "FirstCard" && <OmatMatkat></OmatMatkat>}
            {active === "SecondCard" && <OmatLisaaMatka></OmatLisaaMatka>}
          </div>
          <section className="footer">
            <h4>About Us</h4>
            <LoremIpsum></LoremIpsum>
            <p>Made By Ryhmä E</p>
          </section>
        </body>
      </html>
    </div>
  );
}

export { Omat };
