import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddPetForm from '../AddPetForm/AddPetForm';

class AddPetPage extends Component {

  state = {
    heading: 'Add Pet',
  };

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <AddPetForm />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddPetPage);