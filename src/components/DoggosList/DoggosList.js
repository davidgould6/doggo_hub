import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class DoggosList extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  render() {
    return (
      <div>
        Doggos List
      </div>
    );
  }
}

export default connect(mapStoreToProps)(DoggosList);