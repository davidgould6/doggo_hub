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
    date: this.props.grooming.time.split( 'T' )[0]
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
          id: this.props.grooming.id,
          date: this.state.date
        }
        this.props.dispatch({type: 'UPDATE_GROOMING', payload: objectToUpdate});
        this.setState({
          isEdit: false
        });
        swal("Your Doggo's grooming has been updated!", {
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
          <li>{this.props.grooming.name}</li>
          <li>{this.props.grooming.time.split( 'T' )[0]}</li>
          <li>{this.props.grooming.drop_off_address}</li>
        </div> :
        <div className="upcomingEventChild">
          <li>{this.props.grooming.name}</li>
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
          <li>{this.props.grooming.drop_off_address}</li>
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