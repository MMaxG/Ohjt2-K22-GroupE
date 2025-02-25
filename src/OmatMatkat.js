import CardItem from "./CardItem";
import './App.css';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import TravelItem from "./TravelItem";

function OmatMatkat() {

  const baseURL = "http://localhost:5000/api/v1/matka";

  const [searchInput, setSearchInput] = useState("");
  const [dateStart, setDateStart] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [url, setUrl] = useState('http://localhost:5000/api/v1/matka');

  const [listOfTravels, setListOfTravels] = useState([]);

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
    setUrl("http://localhost:5000/api/v1/matka");
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
            <input className="search-input" type="text" placeholder='Etsi matkoja...' value={searchInput} onChange={handleChange} onKeyUp={handleSubmit} onFocus={(e) => e.target.placeholder = ''} onBlur={(e) => e.target.placeholder = 'Etsi matkoja...'}></input>
            <FontAwesomeIcon icon={faDeleteLeft} className="fa-search fa-search-delete" onClick={clearSearch} />
            <div className="search-form-group">
              <label for="input-date-start" className="form-control">Alku pvm</label>
              <input type="date" className="form-control" id="input-date-start" name="input-date-start" value={dateStart} onChange={(e) => setDateStart(e.target.value)}></input> {/* onChange on jsx attribuutti */}
              <label for="input-date-end" className="form-control">Loppu pvm</label>
              <input type="date" className="form-control" id="input-date-end" name="input-date-end" value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}></input>
            </div>
          </form>
        </div>
      </section>
      <div className="travel-container">
        <div className="travel-wrapper">
          <h2>Sinun matkasi</h2>
          <ul className="travel-items"> {/* Inherited from div.App text-align: center;*/}
            {
              listOfTravels.map(travel => <TravelItem number={travel.idmatka} start={travel.alkupvm} end={travel.loppupvm} path={travel._id}></TravelItem>)
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export { OmatMatkat };