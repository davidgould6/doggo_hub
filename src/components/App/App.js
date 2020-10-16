import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Switch, } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

// Import components
import AddPetPage from '../AddPetPage/AddPetPage';
import Footer from '../Footer/Footer';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import Nav from '../Nav/Nav';
import RegisterPage from '../RegisterPage/RegisterPage';
import ScheduleGroomingPage from '../ScheduleGroomingPage/ScheduleGroomingPage';
import ScheduleWalkPage from '../ScheduleWalk/ScheduleWalkPage';
import UpcomingEvents from '../UpcomingEvents/UpcomingEvents';
import UserDoggos from '../UserDoggos/UserDoggos';
import UserPage from '../UserPage/UserPage';

// Import Css
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'FETCH_GALLERY' });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <ProtectedRoute
              // logged in shows ScheduleWalkPage else shows LoginPage
              exact
              path="/walk"
              component={ScheduleWalkPage}
            />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
              component={UserPage}
            />

            <ProtectedRoute
              // logged in shows ScheduleGroomingPage else shows LoginPage
              exact
              path="/grooming"
              component={ScheduleGroomingPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/user"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
              authRedirect="/user"
            />

            <ProtectedRoute
              // logged in shows AddPetPage else shows LoginPage
              exact
              path="/addpet"
              component={AddPetPage}
            />

            <ProtectedRoute
              // logged in shows UpcomingEvents else shows LoginPage
              exact
              path="/upcomingevents"
              component={UpcomingEvents}
            />

            <ProtectedRoute
              // logged in shows UserDoggos else shows LoginPage
              exact
              path="/userdoggos"
              component={UserDoggos}
            />


            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);