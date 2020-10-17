import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import swal from 'sweetalert';


class DoggosListUDItem extends Component {

  // Local state to hold date prior to dispatch if disired change, also holds boolean for toggle feature.
  state = {
    isEdit: false,
    petName: this.props.pet.name,
    age: this.props.pet.age,
    size: this.props.pet.size
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
      } else {
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
      <div className="outsideDivLists">
        {this.state.isEdit === false ?
        <div className="doggoList">
          <img className="userPetImage" src={this.props.pet.image_url} />
          <div className="imageBullets">
            <ul>
              <li>Name: {this.props.pet.name}</li>
              <li>Age: {this.props.pet.age}</li>
              <li>Size: {this.props.pet.size}</li>
            </ul>
          </div>
        </div>:
        <div className="doggoList">
          <img className="userPetImage" src={this.props.pet.image_url} />
          <div className="imageBullets">
            <ul>
              <li><TextField id="standard-basic" name="petName" type="text" label="Name:" value={this.state.petName} onChange={this.handleInputChangeFor("petName")}/></li>
              <li><TextField id="standard-basic" name="age" type="number" label="Age:" value={this.state.age} onChange={this.handleInputChangeFor("age")}/></li>
              <li>
                <FormControl>
                  <InputLabel>
                      Size:
                  </InputLabel>
                  <Select value={this.state.size} name="size" onChange={this.handleInputChangeFor("size")}>   
                    <MenuItem value="Small">Small</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Large">Large</MenuItem>
                  </Select>
                  <FormHelperText>
                      Please Select a size
                  </FormHelperText>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<SaveIcon />}
                    onClick={this.submitChangeForPet}
                  >
                    Save
                  </Button>
                </FormControl>
              </li>
            </ul>
          </div>
        </div>
        }
        <div className="editDeleteTools">
        <Tooltip title="Edit" placement="left">
          <IconButton 
            aria-label="edit"
            onClick={this.editOnClick}
            >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="right">
          <IconButton 
            aria-label="delete"
            onClick={() => this.delete(this.props.pet.id)}
          >
              <DeleteIcon />
          </IconButton>
        </Tooltip>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DoggosListUDItem);