import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoremIpsum from 'react-lorem-ipsum';
import { Link } from 'react-router-dom';

function ErrorPage() {

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
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin></link>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap" ></link>
        </head>
        <body> 
          {/* Koti */}
          <section class="header">
            <nav>
              <Link to="/koti"><img src={require('./images/logo.png')} alt="logo"></img></Link> {/* } jos ei toimi kokeile {require('./path').default}. SVG toimii erilailla vrt import ja <img src={Logo}/> */}
              <div class="nav-links" id="navLinks">
                <FontAwesomeIcon icon={faXmark} class="fa fa-xmark" onClick={hideMenu}/>
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
              <FontAwesomeIcon icon={faBars} class="fa fa-bars" onClick={showMenu}/> 
            </nav>
            <div class="text-box">
              <h1>Error 404</h1>
              <p>Sivua ei löytynyt</p>
              <a href="/koti" class="hero-btn">Siirry takaisin Koti-sivulle</a>
            </div>
          </section>
          <section class="footer">
            <h4>About Us</h4>
            <LoremIpsum></LoremIpsum>
            <p>Made By Ryhmä E</p>
          </section>
        </body>
      </html>
    </div>
  );
}

export default ErrorPage;
