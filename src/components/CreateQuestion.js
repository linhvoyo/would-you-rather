import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bulma-components';
import './CreateQuestion.css';

const CreateQuestion = (props) => {
  const { onCreateQuestion } = props;
  const optOneInput = React.useRef(null);
  const optTwoInput = React.useRef(null);

  function clickHandler(event) {
    event.preventDefault();
    onCreateQuestion(optOneInput.current.value, optTwoInput.current.value);
  }

  return (
    <div className="Add">
      <h1 className="title">Create New Question</h1>
      <span>Fill out form:</span>
      <h3 className="subtitle" style={{ fontWeight: 'bold' }}>Would you rather...</h3>
      <form className="create-question" onSubmit={(event) => clickHandler(event)}>
        <input
          type="Text"
          placeholder="Enter Option One Text Here"
          ref={optOneInput}
        />
        <span>or</span>
        <input
          type="Text"
          placeholder="Enter Option Two Text Here"
          ref={optTwoInput}
        />
        <Button className="is-primary">Testing</Button>
      </form>
    </div>
  );
};

export default CreateQuestion;

CreateQuestion.propTypes = {
  onCreateQuestion: PropTypes.func.isRequired,
};
