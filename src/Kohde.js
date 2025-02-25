import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoremIpsum from 'react-lorem-ipsum';
import { Link, useParams } from "react-router-dom";
import Cards from './Cards';
import OmatLisaaMatka from './OmatLisaaMatka';
import { useState, useEffect } from "react";
import axios from 'axios';
import CardItem from "./CardItem";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import KohdeItem from './KohdeItem';

function Kohde() {

    const { id } = useParams()

    const [active, setActive] = useState("FirstCard");

    const baseURL = `http://localhost:5000/api/v1/kertomus/?_id=${id}`;

    const [searchInput, setSearchInput] = useState("");
    const [url, setUrl] = useState(`http://localhost:5000/api/v1/kertomus/?_id=${id}`);

    const promise1 = axios.get(`http://localhost:5000/api/v1/kertomus/?_id=${id}`);
    const promise2 = axios.get("http://localhost:5000/api/v1/matkakohde")

    const [listOfLocations, setListOfLocations] = useState([]);
    const [product, setProduct] = useState([])

    const [storyTitle, setStoryTitle] = useState("");
    const [story, setStory] = useState("");
    const [storyCity, setStoryCity] = useState("");
    const [storyState, setStoryState] = useState("");

    useEffect(() => {
        axios.all([promise1, promise2]).then(
            axios.spread((...responses) => {
                const response1 = responses[0];
                const response2 = responses[1];
                setProduct(response1.data)
                setListOfLocations(response2.data);
            })
        )

        {/*console.log("useEffect started for: " + url);
        axios.get(url)
            .then(response => {
                setProduct(response.data)
                console.log("response data: ", response.data);
            })
        */}
    }, [url])

    /* JavaScript for toggle Mobile Menu */
    const showMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "0";
    }

    const hideMenu = () => {
        var navLinks = document.getElementById("navLinks");
        navLinks.style.right = "-200px";
    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const clearSearch = () => {
        setSearchInput("");
        setUrl("http://localhost:5000/api/v1/kertomus/?title=");
    }

    const handleSubmit = (e) => {
        console.log("Updating info...");
        e.preventDefault();
        fetch(`http://localhost:5000/api/v1/kertomus?_id=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: storyTitle,
                valtio: storyState,
                kaupunki: storyCity
            })
        }).then(res => {
            return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('ERROR'))
    }

    function deleteStory() {
        console.log(id);
        fetch(`http://localhost:5000/api/v1/kertomus?_id=${id}`, {
                method: 'DELETE',
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
                        <h1>Tarina: "{product.map(travel => travel.title)}"</h1>
                    </section>
                    <section>
                        <div>
                            <h1></h1>
                        </div>
                    </section>
                    <div className="cards">
                        <div className="cards-container">
                            <div className="cards-wrapper">
                                <ul className="cards-items"> {/* Käyttää random kuvia*/}
                                    {
                                        product.map(travel => <CardItem src={require("./images/travel-" + (Math.floor(Math.random() * 9) + 1) + ".jpg")} text={travel.title} label={travel.kaupunki} path="" />)
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <section className="form">
                        <section className="form-heading">
                            <p>Päivitä tietoja</p>
                        </section>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                {
                                    product.map( travel => <input type="text" className="form-control" id="product-title" name="product-fname" value={storyTitle} placeholder={travel.title} onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Title'} onChange={(e) => setStoryTitle(e.target.value)}></input>)
                                }
                            </div>
                            <div className="form-group">
                                {
                                    product.map( travel => <select type="text" className="form-control form-travel" id="input-travel-destination" name="input-travel-destination" value={storyState} onChange={(e) => setStoryState(e.target.value)}>
                                    {
                                       listOfLocations.map(location => <KohdeItem value={location.maa} />)
                                    }
                                </select>)
                                }
                            </div>
                            <div className="form-group">
                                {
                                    product.map( travel => <select type="text" className="form-control form-travel" id="input-travel-destination" name="input-travel-destination" value={storyCity} onChange={(e) => setStoryCity(e.target.value)}>
                                    {
                                       listOfLocations.map(location => <KohdeItem value={location.paikkakunta} />)
                                    }
                                </select>)
                                }
                            </div>
                            <div className="form-group">
                            <textarea rows="10" className="form-control form-travel" id="input-travel-info" name="input-travel-info" value={story} placeholder="Tarina..." onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Tarina...'} onChange={(e) => setStory(e.target.value)}></textarea>
                            </div>
                            <button type="submit" className="red-btn hero-btn">PÄIVITÄ</button>
                        </form>
                        <div className='story-delete-container'>
                            <a href="/omat/6267cc84fdce54572cc43007" className="red-btn hero-btn story-btn-delete" onClick={deleteStory}>POISTA</a>
                        </div>
                    </section>
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

export { Kohde };
