import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Switch, FormControlLabel} from '@material-ui/core';

import GroomingList from '../GroomingList/GroomingList';
import GroomingListUD from '../GroomingListUD/GroomingListUD';
import WalkList from '../WalkList/WalkList';
import WalkListUD from '../WalkListUD/WalkListUD';


class UpcomingEvents extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_WALK`});
    this.props.dispatch({ type: `FETCH_GROOMING`});
  };

  state = {
    checkedA: false,
  };

  handleChangeForSwitch = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked
    });
  };

  render() {
    return (
      <div>
        <h2>Upcoming Events</h2>
        <FormControlLabel 
        control={
          <Switch 
            checked={this.state.checkedA}
            onChange={this.handleChangeForSwitch}
            name="checkedA"
          />
        }
        label="Toggle to edit"
        />
        {this.state.checkedA === false ?
          <div>
            <WalkList />
            <GroomingList />
          </div>:
          <div>
            <WalkListUD />
            <GroomingListUD />
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UpcomingEvents);