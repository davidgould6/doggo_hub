import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';

// Import material ui components from library core
import {
  FormControl, InputLabel, MenuItem,
  Select, TextField, Typography, Slide} 
from '@material-ui/core/';

// Import custom material ui styled button.
import StyledButton from '../../MaterialUiStyles/StyledButton';

// Import sweet alert
import swal from 'sweetalert';

class RegisterForm extends Component {

  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    isChecked: true
  };

  registerUser = (event) => {
    event.preventDefault();
    swal({
      title: "Is the submitted info correct?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    }).then(isCorrect => {
      if (isCorrect){
        this.props.dispatch({
          type: 'REGISTER',
          payload: {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            street: this.state.street,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
          },
        });
      }
      else {
        swal("Please correct any info that is incorrect");
      }
    });
  }; // end registerUser

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    console.log(this.state);
    return (
      <Slide direction="up" in={this.state.isChecked}>
        <form className="formPanelReg" onSubmit={this.registerUser}>
          <center>
            <Typography variant="h4">Register User</Typography>
            <Typography variant="body2" >fields with * are required</Typography>
          </center>
          {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
            </h3>
          )}
          <div className="inputContainer1">
            <FormControl style={{margin: 3}}>
              <TextField
                label="Username"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="text"
                required
                onChange={this.handleInputChangeFor('username')}
              />
            </FormControl>
            <FormControl style={{margin: 3}}>
              <TextField
                label="Password"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="password"
                required
                onChange={this.handleInputChangeFor('password')}
              />
            </FormControl>
          </div>
          <div className="inputContainer">
            <FormControl style={{margin: 3}}>
              <TextField
                label="First Name"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="text"
                required
                onChange={this.handleInputChangeFor('firstName')}
              />
            </FormControl>
            <FormControl style={{margin: 3}}>
              <TextField
                label="Last Name"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="text"
                required
                onChange={this.handleInputChangeFor('lastName')}
              />
            </FormControl>
          </div>
          <div className="inputContainer">
          <FormControl style={{margin: 3}}>
              <TextField
                label="Street Address"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="text"
                required
                onChange={this.handleInputChangeFor('street')}
              />
            </FormControl>
            <FormControl style={{margin: 3}}>
              <TextField
                label="City"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="text"
                required
                onChange={this.handleInputChangeFor('city')}
              />
            </FormControl>
          </div>
          <div >
            <FormControl style={{marginLeft: 27, marginTop: 3, marginRight: 3}}>
              <TextField
                label="Zip Code"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type="number"
                required
                onChange={this.handleInputChangeFor('zip')}
              />
            </FormControl>
            <FormControl variant="outlined" style={{minWidth: 90, margin: 3}}>
              <InputLabel className="state" required style={{}}>
                State
              </InputLabel>
              <Select value={this.state.state}
              onChange={this.handleInputChangeFor("state")}
              style={{height: 40}}
              >
                {this.props.store.stateAbbr.map(state => 
                <MenuItem value={state}>{state}</MenuItem>
                )}
              </Select>
            </FormControl>
          </div>
          <div className="loginInputs">
            <center>
              <StyledButton type="submit" name="submit">
                Register
              </StyledButton>
            </center>
          </div>
        </form>
      </Slide>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(RegisterForm));