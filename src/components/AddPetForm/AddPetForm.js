import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from "react-router-dom";

// Import sweet alert
import swal from 'sweetalert';

// Import material ui components from library core
import {
  FormControl, FormHelperText, InputLabel, 
  MenuItem, Select, TextField, Typography,
  Slide,
} 
from '@material-ui/core/';

// Import custom material ui styled button.
import StyledButton from '../../MaterialUiStyles/StyledButton';

class AddPetForm extends Component {
  componentDidMount(){
    // Having this dispatch on page load in case user refreshes page still has access to users address.
    this.props.dispatch({ type: 'FETCH_ADDRESS' });
  };

  // Created local state to hold data from form locally on page.
  state = {
    petName: '',
    age: '',
    image_url: '',
    size: '',
    dogAddress: '',
    isChecked: true
  };

  // Function handles change for all three fields in form. 
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  // Function adds a pet, goes through multiple conditionals for confirmations for the user
  addPet = (event) => {
    event.preventDefault();
    // Alerts user if dog is < 0... ie -1, -2, -3, etc...
    if(this.state.age < 0 ){
      swal(`Your Doggo can't be younger than 0!`);
    }
    // If doggo age is valid will proceed to this code block.
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
          // if ok/yes/confirm/iscorrect runs this code block, sends dispatch to create pet.
          this.props.dispatch({
            type: 'CREATE_PET',
            payload: {
              petName: this.state.petName,
              age: this.state.age,
              image_url: this.state.image_url,
              size: this.state.size,
              dogAddress: this.state.dogAddress
            }
          });
              // Alerts user that their doggo has been added.
          swal({
            title: "Your Doggo has been added!",
            text: "Now taking you back to your hub.",
            icon: "success"
          }).then(() => {
            // Sets state back to default
            this.setState({
                petName: '',
                age: '',
                image_url:'',
                size: 'small'
            });
            // Brings user back to home page
            this.props.history.push('/home');
          });
          }
          else {
            // Alert tells user to correct anything that is incorrect.
            swal("Please correct any info that is incorrect");
          }
      });
    }      
  };

  render() {
    return (
      <Slide direction="up" in={this.state.isChecked}>
        <form className="formPanel" onSubmit={this.addPet}>
          <Typography variant="h4">Add a Doggo!</Typography>
          <Typography variant="body2">fields with * are required</Typography>
          {this.props.store.errors.registrationMessage && (
          <h3 className="alert" role="alert">
              {this.props.store.errors.registrationMessage}
          </h3>
          )}
          <div className="scheduleContainerItem">
            <label htmlFor="petName">
              <TextField
                id="outlined-basic"
                label="Pet Name"
                variant="outlined"
                type="text"
                required
                onChange={this.handleInputChangeFor('petName')}
              />
            </label>
          </div>
          <div className="scheduleContainerItem">
            <label htmlFor="age">
              <TextField
                id="outlined-basic"
                label="Age"
                variant="outlined"
                type="number"
                required
                onChange={this.handleInputChangeFor('age')}
              />
            </label>
          </div>
          <div className="scheduleContainerItem">
            <TextField
              id="outlined-basic"
              label="Image Url"
              variant="outlined"
              type="text"
              required
              onChange={this.handleInputChangeFor('image_url')}
            />
          </div>
          <div>
            <FormControl>
              <InputLabel required>
                Size:
              </InputLabel>
              <Select value={this.state.size} onChange={this.handleInputChangeFor("size")}>   
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
              </Select>
              <FormHelperText>
                Please select a size
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel required>
                Home Address:
              </InputLabel>
              <Select
                value={this.state.dogAddress}
                onChange={this.handleInputChangeFor("dogAddress")}>
                {this.props.store.addressReducer.map((address, i) => 
                <MenuItem value={address.id} key={i}>{address.street} {address.city}, {address.state} {address.zip}</MenuItem>
                )}
              </Select>
              <FormHelperText>
                Please select a home address
              </FormHelperText>
            </FormControl>
          </div>
          <div>
            <StyledButton 
              type="submit" 
              name="submit">
                Add Doggo
            </StyledButton>
          </div>
        </form>
      </Slide>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddPetForm));