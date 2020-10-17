import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import DoggosListUDItem from '../DoggosListUDItem/DoggosListUDItem';

class DoggosListUD extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  render() {
    return (
      <div>
        <ul>
          {this.props.store.petReducer.map((pet, i) =>
          <DoggosListUDItem 
            key={i}
            pet={pet}
          />
          )}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DoggosListUD);