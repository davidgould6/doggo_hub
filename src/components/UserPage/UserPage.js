import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';

class UserPage extends Component {
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
  }
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome to your hub {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <div> This is where the Upcoming events are</div>
        <div> This is where your doggos are</div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
