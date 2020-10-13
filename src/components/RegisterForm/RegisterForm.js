import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import swal from 'sweetalert';

class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    state: 'AL',
    zip: '',
  };

  registerUser = (event) => {
    event.preventDefault();
    swal({
      title: "Is the submitted info correct?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
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
        swal("Please correct any info that isn't incorrect");
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
    console.log('these are our props', this.props);
    return (
      <form className="formPanel" onSubmit={this.registerUser}>
        <h2>Register User</h2>
        {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {this.props.store.errors.registrationMessage}
          </h3>
        )}
        <div>
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              required
              onChange={this.handleInputChangeFor('username')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              required
              onChange={this.handleInputChangeFor('password')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="firstName">
            First Name:
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              required
              onChange={this.handleInputChangeFor('firstName')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="lastName">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              required
              onChange={this.handleInputChangeFor('lastName')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="street">
            Street Address:
            <input
              type="text"
              name="street"
              value={this.state.street}
              required
              onChange={this.handleInputChangeFor('street')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="city">
            City:
            <input
              type="text"
              name="city"
              value={this.state.city}
              required
              onChange={this.handleInputChangeFor('city')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="state">
            State: 
            <select 
              name="state"
              value={this.state.state}
              required
              onChange={this.handleInputChangeFor('state')}
            >
                {this.props.store.stateAbbr.map((state, i) => 
                <option key={i}>{state}</option>
                )}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="zip">
            Zip:
            <input
              type="number"
              name="zip"
              value={this.state.zip}
              required
              onChange={this.handleInputChangeFor('zip')}
            />
          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Next" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(RegisterForm));
