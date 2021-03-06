import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bulma-components';
import './PollInfo.css';

export default function PollInfo(props) {
  const {
    avatar,
    author,
    id,
    onViewPoll,
    text,
  } = props;

  return (
    <div className="PollInfo poll-container">
      <img className="thumbnail-img" alt={`Avatar of ${author}`} src={avatar} />
      <div className="poll-info">
        <h3 className="subtitle header">Would you rather</h3>
        <span>{`${text}...`}</span>
        <Button
          className="button is-info is-outlined"
          type="submit"
          onClick={() => onViewPoll(id)}
        >
          View Poll
        </Button>
      </div>
    </div>
  );
}

PollInfo.propTypes = {
  avatar: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onViewPoll: PropTypes.func.isRequired,
};
