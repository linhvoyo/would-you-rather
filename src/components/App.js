import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.css';
import { initApp } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initApp());
  }

  render() {
    return <div className="App">App</div>;
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(App);
