import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddPetForm from '../AddPetForm/AddPetForm';

class AddPetPage extends Component {

  render() {
    return (
      <div>
        <AddPetForm />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AddPetPage);