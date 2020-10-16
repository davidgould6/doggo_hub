import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import Switch from '@material-ui/core/Switch';


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
        <h2>User Doggos</h2>
        <Switch 
          checked={this.state.checkedA}
          onChange={this.handleChangeForSwitch}
          name="checkedA"
        />
        {this.state.checkedA === false ?
          <p>state is false</p> :
          <p>state is true</p>
      }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(UserDoggos);