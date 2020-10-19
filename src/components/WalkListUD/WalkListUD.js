import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import WalkListUDItem from '../WalkListUDItem/WalkListUDItem';

class WalkListUD extends Component {
  
  render() {
    return (
      <div>
        <ul>
          Edit Walks
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