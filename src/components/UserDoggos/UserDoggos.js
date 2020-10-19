import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import {Switch, Tooltip} from '@material-ui/core';
import DoggoList from '../DoggosList/DoggosList';
import DoggoListUD from '../DoggosListUD/DoggosListUD';

class UserDoggos extends Component {

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
        <h2>Your Doggos</h2>
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