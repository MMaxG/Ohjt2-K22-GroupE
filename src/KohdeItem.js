import { Link } from 'react-router-dom';

function KohdeItem(props) {
    return (
        <>
            <option value={props.value}>{props.value}</option>
        </>
    );
}

export default KohdeItem;