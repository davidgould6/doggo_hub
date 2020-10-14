import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class LandingPageCarousel extends Component {

  render() {
    console.log('this is our props in landing carousel .js', this.props);
    return (
      <div>
        Landing Page Carousel
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPageCarousel);