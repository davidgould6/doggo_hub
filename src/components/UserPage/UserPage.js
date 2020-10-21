import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// Import material ui components from library core
import { Typography, Grid, Paper } from '@material-ui/core/';

// Import sweet alert
import swal from 'sweetalert';

// Import css
import './UserPage.css';

// Import custom components
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
          <Grid item xs={6} >
            <Typography variant="h5" gutterBottom onClick={this.goToUpcomingEvents}>
              Upcoming Events
            </Typography>
            <Paper onClick={this.goToUpcomingEvents}>
              <GroomingList />
              <WalkList />
            </Paper>
          </Grid>
          <Grid item xs={6} >
            <Typography variant="h5" gutterBottom onClick={this.goToUserDoggos}>
              Your Doggos
            </Typography>
            <Paper onClick={this.goToUserDoggos}>
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


{/* <div className="userContainer">
<Typography variant="h3">Welcome to your hub {this.props.store.user.first_name} {this.props.store.user.last_name}!</Typography>
<Grid container spacing={4}>
  <Grid item xs={6} >
    <Typography variant="h5" gutterBottom onClick={this.goToUpcomingEvents}>
      Upcoming Events
    </Typography>
    <Paper onClick={this.goToUpcomingEvents}>
      <GroomingList />
      <WalkList />
    </Paper>
  </Grid>
  <Grid item xs={6} >
    <Typography variant="h5" gutterBottom onClick={this.goToUserDoggos}>
      Your Doggos
    </Typography>
    <Paper onClick={this.goToUserDoggos}>
      <DoggoList />
    </Paper>
  </Grid>
</Grid>
</div> */}