import { useState } from "react";
import './style.css';
import { KohdeLista } from './KohdeLista'
import {Kohde} from './Kohde'

function Selaa() {
    return (
        <div class="boksi">
            <h4>Selaa kohteita</h4>
            <table class="table">
                <tr>
                    <td>Hae:</td>
                    <td><input type="text"></input></td>
                    <td rowSpan="4">
                        <ul>
                            <li><KohdeLista /></li>
                            <li><KohdeLista /></li>
                            <li><KohdeLista /></li>
                            <li><KohdeLista /></li>
                            <li><KohdeLista /></li>
                            <li><KohdeLista /></li>
                            <li><KohdeLista /></li>
                            <li><KohdeLista /></li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">Rajaa:</td>
                </tr>
                <tr>
                    <td><label>Maa:</label></td>
                    <td>
                        <select>
                            <option>Haetaan maat tietokannasta</option>
                            {/*Voisi vaihtaa myös checkboxeihin*/}
                            <option>Suomi</option>
                            <option>Ruotsi</option>
                            <option>Viro</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td><label>Kaupunki:</label></td>
                    <td>
                        <select>
                            <option>Haetaan kaupungit tietokannasta</option>
                            <option>Lohja</option>
                            <option>Kuopio</option>
                            <option>Helsinki</option>
                            <option>Turku</option>
                        </select>
                    </td>
                </tr>
            </table>
            <Kohde />
        </div>
    )
}

const ListaOtsikot = () => {
    return (
        <tr>
            <th>Kohteen nimi</th>
            <th>Kaupunki</th>
            <th></th>
        </tr>
    );
}
export { Selaa };