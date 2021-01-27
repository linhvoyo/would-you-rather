import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from 'react-bulma-components';
import './Nav.css';

export default function Nav(props) {
  const {
    name,
    avatarURL,
    onLogOut,
    authUser,
  } = props;

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <NavLink to="/" exact className="navbar-item" activeClassName="active">Home</NavLink>
        <NavLink to="/add" exact className="navbar-item" activeClassName="active">New Question</NavLink>
        <NavLink to="/leaderboard" exact className="navbar-item" activeClassName="active">Leader Board</NavLink>
      </div>
      {authUser && (
        <div className="navbar-end">
          <span className="navbar-item">{`Hello, ${name}`}</span>
          <img className="avatar" alt={`Avatar of ${avatarURL}`} src={avatarURL} />
          <span className="navbar-item">
            <Button type="button" onClick={onLogOut}>Logout</Button>
          </span>
        </div>
      )}
    </nav>
  );
}

Nav.propTypes = {
  authUser: PropTypes.string,
  name: PropTypes.string,
  avatarURL: PropTypes.string,
  onLogOut: PropTypes.func,
};

Nav.defaultProps = {
  authUser: null,
  name: null,
  avatarURL: null,
  onLogOut: null,
};
