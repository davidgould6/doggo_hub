import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import custom component
import GroomingListUDItem from '../GroomingListUDItem/GroomingListUDItem';

class GroomingListUD extends Component {
  render() {
    return (
      <div>
        <div className="editUpcoming">Edit Groomings</div>
        {this.props.store.groomingReducer.map((grooming, i) =>
        <GroomingListUDItem 
          key={i}
          grooming={grooming}
        />
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(GroomingListUD);