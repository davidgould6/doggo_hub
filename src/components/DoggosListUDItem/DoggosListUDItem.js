import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import sweet alert
import swal from 'sweetalert';

// Import Icons from material ui
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

// Import material ui components from library core
import {
  Button, Card, Container, 
  Grid, FormControl, Slide, 
  IconButton, InputLabel, MenuItem, 
  Select, TextField, Tooltip, 
  Typography} 
from '@material-ui/core/';

// Import css
import './DoggosListUDItem.css';

class DoggosListUDItem extends Component {
  // Local state to for this specific doggo has it's name, age, and size to keep same values on edit click
  // dispatch if disired change, also holds boolean for toggle feature.
  state = {
    isEdit: false,
    petName: this.props.pet.name,
    age: this.props.pet.age,
    size: this.props.pet.size,
    isChecked: true
  };

  // Function sends dispatch for delete to grooming saga with confirmations.
  delete = (idToDelete) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, your doggo will be removed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your doggo has been successfully removed", {
          icon: "success",
        });
        this.props.dispatch({type: 'DELETE_PET', payload: idToDelete});
      } 
      else {
        swal("Your doggo is safe!");
      }
    });
  };

  // Function sets state of isEdit to opposite of current state on click of the Switch component
  editOnClick = () =>{
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  // Function handles input changes for editing name, age, && size.
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; 

  // Function sends dispatch to pet router to update in the database with confirmations.
  submitChangeForPet = () => {
    swal({
      text: "Is the information you'd like to update correct?",
      buttons: {
        cancel: "No",
        yes: true,
      }
    }).then(isCorrect => {
      if(isCorrect){
        // creating an object to send as payload in dispatch
        const objectToChange = {
          petName: this.state.petName,
          age: this.state.age,
          size: this.state.size,
          id: this.props.pet.id
        }
        // Sends dispatch to pet router for put request to server
        this.props.dispatch({
          type: 'UPDATE_PET',
          payload: objectToChange
        });
        // Setting state to false upon complete of change to show change
        this.setState({
          isEdit: false
        });
        swal("Your Doggo's information has been updated!", {
          icon: "success"
        });
      }
      else{
        swal("Please update to the correct information.");
      };
    });
  };

  render() {
    return (
      <Slide direction="up" in={this.state.isChecked}>
        <Container>
          {this.state.isEdit === false ?
            <Grid container spacing={0}>
              <Grid item md={12}>
                <Card variant="outlined" style={{marginBottom: 10}}>
                  <div className="doggoListItem">
                    <img className="userPetImage" src={this.props.pet.image_url} alt="oops"/>
                    <div className="doggoList">
                      <li className="removeBulletsDoggo">
                        <Typography>
                          Name: {this.props.pet.name}
                        </Typography>
                      </li>
                      <li className="removeBulletsDoggo">
                        <Typography>
                          Age: {this.props.pet.age}
                        </Typography>
                      </li>
                      <li className="removeBulletsDoggo">
                        <Typography>
                          Size: {this.props.pet.size}
                          <Tooltip title="Edit" placement="left">
                            <IconButton 
                              aria-label="edit"
                              onClick={this.editOnClick}
                            >
                              <EditIcon fontSize="small"/>
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete" placement="right">
                            <IconButton 
                              aria-label="delete"
                              onClick={() => this.delete(this.props.pet.id)}
                            >
                              <DeleteIcon fontSize="small"/>
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </li>
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>:
            <Grid container spacing={0}>
              <Grid item md={12}>
                <Card variant="outlined" style={{marginBottom: 10}}>
                  <div className="doggoListItem">
                      <img className="userPetImage" src={this.props.pet.image_url} alt="oops"/>
                      <div className="doggoList">
                        <div className="doggoFields">
                          <TextField 
                            id="standard-basic"  
                            type="text" 
                            label="Name:" 
                            value={this.state.petName} 
                            onChange={this.handleInputChangeFor("petName")}/>
                        </div>
                        <div className="doggoFields">
                          <TextField 
                            id="standard-basic" 
                            type="number" 
                            label="Age:" 
                            value={this.state.age} 
                            onChange={this.handleInputChangeFor("age")}/>
                        </div>
                        <div className="doggoFields">
                          <FormControl>
                            <InputLabel>
                                Size:
                            </InputLabel>
                            <Select value={this.state.size} onChange={this.handleInputChangeFor("size")}>   
                              <MenuItem value="Small">Small</MenuItem>
                              <MenuItem value="Medium">Medium</MenuItem>
                              <MenuItem value="Large">Large</MenuItem>
                            </Select>
                            <div>
                              <Button
                                variant="contained"
                                size="small"
                                style={{marginTop: 3.5}}
                                startIcon={<SaveIcon />}
                                onClick={this.submitChangeForPet}
                              >
                                Save
                              </Button>
                              <IconButton 
                                aria-label="edit"
                                onClick={this.editOnClick}
                                >
                                <EditIcon fontSize="small"/>
                              </IconButton>
                            </div>
                          </FormControl>
                      </div>
                    </div>
                  </div>
                </Card>
              </Grid>
            </Grid>
          }
        </Container>
      </Slide>
    );
  }
}

export default connect(mapStoreToProps)(DoggosListUDItem);