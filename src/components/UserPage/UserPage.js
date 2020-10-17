import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import swal from 'sweetalert';
import './UserPage.css';
import DoggoList from '../DoggosList/DoggosList';
import GroomingList from'../GroomingList/GroomingList';
import WalkList from '../WalkList/WalkList';

class UserPage extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  goToUpcomingEvents = () => {
    swal({
      title: "You are about to be taken to upcoming events.",
      text: "Would you like to proceed?",
      buttons: {
        cancel: "Cancel",
        yes: true,
      }
    }).then(isCorrect => {
      if(isCorrect){
        this.props.history.push('/upcomingevents');
      }
    })
    
  }

  goToUserDoggos = () => {
    swal({
      title: "You are about to be taken to your doggos.",
      text: "Would you like to proceed?",
      buttons: {
        cancel: "Cancel",
        yes: true,
      }
    }).then(isCorrect => {
      if(isCorrect){
        this.props.history.push('/userdoggos');
      }
    })
  }

  render() {
    console.log('in userpage these are our props', this.props);
    return (
      <div className="userContainer">
        <h1 id="welcome">Welcome to your hub {this.props.store.user.first_name} {this.props.store.user.last_name}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <div 
          className="userInfo"
          onClick={this.goToUpcomingEvents}
        > 
          <h3>Upcoming Events</h3>
          <GroomingList />
          <WalkList />
        </div>
        <div 
          className="userInfo"
          onClick={this.goToUserDoggos}
        >
          <h3>Your Doggos</h3>
          <DoggoList />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withRouter(UserPage));
