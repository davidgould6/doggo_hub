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
import swal from 'sweetalert';

import DoggosList from '../DoggosList/DoggosList';

class DoggosListUDItem extends Component {

  // Local state to hold date prior to dispatch if disired change, also holds boolean for toggle feature.
  state = {
    isEdit: false,
    petName: this.props.pet.name,
    age: this.props.pet.age,
    size: this.props.pet.size
  };

  // Function sets state of isEdit to opposite of current state on click of the Switch component
  editOnClick = () =>{
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; 

  render() {
    console.log('this is our current state', this.state);
    return (
      <div>
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
        </div> :
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
                </FormControl>
              </li>
            </ul>
          </div>
        </div>
        }
        <div>
        <IconButton 
          aria-label="edit"
          onClick={this.editOnClick}
          >
          <EditIcon />
        </IconButton>
        <IconButton 
          aria-label="delete"
          onClick={() => this.delete(this.props.doggo.id)}
        >
            <DeleteIcon />
        </IconButton>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DoggosListUDItem);