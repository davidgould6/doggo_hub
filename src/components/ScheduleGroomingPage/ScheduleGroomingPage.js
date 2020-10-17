import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';
import {withRouter} from 'react-router-dom'


class ScheduleGroomingPage extends Component {
  
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: 'FETCH_ADDRESS' });
  };

  state = {
    dogToGroom: 'selectDog',
    date: '',
    address: 'selectAddress'
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function handles change for dogToGroom, needed it's own function to pass id
  handleInputChangeForDogToGroom = (event) => {
    this.setState({
      dogToGroom: event.target.value
    });
  };

  scheduleGrooming = () => {
      // if user does not change value of select alert will prompt
      if(this.state.dogToGroom === 'selectDog'){
        swal(`Please select a doggo for the grooming.`);
      }
      // if user does not change value of select alert will prompt
      else if(this.state.date === ''){
        swal(`Please select the date for the grooming.`);
      }
      // if user does not change value of select alert will prompt
      else if(this.state.address === 'selectAddress'){
        swal(`Please select a location for your doggo to be dropped off at.`);
      }
      // If all conditions are met will run this code block
      else{
        swal({
          title: "Is the submitted info correct?",
          icon: "info",
          buttons: {
            cancel: "No",
            yes: true,
          }
        }).then(isCorrect => {
          if(isCorrect){
            swal("Your Doggo's grooming has been scheduled!", {
              icon: "success"
            }).then(() => {
              this.props.dispatch({
                type: 'CREATE_GROOMING',
                payload: {
                  dogToGroom: this.state.dogToGroom,
                  date: this.state.date
                }
              });

              this.setState({
                dogToGroom: 'selectDog',
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
        <h1>Schedule Grooming!</h1>
        <div>
          Select Doggo:
          <select 
            name="dogToGroom"
            value={this.state.dogToGroom}
            required
            onChange={(event) => this.handleInputChangeForDogToGroom(event)}
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
            required onChange={this.handleInputChangeFor('date')}
          />
        </div>
        <div>
          Drop Off: 
          <select
            name="address"
            value={this.state.address}
            required
            onChange={this.handleInputChangeFor('address')}
            >
              <option disabled value="selectAddress"> -- Select an Address -- </option>
              <option>101 Doggo Lane Blaine, MN 55449</option>
          </select>
        </div>
        <div>
          <button onClick={this.scheduleGrooming}>Schedule Grooming</button>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(ScheduleGroomingPage));