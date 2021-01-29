import React from 'react';
import PropTypes from 'prop-types';

const PollResults = (props) => {
  const { authedUser, options } = props;
  const totalVotes = options.reduce((acc, curr) => acc + curr.votes.length, 0);
  return (
    <div className="PollResults">
      <h4>Results:</h4>
      {options.map((opt) => (
        <div className="option" key={opt.text}>
          <div className="question">{`${opt.text} ?`}</div>
          {opt.votes.includes(authedUser) && <div className="user-vote"><p>Your Vote</p></div>}
          <div className="progress-bar">
            <span>{`${((opt.votes.length / totalVotes) * 100).toFixed(2)} %`}</span>
            <progress
              className="progress is-primary is-large"
              value={opt.votes.length}
              max={totalVotes}
            />
          </div>
          <span className="question-stat">{`${opt.votes.length} out of ${totalVotes}`}</span>
        </div>
      ))}
    </div>
  );
};

export default PollResults;

PollResults.propTypes = {
  options: PropTypes.array.isRequired,
  authedUser: PropTypes.string.isRequired,
};
