import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from 'react-bulma-components';
import {
  handleGetUsers,
  authenticateUser,
} from '../store/actions';

class LogIn extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleGetUsers());
  }

  signInHandler = (event) => {
    event.preventDefault();
    const user = event.target.user.value;
    const { dispatch } = this.props;
    dispatch(authenticateUser(user));
  };

  render() {
    const { authedUser, users } = this.props;
    if (authedUser) return <Redirect to="/" />;

    return (
      <div className="Login">
        <h1>Please sign in to continue </h1>
        <form onSubmit={this.signInHandler}>
          <div className="select">
            <select name="user">
              {users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
            </select>
            <Button className="button is-primary" type="submit">Sign In</Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users: Object.keys(users).map((user) => users[user]),
});

export default connect(mapStateToProps)(LogIn);

LogIn.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  authedUser: PropTypes.string,
};

LogIn.defaultProps = {
  authedUser: '',
};
