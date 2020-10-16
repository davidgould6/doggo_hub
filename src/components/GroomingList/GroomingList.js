import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class GroomingList extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_GROOMING`});
  }

  render() {
    return (
      <div>
        <ul className="upcomingEventUl">
          Groomings
          {this.props.store.groomingReducer.map((grooming, i) =>
            <div className="upcomingEventChild" key={i}>
              <li>{grooming.name}</li>
              <li>{grooming.time.split( 'T' )[0]}</li>
              <li>{grooming.drop_off_address}</li>
            </div>
          )}
        </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(GroomingList);