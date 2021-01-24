import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bulma-components';

import './PollOptions.css';

const PollOptions = (props) => {
  const { optOne, optTwo, onPollSubmit } = props;
  return (
    <form className="poll-form" onSubmit={onPollSubmit}>
      <h4>Would You Rather...</h4>
      <label htmlFor="optOne">
        <input type="radio" id="optOne" name="poll" value="optionOne" required />
        &nbsp;
        {optOne}
      </label>
      <label htmlFor="optTwo">
        <input type="radio" id="optTwo" name="poll" value="optionTwo" required />
        &nbsp;
        {optTwo}
      </label>
      <Button className="is-primary" type="submit">Submit</Button>
    </form>
  );
};

export default PollOptions;

PollOptions.propTypes = {
  optOne: PropTypes.string.isRequired,
  optTwo: PropTypes.string.isRequired,
  onPollSubmit: PropTypes.func.isRequired,
};
