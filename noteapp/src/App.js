import React from 'react';
import $ from 'jquery';

import Signin from './components/Signin';
import Nav from './components/Nav';
import Notes from './components/Notes';
import Main from './components/Main';
import Menu from './components/Menu';

import './App.css';

const EXPRESS_URL = 'http://localhost:3001/';

const init = {
    name: null,
    icon: null,
    notes: [],
    selected: 'idle',
    time: null,
    editing: false
};


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = init;
        this.main = React.createRef();
        $.ajaxSetup({
            xhrFields: {withCredentials: true},
            crossDomain: true
        });
    }

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

    new_note = () => {
        this.setState({
            selected: 'new',
            editing: true
        });
        this.main.current.set_note({
            _id: 'new',
            title: 'New Note',
            content: ''
        })
    }

    save_note = () => {
        const noteid = this.main.current.state['current_note'];
        const title = this.main.current.title.current.value;
        const content = this.main.current.content.current.value;
        if (noteid === 'new') {
            $.post(EXPRESS_URL + 'addnote', {note: {title: title, content: content}}, (res) => {
                this.set_notes([res, ...this.state['notes']]);
                this.select(res['_id'], true);
            });
        } else {
            $.ajax({
                url: EXPRESS_URL + 'savenote/' + this.state.selected,
                type: 'PUT',
                data: {note: {title: title, content: content}},
                success: (res) => {
                    this.set_notes(res['notes']);
                    this.select(this.state.selected, true);
                },
                error: (res) => { console.error(res); }
            });
        }
    }

    search = (searchstr) => {
        $.getJSON(EXPRESS_URL + 'searchnotes', {searchstr: searchstr}, (res) => {
            this.set_notes(res['notes']);
        });
    }

    select = (noteid, force=false) => {
        if (this.state.editing && !(force || window.confirm('Are you sure to quit editing the note?'))) {
            return false;
        }
        this.setState({editing: false});
        if (noteid === 'idle' || noteid === 'new') {
            this.setState({selected: 'idle', time: null});
            this.main.current.set_note({_id: 'idle', title: '', content: ''});
        } else {
            this.setState({selected: noteid});
            $.getJSON(EXPRESS_URL + 'getnote', {noteid: noteid}, (res) => {
                this.main.current.set_note(res);
                this.setState({time: res['lastsavedtime']});
            });
        }
    }

    render() {
        if (this.state.name === null) {
            return <Signin signin={this.signin}/>;
        } else {
            const {name, icon, notes, selected, time, editing} = this.state;
            return (
                <React.Fragment>
                    <Nav name={name} icon={icon} logout={this.logout}/>
                    <div id='main_container'>
                        <Notes notes={notes} selected={selected} onClick={this.select} search={this.search}/>
                        <div/>
                        <div>
                            <Menu time={time} editing={editing}
                             newNote={this.new_note} saveNote={this.save_note} cancel={() => this.select(this.state.selected)}/>
                            <Main ref={this.main} editing={editing} startEditing={() => {this.setState({editing: true})}}/>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

export default App;
