import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Carousel from 'react-material-ui-carousel'
import './LandingPageCarousel.css';
class LandingPageCarousel extends Component {

  // Component uses a carousel to carousel through a gallery of photos.

  render() {
    return (
      <div>
        <Carousel>
          {this.props.store.gallery.map((item, i) => 
            <img className='carouselImg' src={item.path} key={i}/>
          )}
        </Carousel>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPageCarousel);