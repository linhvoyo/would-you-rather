import React from 'react';
import PropTypes from 'prop-types';

import './LeaderBoard.css';

const LeaderBoard = (props) => {
  const { users } = props;

  const sortedUsers = Object.keys(users).map((user) => ({
    ...users[user],
    score: Object.keys(users[user].answers).length + users[user].questions.length,
  })).sort((a, b) => b.score - a.score);

  return (
    <div className="LeaderBoard">
      {sortedUsers.map((user) => (
        <div className="user" key={user.id}>
          <img className="avatar" alt={`Avatar of ${user.avatarURL}`} src={user.avatarURL} />
          <div className="user-info">
            <span>{user.name}</span>
            <table>
              <tbody>
                <tr>
                  <td>Answered Question</td>
                  <td>{Object.keys(user.answers).length}</td>
                </tr>
                <tr>
                  <td>Created Question</td>
                  <td>{user.questions.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="user-score">
            <span>Score</span>
            <div className="score-number">{user.score}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderBoard;

LeaderBoard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object.isRequired,
};