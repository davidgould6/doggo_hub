import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

class GroomingListUDItem extends Component {

  state = {
    isEdit: false,
  }

  delete = (idToDelete) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, your scheduled grooming will be removed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your grooming has been successfully unscheduled", {
          icon: "success",
        });
        this.props.dispatch({type: 'DELETE_GROOMING', payload: idToDelete});
      } else {
        swal("Your grooming is still scheduled!");
      }
    });
  } 

  editOnClick = () =>{
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  render() {
    return (
      <div>
        {this.state.isEdit === false ?
        <div className="upcomingEventChild">
          <li>{this.props.grooming.name}</li>
          <li>{this.props.grooming.time.split( 'T' )[0]}</li>
          <li>{this.props.grooming.drop_off_address}</li>
        </div> :
        <p>hello</p>
      }
        <div>
        <IconButton 
          aria-label="edit"
          onClick={this.editOnClick}
          >
          <EditIcon />
        </IconButton>
        <IconButton 
          aria-label="delete"
          onClick={() => this.delete(this.props.grooming.id)}
        >
            <DeleteIcon />
        </IconButton>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(GroomingListUDItem);