import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import custom component
import WalkListUDItem from '../WalkListUDItem/WalkListUDItem';

class WalkListUD extends Component {

  render() {
    return (
      <div>
        <div className="editUpcoming">Edit Walks</div>
          {this.props.store.walkReducer.map((walk, i) =>
          <WalkListUDItem 
            key={i}
            walk={walk}
          />
          )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(WalkListUD);