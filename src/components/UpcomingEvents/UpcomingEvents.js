import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Switch from '@material-ui/core/Switch';

import WalkList from '../WalkList/WalkList';
import WalkListUD from '../WalkListUD/WalkListUD';


class UpcomingEvents extends Component {
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_WALK`});
    this.props.dispatch({ type: `FETCH_GROOMING`});
  }
  state = {
    checkedA: false,
  };

  handleChangeForSwitch = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.checked
    });
  }

  render() {
    console.log('this is state', this.state);
    return (
      <div>
        <h2>Upcoming Events</h2>
        <Switch 
          checked={this.state.checkedA}
          onChange={this.handleChangeForSwitch}
          name="checkedA"
        />
        {this.state.checkedA === false ?
          <WalkList /> :
          <WalkListUD />
      }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UpcomingEvents);