import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function OmatLisaaMatka() {

    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [privacy, setPrivacy] = useState(false)
    const [travelTitle, setTravelTitle] = useState('')
    const [travelDestination, setTravelDestination] = useState('')
    const [travelInfo, setTravelInfo] = useState('')
    const [travelFiles, setTravelFiles] = useState('')

    const [success, setSuccess] = useState(false);

    {/* Tarvitsee backendin */}
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/v1/matka', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                alkupvm: dateStart,
                loppupvm: dateEnd,
                yksityinen: privacy
            })
        }).then(res => {
            return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('ERROR'))
        console.log("settings success to true from: " + success + " .")
        setSuccess(true);
        console.log("success is now: " + success);
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
                            <p>Lisää uusi matka</p>
                        </section>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label for="input-date-start" className="form-control ">Alku pvm</label>
                                <input type="date" className="form-control" id="input-date-start" name="input-date-start" value={dateStart} onChange={(e) => setDateStart(e.target.value)}></input> {/* onChange on jsx attribuutti */}
                            </div>
                            <div className="form-group">
                                <label for="input-date-end" className="form-control">Loppu pvm</label>
                                <input type="date" className="form-control" id="input-date-end" name="input-date-end" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}></input>
                            </div>
                            <div className="form-group-cb">
                                <input type="checkbox" className="form-control form-cb" id="input-privacy" name="input-privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)}></input>
                                <label for="input-privacy">Yksityinen</label>
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