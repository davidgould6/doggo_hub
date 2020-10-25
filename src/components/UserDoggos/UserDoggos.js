import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Switch, Tooltip, Typography} from '@material-ui/core';
import DoggoList from '../DoggosList/DoggosList';
import DoggoListUD from '../DoggosListUD/DoggosListUD';

class UserDoggos extends Component {

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
          <Typography variant="h4" gutterBottom>Your Doggos</Typography>
        </div>
        <Tooltip title="Toggle to edit." placement="right">
          <Switch 
            checked={this.state.checkedA}
            onChange={this.handleChangeForSwitch}
            name="checkedA"
          />
        </Tooltip>
        {this.state.checkedA === false ?
        <DoggoList /> :
        <DoggoListUD />
        }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UserDoggos);