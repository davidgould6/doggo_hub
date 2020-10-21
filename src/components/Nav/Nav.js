import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import material ui components from library core
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core/';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login',
  };

  let registerLinkData = {
    path: '/registration',
    text: 'Register'
  }

  if (props.store.user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'My Hub';
    registerLinkData.path = '/walk'
    registerLinkData.text = 'Schedule Walk';
  }

  return (
    <div>
      <AppBar position="static" style={{background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/home" className="links">Doggo Hub</Link>
          </Typography>

          <Button color="inherit">
            <Link className="links" to={loginLinkData.path}>
              {loginLinkData.text}
            </Link>
          </Button>

          <Button color="inherit">
            <Link className="links" to={registerLinkData.path}>
              {registerLinkData.text}
            </Link>
          </Button>

          {props.store.user.id && (
            <>
            <Button color="inherit">
              <Link className="links" to="/grooming">
                Schedule Grooming
              </Link>
            </Button>

            <Button color="inherit">
              <Link className="links" to="/addpet">
                Add Pet
              </Link>
            </Button>
            
            <LogOutButton className="links" />
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);


{/* <Button color="inherit">
              <Link className="links" to={registerLinkData.path}>{registerLinkData.text}</Link>
            </Button> */}