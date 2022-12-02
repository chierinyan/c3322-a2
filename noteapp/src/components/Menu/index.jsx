import React from 'react';

function Menu(props) {
    const {time, editing} = props;
    if (editing) {
        return (
            <div id='edit_menu'>
                <button>Cancel</button>
                <button>Save</button>
            </div>
        );
    } else {
        let note_opt = null;
        if (time) {
            note_opt = (
                <React.Fragment>
                    <span>{time}</span>
                    <button>Delete</button>
                </React.Fragment>
            );
        }
        return (
            <div id='view_menu'>
                <button>New</button>
                {note_opt}
            </div>
        );
    }
}

export default Menu;
