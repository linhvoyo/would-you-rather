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
import Poll from './Poll';
import LeaderBoard from '../components/LeaderBoard';

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
    const { appLoaded, authedUser, users } = this.props;
    return (
      <div className="App">
        <LoadingBar />
        {(authedUser && appLoaded) ? (
          <>
            <Nav name={users[authedUser].name} avatarURL={users[authedUser].avatarURL} />
            <Route path="/" exact component={HomePage} />
            <Route path="/add" exact render={() => <CreateQuestion onCreateQuestion={this.createQuestionHandler} />} />
            <Route path="/question/:id" component={Poll} />
            <Route path="/leaderboard" exact render={() => <LeaderBoard users={users} />} />
          </>
        ) : <Nav />}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, ui, users }) => ({
  appLoaded: ui.appLoaded,
  authedUser,
  users,
});

export default connect(mapStateToProps)(App);

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  appLoaded: PropTypes.bool.isRequired,
  authedUser: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object.isRequired,
};
