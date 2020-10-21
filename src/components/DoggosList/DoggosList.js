import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import css
import './DoggosList.css';

class DoggosList extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  render() {
    return (
      <div className="outsideDivLists">
        {this.props.store.petReducer.map((pet, i) =>
        <div className="doggoList" key={i}>
          <img className="userPetImage" src={pet.image_url} />
          <div className="imageBullets">
            <ul>
              <li>Name: {pet.name}</li>
              <li>Age: {pet.age}</li>
              <li>Size: {pet.size}</li>
            </ul>
          </div>
        </div>
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DoggosList);