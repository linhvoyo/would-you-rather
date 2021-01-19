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
    console.log(this.props);
    return (
      <div className="App">
        App
        <Button color="primary">My Bulma button</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => ({
  loading: ui.appLoading,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
