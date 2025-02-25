import { getSuggestedQuery } from '@testing-library/react';
import { useState, useEffect } from 'react';

function AddMatkakohde(props) {
    //Muuttujia tiedon tallennukseen
    const [nimiToBeInserted, setNimiToBeInserted] = useState("");
    const [maaToBeInserted, setMaaToBeInserted] = useState("");
    const [paikkakuntaToBeInserted, setPaikkakuntaToBeInserted] = useState("");
    const [kuvaus, setKuvaus] = useState("");
    const [url, setUrl] = useState('http://localhost:5000/api/v1/matkakohde/'); //url ilman hakuehtoja
    const [kohdeToBeInserted, setkohdeToBeInserted] = useState(null);


    //asiakkaan lisäys
    useEffect(() => {
        console.log("nimi: " + nimiToBeInserted + ", maa: " + maaToBeInserted + ", kaupunki: " + paikkakuntaToBeInserted + ", kuvaus:" + kuvaus);
        const insertKohde = async () => {
            const r = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    kohdenimi: nimiToBeInserted,
                    maa: maaToBeInserted,
                    paikkakunta: paikkakuntaToBeInserted,
                    kuvausteksti: kuvaus,
                }),
            });
            console.log("INSERT: ", r);
            setkohdeToBeInserted(null);
            console.log("Kohde status: " + kohdeToBeInserted)
        };
        if (kohdeToBeInserted != null) insertKohde();
    }, [kohdeToBeInserted]);


    const lisaaClicked = () => {
        console.log("nimi: " + nimiToBeInserted + ", maa: " + maaToBeInserted + ", kaupunki: " + paikkakuntaToBeInserted + ", kuvaus:" + kuvaus);
        console.log("SetKohde: " + kohdeToBeInserted);
        setkohdeToBeInserted(true);
    };

    //returnina tietojen syöttö ruudut + tieto onko lisäys onnistunut
    return (
        <div>
            <table>
                <tr>
                    <td>Kohteen nimi:</td>
                    <td><input type="text" value={nimiToBeInserted} onChange={(e) => setNimiToBeInserted(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Maa:</td>
                    <td><input type="text" value={maaToBeInserted} onChange={(e) => setMaaToBeInserted(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Paikkakunta:</td>
                    <td><input type="text" value={paikkakuntaToBeInserted} onChange={(e) => setPaikkakuntaToBeInserted(e.target.value)} /></td>
                </tr>
                <tr>
                    <td>Kuvaus:</td>
                    <td><input type="text" value={kuvaus} onChange={(e) => setKuvaus(e.target.value)} /></td>
                </tr>
                <tr><td></td>
                    <td><button onClick={() => lisaaClicked()}>Lisää Kohde</button></td>
                </tr>
            </table>

            {/* <p>Lisäys onnistunut / epäonnistunut</p> */}
        </div>
    )
}

export { AddMatkakohde };