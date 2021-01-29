import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'react-bulma-components';
import { logIn, handleGetUsers } from '../store/actions';
import Spinner from '../components/UI/Spinner';

class LogIn extends React.Component {
  componentDidMount() {
    const { dispatch, users } = this.props;
    if (!Object.entries(users).length) dispatch(handleGetUsers());
  }

  signInHandler = async (event) => {
    event.preventDefault();
    const { dispatch, history, location } = this.props;
    const user = event.target.user.value;
    await dispatch(logIn(user));
    if (location && location.state) history.push(location.state.from);
    else history.push('/');
  };

  render() {
    const { appLoading, users } = this.props;
    return users.length ? (
      <div className="Login">
        <h1>Please sign in to continue </h1>
        <form onSubmit={this.signInHandler}>
          <div className="select">
            <select name="user">
              {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <Button className={`button is-primary ${appLoading ? 'is-loading' : ''}`} type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    ) : <Spinner />;
  }
}

const mapStateToProps = ({ authedUser, users, ui }) => ({
  authedUser,
  users: Object.keys(users).map((user) => users[user]),
  appLoading: ui.appLoading,
});

export default connect(mapStateToProps)(LogIn);

LogIn.propTypes = {
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  appLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
