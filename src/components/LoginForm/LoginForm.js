import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import {TextField, Typography} from '@material-ui/core/';

import StyledButton from '../../MaterialUiStyles/StyledButton';

class LoginForm extends Component {

  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <form className="formPanel" onSubmit={this.login}>
        <center>
        <Typography variant="h4">Login</Typography>
        
        {this.props.store.errors.loginMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.loginMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
            required
            onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <TextField 
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            required
            onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <StyledButton type="submit" name="submit">
            Log In
          </StyledButton>
        </div>
        </center>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);
