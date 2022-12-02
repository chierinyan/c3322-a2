import './index.css';

function Notes(props) {
    const {notes, selected, onClick} = props;

    function to_li(note, selected, on_click) {
        return <li key={note['_id']}
                onClick={() => {on_click(note['_id'])}}
                className={selected === note['_id'] ? 'selected' : null}
               >{note['title']}</li>;
    }

    return (
        <div id='notes'>
            <input placeholder='Search'/>
            <h3>Notes ({notes.length})</h3>
            <ul>
                {notes.map(note => to_li(note, selected, onClick))}
            </ul>
        </div>
    );
}

export default Notes;
