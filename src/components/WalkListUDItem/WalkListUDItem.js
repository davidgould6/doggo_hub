import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert';

class WalkListUDItem extends Component {

  state = {
    isEdit: false,
    date: this.props.walk.time.split( 'T' )[0]
  }

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
  } 

  editOnClick = () =>{
    this.setState({
      isEdit: !this.state.isEdit
    });
  }

  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; 

  submitChangeForDate = () => {
    console.log('in submitchangefordate click function');
    swal({
      title: "Is the selected date correct?",
      icon: "info",
      buttons: true,
      dangerMode: true,
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
        })
      }
      else{
        swal("Please select the correct date");
      }
    });
  }

  render() {
    return (
      <div>
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

        <div>
        <IconButton 
          aria-label="edit"
          onClick={this.editOnClick}
          >
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