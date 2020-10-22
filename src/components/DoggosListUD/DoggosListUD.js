import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import custom component
import DoggosListUDItem from '../DoggosListUDItem/DoggosListUDItem';

class DoggosListUD extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  render() {
    return (
      <div>
        Edit Doggos
          {this.props.store.petReducer.map((pet, i) =>
          <DoggosListUDItem 
            key={i}
            pet={pet}
          />
          )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DoggosListUD);