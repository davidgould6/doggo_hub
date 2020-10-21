import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import sweet alert
import swal from 'sweetalert';

// Import Icons from material ui
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Import material ui components from library core
import {IconButton, Tooltip} from '@material-ui/core'

class WalkListUDItem extends Component {

  // Local state to hold date prior to dispatch if disired change, also holds boolean for toggle feature.
  state = {
    isEdit: false,
    date: this.props.walk.time.split( 'T' )[0]
  };

  // Function sends dispatch for delete to grooming saga with confirmations.
  delete = (idToDelete) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, your scheduled walk will be removed!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Your walk has been successfully removed", {
          icon: "success",
        });
        this.props.dispatch({type: 'DELETE_WALK', payload: idToDelete});
      } else {
        swal("Your walk is still scheduled!");
      }
    });
  };

  // Function sets state of isEdit to opposite of current state on click of the Switch component
  editOnClick = () =>{
    this.setState({
      isEdit: !this.state.isEdit
    });
  };

  // Function handles changes of state for the date and potentially for any additional fields in the future.
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; 

  // Function sends dispatch to walk saga for update/put with confirmations and sets isEdit state back to false
  submitChangeForDate = () => {
    // console.log('in submitchangefordate click function');
    swal({
      text: "Is the selected date correct?",
      buttons: {
        cancel: "No",
        yes: true,
      }
    }).then(isCorrect => {
      if(isCorrect){
        let objectToUpdate = {
          id: this.props.walk.id,
          date: this.state.date
        }
        this.props.dispatch({type: 'UPDATE_WALK', payload: objectToUpdate});
        this.setState({
          isEdit: false
        });
        swal("Your Doggo's walk has been updated!", {
          icon: "success"
        });
      }
      else{
        swal("Please select the correct date");
      }
    });
  };

  render() {
    return (
      <div className="outsideDivLists">
        {this.state.isEdit === false ? 
        <div className="upcomingEventChild">
          <li>{this.props.walk.name}</li>
          <li>{this.props.walk.time.split( 'T' )[0]}</li>
          <li>{this.props.walk.street} {this.props.walk.city}, {this.props.walk.state} {this.props.walk.zip}</li>
        </div> :
        <div className="upcomingEventChild">
          <li>{this.props.walk.name}</li>
          <li>
            <input 
              type="date" 
              name="date" 
              value={this.state.date}
              onChange={this.handleInputChangeFor('date')}
              >
            </input>
            <button
              onClick={this.submitChangeForDate}
            >
              Submit Change
            </button>
          </li>
          <li>{this.props.walk.street} {this.props.walk.city}, {this.props.walk.state} {this.props.walk.zip}</li>
      </div>  
      }

        <div className="editDeleteTools">
        <Tooltip title="Edit" placement="left">
          <IconButton 
            aria-label="edit"
            onClick={this.editOnClick}
            >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete" placement="right">
          <IconButton 
            aria-label="delete"
            onClick={() => this.delete(this.props.walk.id)}
          >
              <DeleteIcon />
          </IconButton>
        </Tooltip>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(WalkListUDItem);