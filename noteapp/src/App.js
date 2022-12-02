import React from 'react';
import $ from 'jquery';

import Signin from './components/Signin';
import Nav from './components/Nav';
import Notes from './components/Notes';
import Main from './components/Main';

const EXPRESS_URL = 'http://localhost:3001/';

const init = {
    name: null,
    icon: null,
    notes: [],
    selected: 'idle'
};


class App extends React.Component {
    state = init;
    main = React.createRef();

    set_notes = (notes) => {
        function comp_note(a, b) {
            function parse_time_str(str) {
                return new Date(str.split(' ').slice(1).join(' ') + ' ' + str.split(' ')[0]);
            }
            return parse_time_str(b['lastsavedtime']) - parse_time_str(a['lastsavedtime']);
        }
        notes.sort(comp_note);
        this.setState({notes: notes});
    }

    signin = (credentials) => {
        $.post(EXPRESS_URL + 'signin', credentials, (res) => {
            if (res !== 'Login failure') {
                this.setState({
                    name: credentials['name'],
                    icon: EXPRESS_URL + res['icon'],
                });
                this.set_notes(res['notes']);
            } else {
                alert(res);
            }
        });
    }

    logout = () => {
        $.get(EXPRESS_URL + 'logout');
        this.setState({...init});
    }

    select = (noteid) => {
        this.setState({selected: noteid});
        $.getJSON(EXPRESS_URL + 'getnote', {noteid: noteid}, (res) => {
            this.main.current.set_note(res);
        });
    }

    render() {
        if (this.state.name === null) {
            return <Signin signin={this.signin}/>;
        } else {
            const {name, icon, notes, selected, editing} = this.state;
            return (
                <React.Fragment>
                    <Nav name={name} icon={icon} logout={this.logout}/>
                    <Notes notes={notes} selected={selected} onClick={this.select}/>
                    <Main ref={this.main} editing={editing}/>
                </React.Fragment>
            );
        }
    }
}

export default App;
