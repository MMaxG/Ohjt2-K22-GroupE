import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import LoremIpsum from 'react-lorem-ipsum';
import Koti from "./Koti";
import { Matkakohteet } from './Matkakohteet';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Omat } from "./Omat";
import { Kirjaudu } from './Kirjaudu';
import { Rekisteroidy } from './Rekisteroidy';
import { Kohde } from './Kohde';
import { OmatTiedot } from './OmatTiedot';
import { OmatTarinat } from './OmatTarinat';
import { KohteenSivu } from './MatkakohteenSivu';
import { PorukanMatkat } from './PorukanMatkat';
import { MatkakohdeEdit } from './MatkakohdeMuokkaus';
import { MatkanSivu } from './matkantarinatporukka';
{/* import Logo from './logo.vsg';*/}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Koti />}></Route>
        <Route path="/koti" element={<Koti />}></Route> {/* käytä mieluummin tätä (/koti:a) kun pelkkää / */}
        <Route path="/matkakohteet" element={<Matkakohteet />}></Route>
        <Route path="/omat" element={<Omat />}></Route>
        <Route path="/kirjaudu" element={<Kirjaudu />}></Route>
        <Route path="/rekisteroidy" element={<Rekisteroidy />}></Route>
        <Route path="/kayttaja" element={<OmatTiedot />}></Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/omat/:id" element={<OmatTarinat />}></Route>
        <Route path="/omat/:id/:id" element={<Kohde />}></Route>
        <Route path="/kohteensivu/:id" element={<KohteenSivu />}></Route>
        <Route path="/porukka" element={<PorukanMatkat/>}></Route>
        <Route path="/matkakohdemuokkaa/:id" element={<MatkakohdeEdit/>}></Route>
        <Route path="/matkantarinat/:id" element={<MatkanSivu/>}></Route>

        
      </Routes>
    </Router>
  );
}

export default App;
