import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import material ui components from library core
import { AppBar, Button, ButtonGroup, Toolbar, Typography } from '@material-ui/core/';

// Import custom component
import LogOutButton from '../LogOutButton/LogOutButton';

// Import css
import './Nav.css';

const Nav = (props) => {
  return (
    <div>
      <AppBar position="static" style={{background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)'}}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link to="/home" className="links">Doggo Hub</Link>
          </Typography>
          
          {props.store.user.id === undefined ? 
          <ButtonGroup variant="text">
            <Button color="inherit">
              <Link className="links" to="/login">
                Login
              </Link>
            </Button>

            <Button color="inherit">
              <Link className="links" to="/registration">
                Register
              </Link>
            </Button>
          </ButtonGroup>:
          null
          }
          {props.store.user.id && (
            <>
            <ButtonGroup variant="text">
              <Button color="inherit">
                <Link className="links" to="/user">
                  My Hub
                </Link>
              </Button>
              <Button color="inherit">
                <Link className="links" to="/walk">
                  Schedule Walk
                </Link>
              </Button>
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
            </ButtonGroup>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);