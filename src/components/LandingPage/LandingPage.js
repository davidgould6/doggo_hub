import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import custom component
import LandingPageCarousel from '../LandingPageCarousel/LandingPageCarousel';

// Import css
import './LandingPage.css';

// Import Typography from material ui
import Typography from '@material-ui/core/Typography';

class LandingPage extends Component {
  state = {
    heading: 'About Doggo Hub',
  };

  render() {
    return (
      <div className="container">
        <Typography variant="h2" gutterBottom>Welcome to Doggo Hub!</Typography>
        <div className="grid">
          <div className="grid-col grid-col_8">
            <Typography variant="h6">
              Doggo Hub is an app designed for dog owners who may not have time to take their doggo
              for a walk or to schedule a grooming for their doggo in person or on the phone via voice.
              We will pick up your doggo from your address for the walk!
              Currently there is only one location to schedule groomings for your doggo. 
            </Typography>
          </div>
          <div className="grid-col grid-col_4">
            <LandingPageCarousel />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
