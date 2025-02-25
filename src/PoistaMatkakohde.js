import {useState, useEffect} from 'react';

//POISTO
function PoistaKohde (props) {
    //Muuttujia
    const [poistetaan, setPoistetaan] = useState(null);
    const poistettavaID = props.poistettavaID;
    const [url, setUrl] = useState('http://localhost:5000/api/v1/matkakohde?_id='); //url ilman hakuehtoja
    
    //Poista asiakas
    useEffect(() => {
      const deleteKohde = async () => {
        const r = await fetch(
          url + poistettavaID,
          {
            method: "DELETE",
          }
        );
        console.log("DELETE:", r);
        console.log("poistetaan: " + poistetaan);
        setPoistetaan(null);
        //setQuery(doSearchQuery(nimi, osoite, tyyppi_id));
      };
      if (poistetaan != null) deleteKohde();
    }, [poistetaan]);

    const PoistaKlikattu = () => {
      console.log("Poisto nappia klikattu...")
      console.log("URL: " + url + poistettavaID);
      console.log("poistettava id: " + poistettavaID);
      console.log("setPoistetaan: " + poistetaan);
      setPoistetaan(true);
    };

    return(
      <div><button onClick={() => PoistaKlikattu()}>POISTA</button></div>
    )

  }
  
  
  export{PoistaKohde}