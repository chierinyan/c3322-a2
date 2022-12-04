import React from 'react';

import './index.css';

class Signin extends React.Component {
    state = { name: '', pwd: '' };

    render() {
        return (
            <div id='signin'>
                <h1> iNotes </h1>
                <div id='username_input'>
                    <span>username: </span>
                    <input type='text' name='username'
                     onChange={e => this.setState({name: e.target.value})}/>
                </div>
                <div id='password_input'>
                    <span>password: </span>
                    <input type='password' name='password'
                     onChange={e => this.setState({pwd: e.target.value})}/>
                </div>
                <button onClick={() => this.props['signin'](this.state)}>Sign In</button>
            </div>
        );
    }
}

export default Signin;
