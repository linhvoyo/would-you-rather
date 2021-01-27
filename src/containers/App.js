import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoadingBar from 'react-redux-loading';
import { Route, Redirect } from 'react-router-dom';

import './App.css';
import {
  logOut,
  handleGetUsers,
} from '../store/actions';
import HomePage from './HomePage';
import Nav from '../components/Nav';
import CreateQuestion from './CreateQuestion';
import Poll from './Poll';
import LeaderBoard from '../components/LeaderBoard';
import LogIn from './LogIn';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleGetUsers());
  }

  render() {
    const {
      authedUser,
      dispatch,
      users,
    } = this.props;

    console.log(Object.entries(users).length);
    return (
      <div className="App">
        <LoadingBar />
        {!authedUser ? <Nav />
          : (
            <Nav
              name={users[authedUser].name}
              avatarURL={users[authedUser].avatarURL}
              onLogOut={() => dispatch(logOut())}
              authUser={authedUser}
            />
          )}
        {!authedUser && <Redirect to="/login" />}
        <Route path="/login" exact component={LogIn} />
        <Route path="/" exact component={HomePage} />
        <Route path="/question/:id" component={Poll} />
        <Route path="/leaderboard" exact render={() => <LeaderBoard users={users} />} />
        <Route path="/add" exact component={CreateQuestion} />
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
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
