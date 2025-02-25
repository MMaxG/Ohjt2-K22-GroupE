import { useState } from "react";
import { PoistaKohde } from './PoistaMatkakohde';
import { KohteenAvaus } from './MatkakohteenSivu';
import { Link } from "react-router-dom";

function MatkaSivu(props) {
  const [avaa, setAvaa] = useState(false);
  const matkat = props.matkat;
  const otsikot = props.otsikot;


  //if (avaa == false) {
    return (<KohdeLista matkat={matkat} otsikot={otsikot} />)
  // }
  //else {
    //return (<Matkantarinat />)
  //};
}

//KohdeLista.js
function KohdeLista(props) {
  const headers = props.otsikot || [];
  const rows = props.matkat || [];
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
        <th class="otsikko">{props.alkupvm}</th>
        <th class="otsikko">{props.loppupvm}</th>
        <th class="otsikko">{props.yksityinen}</th>
        <th class="otsikko">{props.idmatka}</th>
        <th class="otsikko">{props.siirry}</th>
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
        <td>{m.alkupvm}</td>
        <td>{m.loppupvm}</td>
        <td>{m.yksityinen}</td>
        <td>{m.idmatka}</td>
        <td><Link to={"/matkantarinat/" + m.idmatka} class="links">Katsele tarinoita</Link></td>
      </tr>
    );
  })
  return (
    <tbody>
      {rows}
    </tbody>
  )
}


export { MatkaSivu };