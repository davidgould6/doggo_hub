import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import css
import './LoginForm.css';

// Import material ui library from core
import {TextField, Typography, Slide} from '@material-ui/core/';

// Import custom material ui styled button.
import StyledButton from '../../MaterialUiStyles/StyledButton';

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isChecked: true
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
      <Slide direction="up" in={this.state.isChecked}>
        <form className="formPanel" onSubmit={this.login}>
          <center>
          <Typography variant="h4">Login</Typography>
          
          {this.props.store.errors.loginMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.loginMessage}
            </h3>
          )}
          <div className="loginInputs">
            <label htmlFor="username">
              <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              required
              onChange={this.handleInputChangeFor('username')}
              />
            </label>
          </div>
          <div className="loginInputs">
            <label htmlFor="password">
              <TextField 
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              type="password"
              required
              onChange={this.handleInputChangeFor('password')}
              />
            </label>
          </div>
          <div className="loginInputs">
            <StyledButton type="submit" name="submit">
              Log In
            </StyledButton>
          </div>
          </center>
        </form>
      </Slide>
    );
  }
}

export default connect(mapStoreToProps)(LoginForm);