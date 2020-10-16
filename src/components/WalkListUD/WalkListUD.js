import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import WalkListUDItem from '../WalkListUDItem/WalkListUDItem';

class WalkListUD extends Component {
  
  render() {
    return (
      <div>
        <h2>Edit Walks</h2>
        <ul>
          {this.props.store.walkReducer.map((walk, i) =>
          <WalkListUDItem 
            key={i}
            walk={walk}
          />
          )}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(WalkListUD);