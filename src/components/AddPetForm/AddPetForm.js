import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import swal from 'sweetalert';
import {withRouter} from "react-router-dom";

class AddPetForm extends Component {
  // Created local state to hold data from form locally on page.
  state = {
    petName: '',
    age: '',
    image_url: '',
    size: 'small'
  };

  // Function handles change for all three fields in form. 
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  addPet = (event) => {
      event.preventDefault();
      // Alerts user if dog is < 0... ie -1, -2, -3, etc...
      if(this.state.age < 0 ){
          swal(`Your Doggo can't be younger than 0!`);
      }
      // If doggo age is valid will proceed to this code block.
      else{
        console.log('in add pet here is our state we are going to send', this.state);
        swal({
            title: "Is the submitted info correct?",
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "info",
            buttons: true,
            dangerMode: true,
          }).then(isCorrect => {
              if(isCorrect){
                  // Alerts user that their doggo has been added.
                  swal("Your Doggo has been added!", {
                      icon: "success"
                  }).then(() => {
                        this.props.dispatch({
                            type: 'CREATE_PET',
                            payload: {
                                petName: this.state.petName,
                                age: this.state.age,
                                image_url: this.state.image_url,
                                size: this.state.size
                            }
                        });
                      // Sets state back to default
                        this.setState({
                            petName: '',
                            age: '',
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
  }

  render() {
    // console.log('this is our state addpetform', this.state);
    return (
        <form className="formPanel" onSubmit={this.addPet}>
            <h2>Add a Doggo!</h2>
            {this.props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
                {this.props.store.errors.registrationMessage}
            </h3>
        )}
        <div>
          <label htmlFor="petName">
            Name:
            <input
              type="text"
              name="petName"
              value={this.state.petName}
              required
              onChange={this.handleInputChangeFor('petName')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="age">
            Age:
            <input
              type="number"
              name="age"
              value={this.state.age}
              required
              onChange={this.handleInputChangeFor('age')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="image_url">
            Image Url:
            <input
              type="text"
              name="image_url"
              value={this.state.image_ur}
              required
              onChange={this.handleInputChangeFor('image_url')}
            />
          </label>
        </div>
        <div>
          <label htmlFor="size">
            Size:
            <select
                name="size"
                value={this.state.size}
                required
                onChange={this.handleInputChangeFor('size')}
            >
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
            </select>


          </label>
        </div>
        <div>
          <input className="btn" type="submit" name="submit" value="Add Doggo" />
        </div>
      </form>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(AddPetForm));