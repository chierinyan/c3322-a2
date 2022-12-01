import React from 'react';
import $ from 'jquery';

import Signin from './components/Signin';
import Nav from './components/Nav';

const EXPRESS_URL = 'http://localhost:3001/';

const init = {
    name: null,
    icon: null,
    notes: []
};


class App extends React.Component {
    state = init;

    signin = (credentials) => {
        $.post(EXPRESS_URL + 'signin', credentials, (res) => {
            if (res !== 'Login failure') {
                this.setState({
                    name: credentials['name'],
                    icon: EXPRESS_URL + res['icon'],
                    notes: res['notes']
                });
            } else {
                alert(res);
            }
        });
    }

    logout = () => {
        $.get(EXPRESS_URL + 'logout');
        this.setState({...init});
    }

    render() {
        if (this.state.name === null) {
            return <Signin signin={this.signin}/>;
        } else {
            const {name, icon} = this.state;
            return (
                <React.Fragment>
                    <Nav name={name} icon={icon} logout={this.logout}/>
                </React.Fragment>
            );
        }
    }
}

export default App;
