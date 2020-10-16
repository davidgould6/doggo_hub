import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import './UserPage.css';

class UserPage extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_WALK`});
    this.props.dispatch({ type: `FETCH_GROOMING`});
  }

  render() {
    console.log('in userpage these are our props', this.props);
    return (
      <div className="userContainer">
        <h1 id="welcome">Welcome to your hub {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <div className="userInfo"> 
          <h3>Upcoming Events</h3>
              <ul className="upcomingEventUl">
                Groomings
                {this.props.store.groomingReducer.map((grooming, i) =>
                  <div className="upcomingEventChild" key={i}>
                    <li>{grooming.name}</li>
                    <li>{grooming.time.split( 'T' )[0]}</li>
                    <li>{grooming.drop_off_address}</li>
                  </div>
                )}
              </ul>
              <ul className="upcomingEventUl">
                Walks
                {this.props.store.walkReducer.map((walk, i) =>
                  <div className="upcomingEventChild" key={i}>
                    <li>{walk.name}</li>
                    <li>{walk.time.split( 'T' )[0]}</li>
                    <li>{walk.street} {walk.city}, {walk.state} {walk.zip}</li>
                  </div>
                )}
              </ul>

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
