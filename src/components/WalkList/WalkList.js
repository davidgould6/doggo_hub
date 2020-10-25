import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import material ui components from library core
import {
  Card, Container, Grid, Typography, Slide
}
from '@material-ui/core/';

// Import css
import './WalkList.css';

class WalkList extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_WALK`});
  }

  state = {
    isChecked: true
  }
  
  render() {
    return (
      <Slide direction="up" in={this.state.isChecked}>
        <Container>
          <div className="groomingWalkDoggo">Walks</div>
          <Grid container spacing={0}>
            <Grid item md={12}>
              {this.props.store.walkReducer.map((walk, i) =>
              <Card key ={i} variant="outlined" style={{marginBottom: 10}}>
                <div className="walkListItem">
                  <li className="removeBullets"><Typography>{walk.name}</Typography></li>
                  <li className="removeBullets"><Typography>{walk.time.split( 'T' )[0]}</Typography></li>
                  <li className="removeBullets"><Typography>{walk.street} {walk.city}, {walk.state} {walk.zip}</Typography></li>
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

export default connect(mapStoreToProps)(WalkList);