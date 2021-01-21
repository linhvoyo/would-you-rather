import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  return (
    <nav className="Nav">
      <div className="navbar-start">
        <NavLink to="/" className="navbar-item">Home</NavLink>
        <NavLink to="/add" className="navbar-item">New Question</NavLink>
      </div>
    </nav>
  );
}
