import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function MatkakohdeEdit() {

    
    const [url, setUrl] = useState("http://localhost:5000/api/v1/matkakohde") //+ ?id= tai vast...
    const [query, setQuery] = useState("");
    const [nimi, setNimi] = useState();
    const [maa, setMaa] = useState();
    const [paikkakunta, setPaikkakunta] = useState("");
    const [kuvaus, setKuvaus] = useState("");

    const [muokattavaKohde, setMuokattavaKohde] = useState(null);


    let navigate = useNavigate();
    const params = useParams();
    const URL = JSON.stringify(params);

    const URLSplit = URL.split('"');
    const id = URLSplit[3];
    console.log("ID: " + id);

    //Asiakkaan muokkaus
    useEffect(() => {
        const modifyAsiakas = async () => {
          const r = await fetch(
            url + id,
            {
              method: "PUT",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                kohdenimi: nimi,
                maa: maa,
                paikkakunta: paikkakunta,
                kuvaus: kuvaus,
              }),
            }
          );
          console.log("MODIFY:", r);
          setMuokattavaKohde(null);
          //setQuery(doSearchQuery(nimi, maa, paikkakunta, kuvaus));
        };
        if (muokattavaKohde != null) modifyAsiakas();
      }, [muokattavaKohde]);

      const muokkaaClicked = () => {
        setMuokattavaKohde(true);
      }
    return(
        <div>
            <table class="table">
                  <tr>
                    <td>Kohteen nimi:</td>
                    <td><input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)}></input></td>
                  </tr>

                  <tr>
                    <td>Maa:</td>
                    <td><input type="text" value={maa} onChange={(e) => setMaa(e.target.value)} /></td>
                  </tr>

                  <tr>
                    <td>Paikkakunta:</td>
                    <td><input type="text" value={paikkakunta} onChange={(e) => setPaikkakunta(e.target.value)} /></td>
                  </tr>
                  <tr>
                    <td>Kuvaus:</td>
                    <input type="text" value={kuvaus} onChange={(e) => setKuvaus(e.target.value)}></input>
                </tr>
                </table>
            
            <tr><button onClick={() => muokkaaClicked()}>MUOKKAA:</button></tr>
            <tr><Link to={"/matkakohteet"} class="links">PALAA</Link></tr>
        </div>
    )
}
export {MatkakohdeEdit};