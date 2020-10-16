import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import GroomingListUDItem from '../GroomingListUDItem/GroomingListUDItem';

class GroomingListUD extends Component {
  
  render() {
    return (
      <div>
        <h2>Edit Groomings</h2>
        <ul>
          {this.props.store.groomingReducer.map((grooming, i) =>
          <GroomingListUDItem 
            key={i}
            grooming={grooming}
          />
          )}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(GroomingListUD);