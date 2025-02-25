import CardItem from "./CardItem";
import './Cards.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

function Cards() {

    const baseURL = "http://localhost:5000/api/v1/kertomus/?title=";

    const [searchInput, setSearchInput] = useState("");
    const [url, setUrl] = useState('http://localhost:5000/api/v1/kertomus/?title=');

    const [listOfTravels, setListOfTravels] = useState([]);
    const listOfTravelsFirst2 = listOfTravels.slice(0, 2);
    const listOfTravelsNext3 = listOfTravels.slice(2, 5);
    const listOfTravelsRemaining = listOfTravels.slice(5); {/* slice(aloitus, loppu), negatiiviset luvut = laskien lopusta alkaen, jos haluaa loppuun saakka = ei loppua */ }

    useEffect(() => {
        console.log("useEffect started for: " + url);
        axios.get(url)
            .then(response => {
                setListOfTravels(response.data)
                console.log("response data: ", response.data);
            })
    }, [url])

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    const clearSearch = () => {
        setSearchInput("");
        setUrl("http://localhost:5000/api/v1/kertomus/?title=");
    }

    const handleSubmit = (e) => {
        console.log(baseURL + searchInput);
        setUrl(baseURL + searchInput);
        console.log("searching for: " + url);
    }


    return (
        <div className="cards">
            <section className="search">
                <div className="search-container">
                    <form className="search-form">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-search fa-search-magnify" onClick={handleSubmit} />
                        <input className="search-input" type="text" placeholder='Etsi tämän matkan kertomuksia...' value={searchInput} onChange={handleChange} onKeyUp={handleSubmit} onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Etsi matkoja...'}></input>
                        <FontAwesomeIcon icon={faDeleteLeft} className="fa-search fa-search-delete" onClick={clearSearch} />
                    </form>
                </div>
            </section>
            <div className="cards-container">
                <div className="cards-wrapper">
                    {/* Placeholder matkat. TO DO: path
                    <ul className="cards-items">
                        <CardItem src={require('./images/travel-9.jpg')} text="[PH]OmaMatka 1: Insert travel title here" label='[PH]Uusi-Seelanti' path='/'/>
                        <CardItem src={require('./images/travel-2.jpg')} text="[PH]OmaMatka 2: Insert travel title here" label='[PH]Bahama' path='/'/>
                    </ul>
                    <ul className="cards-items">
                        <CardItem src={require('./images/travel-6.jpg')} text="[PH]OmaMatka 3: Insert travel title here" label='[PH]Japani' path='/'/>
                        <CardItem src={require('./images/travel-8.jpg')} text="[PH]OmaMatka 4: Insert travel title here" label='[PH]Kairo' path='/'/>
                        <CardItem src={require('./images/travel-5.jpg')} text="[PH]OmaMatka 5: Insert travel title here" label='[PH]Helsinki' path='/'/> 
                    </ul> */}
                    {/* Ensimmäiset 2 matkaa responsesta */}
                    <ul className="cards-items"> {/* Käyttää random kuvia*/}
                        {
                            listOfTravelsFirst2.map(travel => <CardItem src={require("./images/travel-" + (Math.floor(Math.random() * 9) + 1) + ".jpg")} text={travel.title} label={travel.kaupunki} path={travel._id} />)
                        }
                    </ul>
                    {/* Seuraavat 3 matkaa responsesta */}
                    <ul className="cards-items">
                        {
                            listOfTravelsNext3.map(travel => <CardItem src={require("./images/travel-" + (Math.floor(Math.random() * 9) + 1) + ".jpg")} text={travel.title} label={travel.kaupunki} path={travel._id} />)
                        }
                    </ul>
                    {/* Loput matkat responsesta, käyttää responsen kuvaa TO DO: backendissä reponse kuvat */}
                    <ul className="cards-items">
                        {
                            listOfTravelsRemaining.map(travel => <CardItem src={require("./images/travel-" + (Math.floor(Math.random() * 9) + 1) + ".jpg")} text={travel.title} label={travel.kaupunki} path={travel._id} />)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Cards;