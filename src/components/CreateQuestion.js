import React from 'react';

import { Button } from 'react-bulma-components';
import './CreateQuestion.css';

const CreateQuestion = () => {
  const optOneInput = React.useRef(null);
  const optTwoInput = React.useRef(null);

  function clickHandler(event) {
    event.preventDefault();
    console.log(optOneInput.current.value);
    console.log(optTwoInput.current.value);
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
