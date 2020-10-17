import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';
import {withRouter} from 'react-router-dom'

class ScheduleWalkPage extends Component {

  componentDidMount(){
    this.props.dispatch({ type: 'FETCH_ADDRESS' });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  state = {
    dogToWalk: 'selectDog',
    date: '',
    address:'selectAddress',
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function handles change for dogToWalk, needed it's own function to pass id
  handleInputChangeForDogToWalk = (event) => {
    this.setState({
      dogToWalk: event.target.value
    });
  };
  
  // Function handles change for address, needed it's own function to pass id
  handleInputChangeForAddress = (event) => {
    this.setState({
      address: event.target.value
    });
  };

  scheduleWalk = () => {
    // if user does not change value of select alert will prompt
    if(this.state.dogToWalk === 'selectDog'){
      swal(`Please select a doggo for the walk.`);
    }
    // if user does not change value of select alert will prompt
    else if(this.state.date === ''){
      swal(`Please select the date for the walk.`);
    }
    // if user does not change value of select alert will prompt
    else if(this.state.address === 'selectAddress'){
      swal(`Please select and address for your doggo to be picked up at.`);
    }
    // If all conditions are met will run this code block
    else{
    // Will ask user if info is correct if isCorrect will run code block if not will trigger else statement
      swal({
        title: "Is the submitted info correct?",
          icon: "info",
          buttons: {
            cancel: "No",
            yes: true,
          }
      }).then(isCorrect => {
        if(isCorrect){
          // prompts user that walk has been scheduled upon success will dispatch local state info
          swal("Your Doggo's walk has been scheduled!", {
            icon: "success"
          }).then(() => {
            this.props.dispatch({
              type: 'CREATE_WALK',
              payload: {
                dogToWalk: this.state.dogToWalk,
                date: this.state.date,
                address: this.state.address
              }
            });
            // Sets state back to default
            this.setState({
              dogToWalk: 'selectDog',
              date: '',
              address: 'selectAddress'
            });

            setTimeout(() => { this.props.history.push('/'); }, 250);
          });
        }
        else{
          // Alert tells user to correct anything that is incorrect.
          swal("Please correct any info that is incorrect");
        }
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Schedule a walk !</h1>
        <div>
          Select Doggo: 
          <select 
            name="dogToWalk"
            value={this.state.dogToWalk}
            required
            onChange={(event) => this.handleInputChangeForDogToWalk(event)}
          >
            <option disabled value="selectDog"> -- Select a Doggo -- </option>
            {this.props.store.petReducer.map((pet, i) => 
            <option value={pet.id} key={i}>{pet.name}</option>
            )}
          </select>
        </div>
        <div>
          Date:  
          <input 
            type="date" 
            name="date" 
            required 
            onChange={this.handleInputChangeFor('date')}
          />
        </div>
        <div>
          Pick Up: 
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
        <div>
          <button onClick={this.scheduleWalk}>Schedule Walk</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(ScheduleWalkPage));