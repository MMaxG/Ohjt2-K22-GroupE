import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PoistaKohde } from './PoistaMatkakohde';

import { Link } from 'react-router-dom';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function MatkanSivu(props) {

    /* JavaScript for toggle Mobile Menu */
    const showMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "0";
    }
    const hideMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "-200px";
    }
    //Otetaan urlista matkan id
    let navigate = useNavigate();
    const params = useParams();
    const URL = JSON.stringify(params);
    const URLSplit = URL.split('"');
    const _id = URLSplit[3];
    console.log("matkan_id: " + _id);

    //Muuttujia
    const [urlTarinat, setUrlTarinat] = useState('http://localhost:5000/api/v1/tarina?'); //url ilman hakuehtoja
    const [tarinat, setTarinat] = useState([]);
    const [queryTarinat, setQueryTarinat] = useState("");


    //Queryn kasaus (tarinat)
    const doSearchQueryTarinat = (_id) => {
        console.log("Aloitetaan Queryn luonti... (tarina)");
        let r = [];
        if (_id != "") r.push("idmatka=" + _id);
        return r.join("&");
    };
    //Hae kohteen tarinat
    useEffect(() => {
        const fetchTarinat = async () => {
            console.log("Aloitetaan haku...");
            console.log("URLTarinat + query: " + urlTarinat + queryTarinat);
            const r = await fetch(urlTarinat + queryTarinat);
            const data = await r.json();
            setTarinat(data);
            console.log("Tarinat: " + tarinat);
        };
        if (queryTarinat != "") fetchTarinat();
    }, [queryTarinat]);


    const Kohteentiedot = (props) => {

        setQueryTarinat(doSearchQueryTarinat(props.tarinat.matkaid));
        console.log("taulukon teko aloitettu ..." + props.tarinat.matkaid);
        const kohde = props.tarinat || [];
        console.log("kohde: " + kohde);
        const row = kohde.map((m, i) => {
            return (
                <div key={i}>
                    <h4>MatkanID: {m.idmatka}</h4>
                    <p>Tarina: {m.teksti}</p>
                    <p></p>
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
                        <h1>Kohteen tiedot</h1>
                    </section>

                    {/* Matkakohteiden sisältö */}
                    <section class="matkakohteet">
                        <div class="matkakohteet-col">
                            <div>
                                <tr><Kohteentiedot tarinat={tarinat} /></tr>
                                <tr><Link to={"/porukka"} class="links">PALAA</Link></tr>
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

export { MatkanSivu };
//TODO
//2x fetch jotta saadaan kohteen tarinoista tieto + kohteen tiedot(tiedot voisivat olla myös propseja)
//Table että näyttää kivemmalle
//siirrä poisto tänne (nappi siis)
//Lisää muokkaus(PUT)
//siirrä omalle sivulle tai piilota muut siksi aikaa kun lisäys/muokkaus käynnissä