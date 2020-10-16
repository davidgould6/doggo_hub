import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LandingPageCarousel from '../LandingPageCarousel/LandingPageCarousel';
import './LandingPage.css';

class LandingPage extends Component {

  state = {
    heading: 'About Doggo Hub',
  };

  render() {
    return (
      <div className="container">
        <h2>{this.state.heading}</h2>

        <div className="grid">
          <div className="grid-col grid-col_8">
            <p>
              Doggo Hub is an app designed for dog owners who may not have time to take their doggo
              for a walk or to schedule a grooming for their doggo in person or on the phone via voice.
            </p>

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
