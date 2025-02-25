import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Rekisteroidy() {

    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')


    /* JavaScript for toggle Mobile Menu */
    const showMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "0";
    }

    const hideMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "-200px";
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/matkaaja', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                etunimi: fname,
                sukunimi: lname,
                nimimerkki: username,
                paikkakunta: "",
                esittely: "",
                kuva: "",
                email: email,
                password: password,
                matkat: ""
            })
        }).then(res => {
            return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('ERROR'))
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
                    {/* Omat Matkat */}
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
                        <h1><FontAwesomeIcon icon={faUser} /> Rekisteröidy</h1>
                    </section>
                    <section className="form">
                        <section className="form-heading">
                            <p>Luo käyttäjä</p>
                        </section>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="input-fname" name="input-fname" value={fname} placeholder="Etunimi" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Etunimi'} onChange={(e) => setFname(e.target.value)}></input> {/* onChange on jsx attribuutti */}
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="input-lname" name="input-lname" value={lname} placeholder="Sukunimi" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Sukunimi'} onChange={(e) => setLname(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="input-username" name="input-username" value={username} placeholder="Käyttäjä" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Käyttäjä'} onChange={(e) => setUsername(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" id="input-email" name="input-email" value={email} placeholder="Sähköposti" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Sähköposti'} onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="input-password" name="input-password" value={password} placeholder="Salasana" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Salasana'} onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="input-password2" name="input-password2" value={password2} placeholder="Vahvista salasana" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Vahvista salasana'} onChange={(e) => setPassword2(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="red-btn hero-btn">Rekisteröidy</button>
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
export { Rekisteroidy };