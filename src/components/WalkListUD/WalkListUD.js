import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import custom component
import WalkListUDItem from '../WalkListUDItem/WalkListUDItem';

class WalkListUD extends Component {

  render() {
    return (
      <div>
        Edit Walks
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