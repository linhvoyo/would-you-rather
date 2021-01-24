import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Nav.css';

export default function Nav(props) {
  const { name, avatarURL } = props;
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <NavLink to="/" exact className="navbar-item" activeClassName="active">Home</NavLink>
        <NavLink to="/add" exact className="navbar-item" activeClassName="active">New Question</NavLink>
        <NavLink to="/leaderboard" exact className="navbar-item" activeClassName="active">Leader Board</NavLink>
      </div>
      {name && (
        <div className="navbar-end">
          <span className="navbar-item">{`Hello, ${name}`}</span>
          <img className="avatar" alt={`Avatar of ${avatarURL}`} src={avatarURL} />
          <span className="navbar-item">Logout</span>
        </div>
      )}
    </nav>
  );
}

Nav.propTypes = {
  name: PropTypes.string,
  avatarURL: PropTypes.string,
};

Nav.defaultProps = {
  name: '',
  avatarURL: '',
};
