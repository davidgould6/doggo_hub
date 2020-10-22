import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import material ui components from library core
import {
  Card, Container, Grid, Typography, Slide
}
from '@material-ui/core/';

// Import css
import './DoggosList.css';

class DoggosList extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  state = {
    isChecked: true
  }

  render() {
    return (
      <Slide direction="up" in={this.state.isChecked}>
        <Container>
          Your Doggos
          <Grid container spacing={0}>
            <Grid item md={12}>
            {this.props.store.petReducer.map((pet, i) =>
            <Card key={i} variant="outlined" style={{marginBottom: 10}}>
              <div className="doggoListItem">
                <img className="userPetImage" src={pet.image_url} alt="oops"/>
                <div className="doggoList">
                  <li className="removeBulletsDoggo"><Typography>Name: {pet.name}</Typography></li>
                  <li className="removeBulletsDoggo"><Typography>Age: {pet.age}</Typography></li>
                  <li className="removeBulletsDoggo"><Typography>Size: {pet.size}</Typography></li>
                </div>
              </div>
            </Card>
            )}
            </Grid>
          </Grid>
        </Container> 
      </Slide>
    );
  }
}

export default connect(mapStoreToProps)(DoggosList);