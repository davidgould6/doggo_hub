import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {withRouter} from 'react-router-dom';
import {Typography, Grid, Paper} from '@material-ui/core/';
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
        <Typography variant="h3">Welcome to your hub {this.props.store.user.first_name} {this.props.store.user.last_name}!</Typography>
        <Grid container spacing={4}>
          <Grid item xs={6} 
          onClick={this.goToUpcomingEvents}
          >
            <Typography variant="h5" gutterBottom>
              Upcoming Events
            </Typography>
            <Paper >
              <GroomingList />
              <WalkList />
            </Paper>
          </Grid>
          <Grid item xs={6} 
          onClick={this.goToUserDoggos}
          >
            <Typography variant="h5" gutterBottom>
              Your Doggos
            </Typography>
            <Paper>
              <DoggoList />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withRouter(UserPage));
