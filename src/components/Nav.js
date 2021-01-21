import React from 'react';

import './Nav.css';

export default function Nav() {
  return (
    <nav className="Nav">
      <div className="navbar-start">
        <a href="/" className="navbar-item">Home</a>
        <a href="/add" className="navbar-item">New Question</a>
      </div>
    </nav>
  );
}
