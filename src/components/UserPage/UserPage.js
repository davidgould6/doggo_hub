import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom';

// Import material ui components from library core
import {
  Accordion, AccordionDetails, AccordionSummary,
  Typography, Grid, Card, 
  CardActionArea, CardContent,CardMedia, 
  Container, Slide, Tooltip} 
from '@material-ui/core/';

// Import material ui icon
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Import sweet alert
import swal from 'sweetalert';

// Import css
import './UserPage.css';

// Import Carousel from react material ui
import Carousel from 'react-material-ui-carousel'

class UserPage extends Component {

  componentDidMount(){
    this.props.dispatch({ type: `FETCH_ADDRESS` });
    this.props.dispatch({ type: `FETCH_PETS`});
    this.props.dispatch({ type: `FETCH_WALK`});
    this.props.dispatch({ type: `FETCH_GROOMING`});
  };

  state = {
    isChecked: true
  }

  goToUpcomingEvents = () => {
    swal({
      title: "You are about to be taken to upcoming events.",
      text: "Would you like to proceed?",
      buttons: {
        cancel: "Cancel",
        yes: true,
      }
    }).then(isCorrect => {
      if(isCorrect){
        this.props.history.push('/upcomingevents');
      }
    })
    
  }

  goToUserDoggos = () => {
    swal({
      title: "You are about to be taken to your doggos.",
      text: "Would you like to proceed?",
      buttons: {
        cancel: "Cancel",
        yes: true,
      }
    }).then(isCorrect => {
      if(isCorrect){
        this.props.history.push('/userdoggos');
      }
    })
  }

  render() {
    
    return (
      <Slide direction="up" in={this.state.isChecked}>
        <Container maxWidth='lg'>
          <Typography variant="h3" style={{marginBottom: 50, marginTop: 50}}>Welcome to your hub {this.props.store.user.first_name} {this.props.store.user.last_name}!</Typography>
          <Grid container spacing={8}>
            <Grid item md={4}>
              <Typography variant="h5" gutterBottom onClick={this.goToUpcomingEvents}>
                Upcoming Events
              </Typography>
              <Accordion>
                <AccordionSummary
                  expandIcon={ 
                    <Tooltip title="Click to expand" placement="right">
                      <ExpandMoreIcon />
                    </Tooltip>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Groomings</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                {this.props.store.groomingReducer.map((grooming, i) =>
                  <Tooltip key={i} title="Click to go to upcoming events">
                    <Card key={i} variant="outlined" style={{marginBottom: 12}} onClick={this.goToUpcomingEvents}>
                    <li><Typography>{grooming.name}</Typography></li>
                    <li><Typography>{grooming.time.split( 'T' )[0]}</Typography></li>
                    <li><Typography>{grooming.drop_off_address}</Typography></li>
                    </Card>
                  </Tooltip> 
                )}
                </ul>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={ 
                    <Tooltip title="Click to expand" placement="right">
                      <ExpandMoreIcon />
                    </Tooltip>}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Walks</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                {this.props.store.walkReducer.map((walk, i) => 
                  <Tooltip key={i} title="Click to go to upcoming events">
                    <Card variant="outlined" style={{marginBottom: 12}} onClick={this.goToUpcomingEvents}>
                    <li><Typography>{walk.name}</Typography></li>
                    <li><Typography>{walk.time.split( 'T' )[0]}</Typography></li>
                    <li><Typography>{walk.street} {walk.city}, {walk.state} {walk.zip}</Typography></li>
                    </Card>
                  </Tooltip>
                )}
                </ul>
                </AccordionDetails>
              </Accordion>
            </Grid>
            
            <Grid item md={5}>
              <Typography variant="h5" gutterBottom style={{marginBottom: 7}}>
                Your Doggos
              </Typography>
              
                <Carousel
                autoPlay={false}
                navButtonsAlwaysVisible={true}>
                  {this.props.store.petReducer.map((pet, i) => 
                  <Card key={i}>
                    <Tooltip title="Click to go see your doggos">
                      <CardActionArea onClick={this.goToUserDoggos}>
                        <CardMedia
                          image={pet.image_url}
                          style={{height:430}}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h4" color="textPrimary" component="p">
                            {pet.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Tooltip>
                  </Card>
                  )}
                </Carousel>
            </Grid>
          </Grid>
        </Container>
      </Slide>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(UserPage));