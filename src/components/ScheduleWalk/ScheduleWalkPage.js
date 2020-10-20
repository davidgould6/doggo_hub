// react.js imports
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// import styling library components
import swal from 'sweetalert';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

// import custom styles material ui
import StyledButton from '../MaterialUiStyles/StyledButton';

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

  state = {
    dogToWalk: 'Please select a Doggo',
    date: '',
    address:'',
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
      <div className="scheduleContainer">
        <h1>Schedule a walk !</h1>
        <div>
          <FormControl>
            <InputLabel shrink id="selectDoggoToWalk">
                Select a Doggo to walk:
            </InputLabel>
            <Select 
              value={this.state.dogToWalk} 
              labelId="selectDoggoToWalk" 
              name="dogToWalk" 
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
            name="date"
            defaultValue="2020-10-26"
            className={classes.textField}
            onChange={this.handleInputChangeFor('date')}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="scheduleContainerItem">
          <FormControl>
            <InputLabel shrink id="selectDoggoToWalk">
              Pickup address:
            </InputLabel>
            <Select 
              value={this.state.address} 
              labelId="selectAddress" 
              name="address" 
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

      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(ScheduleWalkPage));