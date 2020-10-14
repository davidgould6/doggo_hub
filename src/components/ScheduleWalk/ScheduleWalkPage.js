import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class ScheduleWalkPage extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: 'FETCH_ADDRESS' });
  }

  state = {
    dogToWalk: 'selectDog',
    date: '',
    address:'selectAddress',
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };
  
  handleInputChangeForAddress = (event) => {
    this.setState({
      address: event.target.value
    });
  }

  render() {
    console.log('in schedulewalkpage.js', this.props);
    console.log(this.state);
    return (
      <div>
        <h1>Schedule a walk !</h1>
        <div>
          Select Doggo: 
          <select 
            name="dogToWalk"
            value={this.state.dogToWalk}
            required
            onChange={this.handleInputChangeFor('dogToWalk')}
          >
            <option disabled value="selectDog"> -- Select a Doggo -- </option>
            {this.props.store.petReducer.map((pet, i) => 
            <option key={i}>{pet.name}</option>
            )}
          </select>
          Date:  
          <input 
            type="date" 
            name="date" 
            required onChange={this.handleInputChangeFor('date')}
          />
          Pick Up Address: 
          <select
            name="address"
            value={this.state.address}
            required
            onChange={(event) => this.handleInputChangeForAddress(event)}>
              <option disabled value="selectAddress"> -- Select an Address -- </option>
              {this.props.store.addressReducer.map((address, i) => 
              <option value={address.id} key={i}>{address.street} {address.city}, {address.state} {address.zip}</option>
              )}
          </select>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ScheduleWalkPage);