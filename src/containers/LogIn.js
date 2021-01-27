import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
  };

  render() {
    const { authedUser, appLoading, users } = this.props;
    if (authedUser) return <Redirect to="/" />;
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
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string,
  appLoading: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object.isRequired,
};

LogIn.defaultProps = {
  authedUser: '',
};
