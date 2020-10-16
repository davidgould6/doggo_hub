import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class DoggosList extends Component {

  render() {
    return (
      <div>
        <h2>Doggos List</h2>
          <div className="upcomingEventChild">
            <li>{this.props.walk.name}</li>
            <li>{this.props.walk.time.split( 'T' )[0]}</li>
            <li>{this.props.walk.street} {this.props.walk.city}, {this.props.walk.state} {this.props.walk.zip}</li>
          </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DoggosList);