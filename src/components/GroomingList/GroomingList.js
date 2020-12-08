import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import material ui components from library core
import {Card, Container, Grid, Typography, Slide}from '@material-ui/core/';

// Import css
import './GroomingList.css';

class GroomingList extends Component {
  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_GROOMING`});
    this.props.dispatch({ type: `FETCH_PETS`});
  };

  state = {
    isChecked: true
  }

  render() {
    return (
      <Slide direction="up" in={this.state.isChecked}>
        <Container>
          <div className="groomingWalkDoggo">Groomings</div>
          <Grid container spacing={0}>
            <Grid item md={12}>
              {this.props.store.groomingReducer.map((grooming, i) =>
              <Card variant="outlined" style={{marginBottom: 10,}}>
                <div className="groomingListItem">
                  <li className="removeBullets"><Typography>{grooming.name}</Typography></li>
                  <li className="removeBullets"><Typography>{grooming.time.split( 'T' )[0]}</Typography></li>
                  <li className="removeBullets"><Typography>{grooming.drop_off_address}</Typography></li>
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

export default connect(mapStoreToProps)(GroomingList);