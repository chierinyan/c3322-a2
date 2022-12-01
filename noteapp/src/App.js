import React from 'react';
import $ from 'jquery';

import Signin from './components/Signin';

const EXPRESS_URL = 'http://localhost:3001/';


class App extends React.Component {
    state = {
        name: null,
        icon: null,
        notes: []
    };

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

    render() {
        if (this.state.name === null) {
            return <Signin signin={this.signin}/>;
        }
    }
}

export default App;
