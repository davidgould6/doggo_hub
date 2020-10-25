import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom'

// Import material ui components from library core
import {
  FormControl, FormHelperText, InputLabel, 
  MenuItem, Select, TextField, 
  Typography, Slide} 
from '@material-ui/core/'

// Import sweet alert
import swal from 'sweetalert';

// Import custom material ui styled button.
import StyledButton from '../../MaterialUiStyles/StyledButton';

class ScheduleGroomingPage extends Component {
  
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: 'FETCH_ADDRESS' });
  };

  // Created local state to hold data from form locally on page.
  state = {
    dogToGroom: '',
    date: '',
    address: '',
    isChecked: true
  };

  // Function handles change for all forms.
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function dispatches to saga which goes to server to create a grooming request with confirmation
  scheduleGrooming = () => {
      // if user does not change value of select alert will prompt
      if(this.state.dogToGroom === ''){
        swal(`Please select a doggo for the grooming.`);
      }
      // if user does not change value of select alert will prompt
      else if(this.state.date === ''){
        swal(`Please select the date for the grooming.`);
      }
      // if user does not change value of select alert will prompt
      else if(this.state.address === ''){
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
            swal({
              title: "Your Doggo's grooming has been scheduled!",
              text:"Now taking you to your hub!",
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
                dogToGroom: '',
                date: '',
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
      <Slide direction="up" in={this.state.isChecked}>
        <form className="formPanel" onSubmit={this.scheduleGrooming}>
          <Typography variant="h4">Schedule a grooming!</Typography>
          <Typography variant="body2">fields with * are required</Typography>
          <div>
            <FormControl>
              <InputLabel required>
                  Your Doggo
              </InputLabel>
              <Select 
                value={this.state.dogToGroom} 
                onChange={this.handleInputChangeFor("dogToGroom")}>
                  {this.props.store.petReducer.map((pet, i) =>
                  <MenuItem key={i} value={pet.id}>{pet.name}</MenuItem>
                  )}
              </Select>
              <FormHelperText>
                  Please select a doggo for the grooming.
              </FormHelperText>
            </FormControl>
          </div>
          <div className="scheduleContainerItem">
            <TextField
                id="date"
                label="Date"
                type="date"
                required
                value={this.state.date}
                onChange={this.handleInputChangeFor('date')}
                InputLabelProps={{
                  shrink: true,
                }}
            />
          </div>
          <div className="scheduleContainerItem">
            <FormControl>
              <InputLabel required>
                Drop off location:
              </InputLabel>
              <Select 
                value={this.state.address} 
                onChange={this.handleInputChangeFor("address")}>
                  <MenuItem value={1}>101 Doggo Lane Blaine, MN 55449</MenuItem>
              </Select>
              <FormHelperText>
                  Please select a grooming location.
              </FormHelperText>
            </FormControl>
          </div>
          <div className="scheduleContainerItem">
            <StyledButton onClick={this.scheduleGrooming}>
              Schedule Grooming
            </StyledButton>
          </div>
        </form>
      </Slide>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(ScheduleGroomingPage));