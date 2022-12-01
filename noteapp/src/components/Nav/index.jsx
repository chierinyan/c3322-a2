import './index.css';

function Nav(props) {
    return (
        <div id='nav'>
            <h1>iNotes</h1>
            <img src={props.icon} title={props.name} alt={props.name}/>
            <span>{props.name}</span>
            <button onClick={props.logout}>Log Out</button>
        </div>
    );
}

export default Nav;
