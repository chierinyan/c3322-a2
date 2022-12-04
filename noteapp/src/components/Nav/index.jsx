import './index.css';

function Nav(props) {
    return (
        <div id='nav'>
            <h1>iNotes</h1>
            <div id='user'>
                <img src={props.icon} title={props.name} alt={props.name}/>
                <span>{props.name}</span>
            </div>
            <button onClick={props.logout}>Log Out</button>
        </div>
    );
}

export default Nav;
