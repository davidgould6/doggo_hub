import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  console.log('in nav.js', props);
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
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Doggo Hub</h2>
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to={loginLinkData.path}>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {loginLinkData.text}
        </Link>
        
        {props.store.user.id === null ?
          <Link className="nav-link" to={registerLinkData.path}>
          {registerLinkData.text}
          </Link> :
          null
        }

        <Link className="nav-link" to={registerLinkData.path}>
          {registerLinkData.text}
        </Link>

        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            <Link className="nav-link" to="/grooming">
              Schedule Grooming
            </Link>
            <LogOutButton className="nav-link" />
          </>
        )}
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
