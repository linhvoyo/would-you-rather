import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Button } from 'react-bulma-components';

import './App.css';
import { initApp } from '../actions';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(initApp());
  }

  render() {
    return (
      <div className="App">
        App
        <Button color="primary">My Bulma button</Button>
      </div>
    );
  }
}

export default connect()(App);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
