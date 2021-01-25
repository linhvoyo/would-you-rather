import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading';
import { Route, Redirect } from 'react-router-dom';

import './App.css';
import {
  createQuestion,
  logOut,
} from '../store/actions';
import HomePage from './HomePage';
import Nav from '../components/Nav';
import CreateQuestion from '../components/CreateQuestion';
import Poll from './Poll';
import LeaderBoard from '../components/LeaderBoard';
import LogIn from './LogIn';

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render() {
    const {
      authedUser,
      dispatch,
      users,
    } = this.props;

    return (
      <div className="App">
        <LoadingBar />
        <Route path="/login" exact component={LogIn} />
        {!authedUser ? <Redirect to="/login" /> : (
          <>
            <Nav
              name={users[authedUser].name}
              avatarURL={users[authedUser].avatarURL}
              onLogOut={() => dispatch(logOut())}
            />
            <Route path="/" exact component={HomePage} />
            <Route path="/question/:id" component={Poll} />
            <Route path="/leaderboard" exact render={() => <LeaderBoard users={users} />} />
            <Route
              path="/add"
              exact
              render={({ history }) => (
                <CreateQuestion
                  onCreateQuestion={async (opt1, opt2) => {
                    await dispatch(createQuestion(opt1, opt2));
                    history.push('/');
                  }}
                />
              )}
            />
          </>
        )}
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
  authedUser: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object.isRequired,
};
