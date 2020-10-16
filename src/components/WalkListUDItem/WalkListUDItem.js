import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class WalkListUDItem extends Component {
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_WALK`});
    this.props.dispatch({ type: `FETCH_GROOMING`});
  }
  delete = (idToDelete) => {
    console.log('in delete button');
    console.log('this is our id to delete', idToDelete);
    this.props.dispatch({type: 'DELETE_WALK', payload: idToDelete});
  } 
  render() {
    console.log('these are our props in walklistuditem', this.props);
    return (
      <div className="upcomingEventChild">
        <li>{this.props.walk.name}</li>
        <li>{this.props.walk.time.split( 'T' )[0]}</li>
        <li>{this.props.walk.street} {this.props.walk.city}, {this.props.walk.state} {this.props.walk.zip}</li>
        <div>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton 
          aria-label="delete"
          onClick={() => this.delete(this.props.walk.id)}
        >
            <DeleteIcon />
        </IconButton>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(WalkListUDItem);