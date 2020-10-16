import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import WalkListUDItem from '../WalkListUDItem/WalkListUDItem';

class WalkListUD extends Component {
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_WALK`});
    this.props.dispatch({ type: `FETCH_GROOMING`});
  }
  render() {
    return (
      <div>
        <h2>Edit Events</h2>
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