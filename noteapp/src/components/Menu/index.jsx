import React from 'react';

import './index.css';

function Menu(props) {
    const {time, editing, newNote, saveNote, cancel, deleteNote} = props;
    if (editing) {
        return (
            <div id='edit_menu' className='menu'>
                <button onClick={cancel}>Cancel</button>
                <button onClick={saveNote}>Save</button>
            </div>
        );
    } else {
        let note_opt = null;
        if (time) {
            note_opt = (
                <React.Fragment>
                    <span>{time}</span>
                    <button onClick={deleteNote}>Delete</button>
                </React.Fragment>
            );
        }
        return (
            <div id='view_menu' className='menu'>
                <button id='new' onClick={newNote}>New</button>
                {note_opt}
            </div>
        );
    }
}

export default Menu;
