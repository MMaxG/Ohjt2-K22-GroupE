import { useState } from "react";
import { PoistaKohde } from './PoistaMatkakohde';
import { KohteenAvaus } from './MatkakohteenSivu';
import { Link } from "react-router-dom";

function KohdeSivu(props) {
  const [avaa, setAvaa] = useState(false);
  const kohteet = props.kohteet;
  const otsikot = props.otsikot;
  if (avaa == false) {
    return (<KohdeLista kohteet={kohteet} otsikot={otsikot} />)
  }
  else {
    return (<KohteenSivu />)
  };
}

//KohdeLista.js
function KohdeLista(props) {
  const headers = props.otsikot || [];
  const rows = props.kohteet || [];
  console.log("Headers" + headers);
  console.log("rows: " + rows);

  return (
    <table class="taulukko">
      <Otsikko {...headers} />
      <TauluRivi rivit={rows} />
    </table>
  );
}
const Otsikko = (props) => {
  return (
    <thead >
      <tr>
        <th class="otsikko">{props.nimi}</th>
        <th class="otsikko">{props.maa}</th>
        <th class="otsikko">{props.kaupunki}</th>
        {/*<th class="otsikko">{props.kuvaus}</th>*/}
        <th class="otsikko">{props.siirry}</th>
        {/*<th class="otsikko">{props.poista}</th>*/}
      </tr>
    </thead>
  );
}
const TauluRivi = (props) => {
  console.log("taulukon teko aloitettu...");
  const rivit = props.rivit || [];
  console.log("rivit: " + rivit);
  const rows = rivit.map((m, i) => {
    return (

      <tr key={i}>
        <td>{m.kohdenimi}</td>
        <td>{m.maa}</td>
        <td>{m.paikkakunta}</td>
        {/*<td>{m.kuvausteksti}</td>*/}

        <td><Link to={"/kohteensivu/" + m._id} class="links">SIIRRY</Link></td>
        {/*<td><button>SIIRRY ID: {m._id}</button></td>*/}
        {/*  <td><PoistaKohde poistettavaID={m._id} /></td>*/}
      </tr>
    );
  })
  return (
    <tbody>
      {rows}
    </tbody>
  )
}
/*
//AVAAA TIEDOT
function KohteenSivu(props) {

  //Muuttujia
  const id = props._id;
  const nimi = props.kohdenimi;
  const maa = props.maa;
  const kaupunki = props.paikkakunta;
  const kuvaus = props.kuvausteksti;
  const [tarinat, setTarinat] = useState([]);
  //const [url, setUrl] = useState('http://localhost:5000/api/v1/tarina?idmatkakohde='); //url ilman hakuehtoja
  const [url, setUrl] = useState('http://localhost:5000/api/v1/tarina?'); //url ilman hakuehtoja
  const [query, setQuery] = useState('');

  /*
  //Kasaa Query = ?idmatkakohde+id
  const doSearchQuery = (id) => {
      console.log("Aloitetaan Queryn luonti... ");
      let r = [];
      if (id != "") r.push("idmatkakohde=" + id);
      // laitetaan query-muuttujaan kellonaika jotta haku toteutuu koska state muuttuja on muuttunut
      r.push(Date.now());
      return r.join("&");
  };

  //Tee haku url+query
  useEffect(() => {
    const fetchTarinat = async () => {
      console.log("Aloitetaan haku...");
      console.log("URL + query: " + url + query);
      const r = await fetch(url + query);
      const data = await r.json();
      setTarinat(data);
      console.log("data: " + data);
      console.log("tarinat: " + tarinat);
    };
    if (query != "") fetchTarinat(); //MUOKKAA Query pois ja varmista että tehdään vain kerran
  }, [query]);

  //renderöi sivu napeilla jos ei tarinoita
  if (tarinat != []) {
    return (
      <div>
        <table>
          <tr>TIEDOT:</tr>
          <tr>nimi: {nimi}</tr>
          <tr>maa: {maa}</tr>
          <tr>Paikkakunta: {kaupunki}</tr>
          <tr>Kuvaus: {kuvaus}</tr>
          <tr>KUVA...</tr>
        </table>
      </div>
    )
  }
  else {
    return (
      <div>
        <table>
          <tr>TIEDOT:</tr>
          <tr>nimi: {nimi}</tr>
          <tr>maa: {maa}</tr>
          <tr>Paikkakunta: {kaupunki}</tr>
          <tr>Kuvaus: {kuvaus}</tr>
          <tr>KUVA...</tr>
          <tr>
            <td><PoistaKohde poistettavaID={m._id} /></td>
            <td><button>MUOKKAA</button></td>
          </tr>
        </table>
      </div>
    )
  }
}
*/

export { KohdeLista, KohdeSivu };