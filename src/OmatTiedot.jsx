import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function OmatTiedot() {

    const [userFname, setUserFname] = useState('')
    const [userLname, setUserLname] = useState('')
    const [userName, setUserName] = useState('')
    const [userLocation, setUserLocation] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userIntro, setUserIntro] = useState('')
    const [userPic, setUserPic] = useState('')

    const showMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "0";
    }

    const hideMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "-200px";
    }

    {/* Tarvitsee backendin */}
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            })
        }).then(res => {
            return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('ERROR updating user info'))
    }

    const fileSelectedHandler = event => {
        setUserPic(event.target.files);
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
                        <h1><FontAwesomeIcon icon={faUser} /> Omat tiedot</h1>
                    </section>
                    <section className="form">
                        <section className="form-heading">
                            <p>Päivitä tietojasi</p>
                        </section>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-travel" id="input-travel-title" name="input-travel-title" value={userFname} placeholder="Etunimi" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Etunimi'} onChange={(e) => setUserFname(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-travel" id="input-travel-destination" name="input-travel-destination" value={userLname} placeholder="Sukunimi" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Sukunimi'} onChange={(e) => setUserLname(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-travel" id="input-travel-destination" name="input-travel-destination" value={userName} placeholder="Nimimerkki" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Nimimerkki'} onChange={(e) => setUserName(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-travel" id="input-travel-destination" name="input-travel-destination" value={userLocation} placeholder="Paikkakunta" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Paikkakunta'} onChange={(e) => setUserLocation(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control form-travel" id="input-travel-destination" name="input-travel-destination" value={userEmail} placeholder="Sähköposti" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Sähköposti'} onChange={(e) => setUserEmail(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <textarea rows="10" className="form-control form-travel" id="input-travel-info" name="input-travel-info" value={userIntro} placeholder="Kerro meille itsestäsi jotain..." onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Kerro meille itsestäsi jotain...'} onChange={(e) => setUserIntro(e.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <label for="input--travel-file">Kuva</label>
                                <input type="file" className="form-control form-travel" id="input--travel-file" name="input-travel-file"  onChange={fileSelectedHandler}></input>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="red-btn hero-btn">PÄIVITÄ</button>
                            </div>
                        </form>
                    </section>
                    
                    <section class="footer">
                        <h4>About Us</h4>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget mi mollis, pulvinar libero et, ultricies nulla. Donec porta vulputate mauris, eu ultrices urna euismod sed. Vestibulum laoreet id purus a semper</p>
                        <p>Made By Ryhmä E</p>
                    </section>
                </body>
            </html>
        </div>
    )
}
export {OmatTiedot} ;