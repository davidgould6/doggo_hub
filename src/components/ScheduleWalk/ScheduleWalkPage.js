// react.js imports
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import sweet alert
import swal from 'sweetalert';

// Import material ui components from library core
import {
  FormControl, FormHelperText, InputLabel, 
  makeStyles, MenuItem, Select, TextField, 
  Typography} 
from '@material-ui/core/';

// Import custom material ui styled button.
import StyledButton from '../../MaterialUiStyles/StyledButton';

// Styling for date input. 
const classes = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

class ScheduleWalkPage extends Component {

  componentDidMount(){
    this.props.dispatch({ type: 'FETCH_ADDRESS' });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  // Created local state to hold data from form locally on page.
  state = {
    dogToWalk: '',
    date: '',
    address:'',
  };

  // Function handles change for all forms.
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function dispatches to saga which goes to server to create a walk request with confirmation
  scheduleWalk = () => {
    // if user does not change value of select alert will prompt
    if(this.state.dogToWalk === ''){
      swal(`Please select a doggo for the walk.`);
    }
    // if user does not change value of select alert will prompt
    else if(this.state.date === ''){
      swal(`Please select the date for the walk.`);
    }
    // if user does not change value of select alert will prompt
    else if(this.state.address === ''){
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
          swal({
            title:"Your Doggo's walk has been scheduled!",
            text:"Now taking you to your hub!",
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
              dogToWalk: '',
              date: '',
              address: ''
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
      <form className="formPanel" onSubmit={this.scheduleWalk}>
        <Typography variant="h4">Schedule a walk!</Typography>
        <Typography variant="body2">fields with * are required</Typography>
        <div>
          <FormControl>
            <InputLabel required>
                Your Doggo
            </InputLabel>
            <Select 
              value={this.state.dogToWalk} 
              onChange={this.handleInputChangeFor("dogToWalk")}>
                {this.props.store.petReducer.map((pet, i) =>
                <MenuItem key={i} value={pet.id}>{pet.name}</MenuItem>
                )}
            </Select>
            <FormHelperText>
                Please select a doggo to walk.
            </FormHelperText>
          </FormControl>
        </div>
        <div className="scheduleContainerItem">
          <TextField
            id="date"
            label="Date"
            type="date"
            required
            defaultValue={this.state.date}
            className={classes.textField}
            onChange={this.handleInputChangeFor('date')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="scheduleContainerItem">
          <FormControl>
            <InputLabel required>
              Pickup address:
            </InputLabel>
            <Select 
              value={this.state.address} 
              onChange={this.handleInputChangeFor("address")}>
                {this.props.store.addressReducer.map((address, i) =>
                <MenuItem key={i} value={address.id}>{address.street} {address.city}, {address.state} {address.zip}</MenuItem>
                )}
            </Select>
            <FormHelperText>
                Please select an address for doggo pick up.
            </FormHelperText>
          </FormControl>
        </div>
        <div className="scheduleContainerItem">
          <StyledButton
            variant="contained"
            onClick={this.scheduleWalk}>Schedule Walk
          </StyledButton>
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(ScheduleWalkPage));