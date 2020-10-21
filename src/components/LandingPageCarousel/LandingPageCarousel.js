import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import Carousel from react material ui
import Carousel from 'react-material-ui-carousel'

// Import css
import './LandingPageCarousel.css';

class LandingPageCarousel extends Component {
  render() {
    return (
      <div>
        <Carousel>
          {this.props.store.gallery.map((item, i) => 
            <img className='carouselImg' src={item.path} key={i} alt="oops"/>
          )}
        </Carousel>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPageCarousel);