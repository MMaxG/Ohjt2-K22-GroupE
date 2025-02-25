import { Link } from 'react-router-dom';

function deleteTravel(id) {
    fetch(`http://localhost:5000/api/v1/matka?_id=${id}`, {
            method: 'DELETE',
        }).then(res => {
            return res.json()
        })
            .then(data => console.log(data))
            .catch(error => console.log('ERROR'))
}

function TravelItem(props) {
    return (
        <>
            <Link to={props.path} className="travels-item">
                <div className="travel-li-container">
                    <li className="travel-item"> <span>{props.number}</span>{props.start} - {props.end}</li>
                    <button className='travel-delete' onClick={() => deleteTravel(props.path)}>Poista</button>
                </div>
                
            </Link>
        </>
    );
}

export default TravelItem;