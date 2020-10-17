import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class WalkList extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_WALK`});
  }
  
  render() {
    return (
      <div className="outsideDivLists">
          <ul className="upcomingEventUl">
            Walks
            {this.props.store.walkReducer.map((walk, i) =>
            <div className="upcomingEventChild" key={i}>
              <li className="topListItem">{walk.name}</li>
              <li>{walk.time.split( 'T' )[0]}</li>
              <li className="bottomListItem">{walk.street} {walk.city}, {walk.state} {walk.zip}</li>
            </div>
            )}
          </ul>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(WalkList);