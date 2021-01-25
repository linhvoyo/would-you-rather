import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from 'react-bulma-components';
import './CreateQuestion.css';

const CreateQuestion = (props) => {
  const [state, setState] = useState({
    buttonLoading: false,
  });

  const { onCreateQuestion } = props;

  const optOneInput = React.useRef(null);
  const optTwoInput = React.useRef(null);

  function isFormValid(input1, input2) {
    if (input1 === input2) return false;
    return true;
  }

  function clickHandler(event) {
    event.preventDefault();
    const input1 = optOneInput.current.value;
    const input2 = optTwoInput.current.value;
    if (!isFormValid(input1, input2)) alert('Entered options cannot be the same');
    else {
      onCreateQuestion(optOneInput.current.value, optTwoInput.current.value);
      setState({ buttonLoading: true });
    }
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
          required
        />
        <span>or</span>
        <input
          type="Text"
          placeholder="Enter Option Two Text Here"
          ref={optTwoInput}
          required
        />
        <Button className={`is-primary ${state.buttonLoading ? 'is-loading' : ''}`}>Submit</Button>
      </form>
    </div>
  );
};

export default CreateQuestion;

CreateQuestion.propTypes = {
  onCreateQuestion: PropTypes.func.isRequired,
};
