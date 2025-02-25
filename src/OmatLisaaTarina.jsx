import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import KohdeItem from "./KohdeItem";
import './App.css';

function OmatLisaaMatka() {
    const [travelTitle, setTravelTitle] = useState('')
    const [travelDestination, setTravelDestination] = useState('')
    const [travelInfo, setTravelInfo] = useState('')
    const [travelFiles, setTravelFiles] = useState('')
    
    const [url, setUrl] = useState('http://localhost:5000/api/v1/matkakohde');
    const [listOfLocations, setListOfLocations] = useState([]);

    useEffect(() => {
        console.log("useEffect started for: " + url);
        axios.get(url)
          .then(response => {
            setListOfLocations(response.data)
            console.log("response data: ", response.data);
          })
      }, [url])

    {/* Tarvitsee backendin */}
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/kertomus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: travelTitle,
                kohde: travelDestination,
                kuva: travelFiles
            })
        }).then(res => {
            return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('ERROR'))
    }

    const fileSelectedHandler = event => {
        setTravelFiles(event.target.files);
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
                    <section className="form">
                        <section className="form-heading">
                            <p>Lisää tarina</p>
                        </section>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control form-travel" id="input-travel-title" name="input-travel-title" value={travelTitle} placeholder="Otsikko" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Otsikko'} onChange={(e) => setTravelTitle(e.target.value)}></input>
                            </div>
                            <div className="form-group">
                                <select type="text" className="form-control form-travel" id="input-travel-destination" name="input-travel-destination" value={travelDestination} placeholder="Kohde" onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Kohde'} onChange={(e) => setTravelDestination(e.target.value)}>
                                    {
                                            listOfLocations.map(location => <KohdeItem value={location.kohdenimi}/>)
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <textarea rows="10" className="form-control form-travel" id="input-travel-info" name="input-travel-info" value={travelInfo} placeholder="Teksti..." onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Teksti...'} onChange={(e) => setTravelInfo(e.target.value)}></textarea>
                            </div>
                            <div className="form-group">
                                <input type="file" className="form-control form-travel" id="input--travel-file" name="input-travel-file"  onChange={fileSelectedHandler}></input>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="red-btn hero-btn">LISÄÄ</button>
                            </div>
                        </form>
                    </section>
                </body>
            </html>
        </div>
    )
}
export default OmatLisaaMatka;