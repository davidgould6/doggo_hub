import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './UserPage.css';

class UserPage extends Component {
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_WALK`});
  }
  render() {
    console.log('in userpage these are our props', this.props);
    return (
      <div className="userContainer">
        <h1 id="welcome">Welcome to your hub {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <div className="userInfo"> 
          This is where the Upcoming events are
        </div>
        <div className="userInfo">
          <h3>Your Doggos</h3>
          <ul>
            <li className="mainUserList">
              {this.props.store.petReducer.map((pet, i) =>
              <div key={i}>
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
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
