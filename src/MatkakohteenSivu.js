import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PoistaKohde } from "./PoistaMatkakohde";

import { Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function KohteenSivu(props) {


    /* JavaScript for toggle Mobile Menu */
    const showMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "0";
    }

    const hideMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "-200px";
    }


    let navigate = useNavigate();
    const params = useParams();
    const URL = JSON.stringify(params);

    const URLSplit = URL.split('"');
    const _id = URLSplit[3];

    //Muuttujia
    const [urlTarinat, setUrlTarinat] = useState('http://localhost:5000/api/v1/tarina?idmatkakohde='); //url ilman hakuehtoja
    const [urlKohde, setUrlKohde] = useState('http://localhost:5000/api/v1/matkakohde?_id=');
    const [kohde, setKohde] = useState([])
    const [tarinat, setTarinat] = useState([]);

    const [queryKohde, setQueryKohde] = useState("");
    const [queryTarinat, setQueryTarinat] = useState("");


    //Queryn kasaus
    const doSearchQueryKohde = (_id) => {
        console.log("Aloitetaan Queryn luonti... ");
        let r = [];
        if (kohde != "") r.push("_id" + _id);
        return r.join("&");
    };
    //Hae kohteen tiedot
    useEffect(() => {
        const fetchKohde = async () => {
            console.log("Aloitetaan haku...");
            console.log("URLKohde + query: " + urlKohde + _id);
            const r = await fetch(urlKohde + _id);
            const data = await r.json();
            setKohde(data);
        };
        if (queryKohde == []) fetchKohde();
    }, [queryKohde]);


    //Queryn kasaus (tarinat)
    const doSearchQueryTarinat = (_id) => {
        console.log("Aloitetaan Queryn luonti... (tarina)");
        let r = [];
        if (tarinat != "") r.push("_id" + _id);
        return r.join("&");
    };
    //Hae kohteen tarinat
    useEffect(() => {
        const fetchTarinat = async () => {
            console.log("Aloitetaan haku...");
            console.log("URLTarinat + query: " + urlTarinat + _id);
            const r = await fetch(urlTarinat + _id);
            const data = await r.json();
            setTarinat(data);
            console.log("Tarinat: " + tarinat);

        };
        if (queryTarinat == []) fetchTarinat(); //MUOKKAA Query pois ja varmista että tehdään vain kerran
    }, [queryTarinat]);


    const Kohteentiedot = (props) => {

        setQueryKohde(doSearchQueryKohde(props.kohde._id));
        setQueryTarinat(doSearchQueryTarinat(props.kohde._id));
        console.log("taulukon teko aloitettu ...");
        const kohde = props.kohde || [];
        console.log("kohde: " + kohde);
        const row = kohde.map((m, i) => {
            return (
                <div key={i}>
                    <p>Kohteen nimi: {m.kohdenimi}</p>
                    <p>Maa: {m.maa}</p>
                    <p>Paikkakunta: {m.paikkakunta}</p>
                    <p>Kuvaus: {m.kuvausteksti}</p>
                </div>
            );
        })
        console.log("row: " + row);
        return (
            <table>
                {row}
            </table>
        )
    }


    if (tarinat == "") {
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

                        {/* Kohteensivu */}
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
                            <h1>Kohteen tiedot (Ei Tarinoita)</h1>
                        </section>

                        {/* Matkakohteiden sisältö */}
                        <section class="matkakohteet">
                            <div class="matkakohteet-col">
                                <div>
                                    <Kohteentiedot kohde={kohde} />
                                    <PoistaKohde poistettavaID={_id} />
                                    {/*<Link to={"/matkakohdemuokkaa/:" + _id} class="links">MUOKKAA</Link>*/}
                                    <Link to="/matkakohteet" class="links">PALAA</Link>
                                </div>
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
        )
    }
    else {
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

                        {/* Kohteensivu */}
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
                            <h1>Kohteen tiedot (Tarinoilla)</h1>
                        </section>

                        {/* Matkakohteiden sisältö */}
                        <section class="matkakohteet">
                            <div class="matkakohteet-col">
                                <div>
                                    <Kohteentiedot kohde={kohde} />
                                    <Link to="/matkakohteet" class="links">PALAA</Link>
                                </div>
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
        )
    }
    /*
        //renderöi sivu napeilla jos ei tarinoita
        if (tarinat == "") {
            return (
    
                <div>
                    <Kohteentiedot kohde={kohde} />
                    <PoistaKohde poistettavaID={_id} />
                    {/*<button>MUOKKAA ID: {_id}</button>}
                </div>
            )
        }
        else {
            return (
                <div>
                    <table>
                        <tr>TIEDOT:</tr>
                        <tr>nimi: {kohde.kohdenimi}</tr>
                        <tr>maa: {kohde.maa}</tr>
                        <tr>Paikkakunta: {kohde.paikkakunta}</tr>
                        <tr>Kuvaus: {kohde.kuvaus}</tr>
                        <tr>KUVA...</tr>
                    </table>
                </div>
            )
        }
    */
}

export { KohteenSivu };
//TODO
//2x fetch jotta saadaan kohteen tarinoista tieto + kohteen tiedot(tiedot voisivat olla myös propseja)
//Table että näyttää kivemmalle
//siirrä poisto tänne (nappi siis)
//Lisää muokkaus(PUT)
//siirrä omalle sivulle tai piilota muut siksi aikaa kun lisäys/muokkaus käynnissä