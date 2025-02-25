import React, { useState } from 'react'
import {Kirjaudu} from "./Kirjaudu";
import {Rekisteroidy} from "./Rekisteröidy";
import {Selaa} from "./Selaa"

//Home komponentti näyttää tervehdyksen kun mitään ei ole vielä klikattu (+Kuva)
const Home = () => (
    <div><h1>Tervetuloa (Ryhmä E)</h1></div>
)


//kokoajan näkyvissä olevien nappien hallinta
function Kotisivu() {
    const [page, setPage] = useState('home')
    //Onko käyttäjä kirjautunut sisään
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState('');

    const toPage = (page) => (event) => {
        event.preventDefault()
        setPage(page)
    }
    
    //dummi funktio kirjautumiselle ja ulos kirjautumiselle
    const logIn = () => {
        setLogged(true);
        setUser("DumDum");
        return;
    }
    const logOut = () => {
        setLogged(false);
        setUser('');
        return;
    }

    //Selaa kohdalle pitää saada propsina onko kirjauduttu vai ei?
    const content = () => {
        if (page === 'browse') {
            return <Selaa />
        } else if (page === 'login') {
            return <Kirjaudu />
        } else if (page === 'register') {
            return <Rekisteroidy />
        } else if (page === 'home') {
            return <Home />
        }
    }

    if(logged == true){
        console.log("User: " + user);
        console.log("Logged: " + logged);
        console.log("Page: " + page);
        console.log("");
        return(
            <div class="boksi">
                <button onClick={() => logOut()}>Log out</button>
            <table>
                <tr>
                    <td><button onClick={toPage('browse')}>Selaa Kohteita</button></td>
                    <td><button onClick={toPage('login')}>Kirjaudu</button></td>
                    <td><button onClick={toPage('register')}>Rekisteröidy</button></td>
                    <td><button onClick={toPage('register')}>Omat Tiedot, {user}</button></td>
                </tr>
            </table>
            {content()}
        </div>
        )
    }
    else{
        console.log("User: " + user);
        console.log("Logged: " + logged);
        console.log("Page: " + page);
        console.log("");
        return (
            <div class="boksi">
                <button onClick={()=>logIn()}>Log in</button>
                <table>
                    <tr>
                        <td><button onClick={toPage('browse')}>Selaa Kohteita</button></td>
                        <td><button onClick={toPage('login')}>Kirjaudu</button></td>
                        <td><button onClick={toPage('register')}>Rekisteröidy</button></td>
                    </tr>
                </table>
                {content()}
            </div>
        )
    }
    
}


export {Kotisivu};
