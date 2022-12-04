import './index.css';

function Notes(props) {
    const {notes, selected, onClick, search} = props;

    function to_li(note, selected, on_click) {
        return <li key={note['_id']}
                onClick={() => {on_click(note['_id'])}}
                className={selected === note['_id'] ? 'selected' : null}
               >{note['title']}</li>;
    }


    function handle_keyup(ev) {
        if (ev.keyCode !== 13) {
            return;
        }
        search(ev.target.value);
    }

    return (
        <div id='notes'>
            <input placeholder='Search' onKeyUp={handle_keyup}/>
            <h3>Notes ({notes.length})</h3>
            <ul>
                {notes.map(note => to_li(note, selected, onClick))}
            </ul>
        </div>
    );
}

export default Notes;
