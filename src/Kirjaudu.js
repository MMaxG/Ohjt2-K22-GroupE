import { useState, useRef, useEffect, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoremIpsum from 'react-lorem-ipsum';
import { Link } from 'react-router-dom';
import axios from "axios";

function Kirjaudu() {

    const [sposti, setSposti] = useState('');
    const [salasana, setSalasana] = useState('');
    //Kun logged on true voidaan näyttää vain kirjautuneiden tietoja
    const [logged, setLogged] = useState(false);
    const LOGIN_URL = 'http://localhost:5000/api/v1/matkaaja';

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const [user, setUser] = useState({password: "", email: ""});
    const [error, setError] = useState("");

    const Login = details => {
        console.log(details);

        if (details.email == adminUser.email && details.password == adminUser.password) {
        console.log("Logged in");
        setUser({
            email: details.email,
            password: details.password
        });
        } else {
            console.log("Details do not match");
            setError("Details do not match");
        }
    }

    const Logout = () => {
        console.log("logging out");
        setUser({ password: "", email: ""});
    }

    const [details, setDetails] = useState({email: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    }

    useEffect(() => {
        {/*userRef.current.focus();*/ }
    }, [])


    const spostiChanged = (event) => {
        setSposti(event.target.value);
    }
    const salasanaChanged = (event) => {
        setSalasana(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get(LOGIN_URL, JSON.stringify({email: sposti, password: salasana}),
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: true
            }
            );
            console.log(JSON.stringify(response?.data));
            setSalasana('');
            setSposti('');
        } catch (err) {

        }
    }


    //Täytyy verrata tietokantaan
    const tarkista = () => {
        if (salasana != '' && sposti != '') {
            setLogged(true);
            console.log("login ok...");
        }
        else {
            console.log("login not ok...");
            setLogged(false);
        }
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
                        <h1>Kirjaudu</h1>
                    </section>
                    <>
                        {(user.email != "") ? (
                            <div className="welcome">
                                <h2>Welcome, <span>Admin</span></h2>
                                <button onClick={Logout}>Logout</button>
                            </div>
                        ) : (
                            <form onSubmit={submitHandler}>
                                <div className="form-inner">
                                    <h2>Login</h2>
                                    {(error != "") ? (<div className="error">{error}</div>) : ""}
                                    <div className="form-group">
                                        <label htmlFor="name">Email:</label>
                                        <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}></input>
                                    </div>
                                    <div className="form-group">   
                                    <label htmlFor="name">Password:</label>
                                        <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}></input>
                                    </div>
                                    <input type="submit" className="red-btn hero-btn login-btn" value="LOGIN"></input>
                                </div>
                            </form>
                        )}
                        {/* {success ? (
                            <section>
                                <h1>Olet kirjautunut sisään</h1>
                                <br></br>
                                <p>
                                    <a href="/">Koti sivu</a>
                                </p>
                            </section>
                        ) : (
                            <section className="kirjaudu">
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <div className="boksi">
                                    <form onSubmit={(e) => handleSubmit(e)}>
                                        <table>
                                            <tr>
                                                <td><label htmlFor="username">Sähköposti osoite: </label></td>
                                                <td><input type="text" id="username" ref={userRef} name="sahkoposti" value={sposti} required onChange={(evt) => spostiChanged(evt)}></input></td>
                                            </tr>
                                            <tr>
                                                <td><label htmlFor="password">Salasana: </label></td>
                                                <td><input type="password" id="password" name="salasana" value={salasana} onChange={(evt) => salasanaChanged(evt)}></input></td>
                                            </tr>
                                            <tr>
                                                <td><button onClick={() => tarkista()}>Kirjaudu</button></td>
                                                Kirjaudu nappi johtaisi esim. omat tiedot sivulle tai selaa kohteita näkymään
                                            </tr>
                                        </table>
                                    </form>
                                </div>
                            </section> 
                        )} */}
                    </>
                    
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

export { Kirjaudu };