import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading';
import { Route } from 'react-router-dom';

import './App.css';
import { initApp, authenticateUser } from '../store/actions';
import HomePage from './HomePage';
import Nav from '../components/Nav';
import CreateQuestion from '../components/CreateQuestion';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(authenticateUser());
    dispatch(initApp());
  }

  createQuestionHandler = (opt1, opt2) => {
    console.log('create question');
    console.log(opt1);
    console.log(opt2);
  }

  render() {
    const { appLoaded, authedUser } = this.props;
    return (
      <div className="App">
        <LoadingBar />
        <Nav />
        {(authedUser && appLoaded) && (
          <>
            <Route path="/" exact component={HomePage} />
            <Route path="/add" exact render={() => <CreateQuestion onCreateQuestion={this.createQuestionHandler} />} />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, ui }) => ({
  appLoaded: ui.appLoaded,
  authedUser,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appLoaded: PropTypes.bool.isRequired,
  authedUser: PropTypes.string.isRequired,
};
