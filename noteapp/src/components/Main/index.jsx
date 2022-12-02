import React from 'react';

import './index.css';

class Main extends React.Component {
    state = {current_note: 'idle'};

    title = React.createRef();
    content = React.createRef();

    render() {
        return (
            <div id='main' className={this.state['current_note']}>
                <input ref={this.title} disabled={! this.props['editing']}/>
                <textarea ref={this.content} disabled={! this.props['editing']}/>
            </div>
        );
    }

    set_note(note) {
        const {_id, title, content} = note;
        this.setState({current_note: _id});
        this.title.current.value = title;
        this.content.current.value = content;
    }
}

export default Main;
