import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Carousel from 'react-material-ui-carousel'

class LandingPageCarousel extends Component {

  render() {
    console.log('this is our props in landing carousel .js', this.props);
    return (
      <div>
        <Carousel>
          {this.props.store.gallery.map((item, i) => 
            <img src={item.path} key={i}/>
          )}
        </Carousel>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPageCarousel);