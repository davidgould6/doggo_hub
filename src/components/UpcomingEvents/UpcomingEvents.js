import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import material ui components from library core
import {Switch, Tooltip, Typography} from '@material-ui/core';

// Import custom components
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

  // Local state to hold a boolean value for the toggle featue for edit.
  state = {
    checkedA: false,
  };

  // Function handles switch for the Switch to set to opposite of current state
  handleChangeForSwitch = () => {
    this.setState({
      checkedA: !this.state.checkedA
    });
  };

  render() {
    return (
      <div>
        <div className="userTitles">
          <Typography variant="h4" gutterBottom>Upcoming Events</Typography>
        </div>
        <Tooltip title="Toggle to edit." placement="right">
          <Switch 
            checked={this.state.checkedA}
            onChange={this.handleChangeForSwitch}
            name="checkedA"
          />
        </Tooltip>
        {this.state.checkedA === false ?
          <div>
            <GroomingList />
            <WalkList />
          </div>:
          <div>
            <GroomingListUD />
            <WalkListUD />
          </div>
        }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UpcomingEvents);