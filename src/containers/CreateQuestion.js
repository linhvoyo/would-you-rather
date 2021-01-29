import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from 'react-bulma-components';
import './CreateQuestion.css';
import { createQuestion } from '../store/actions';

class CreateQuestion extends React.Component {
  isFormValid = (input1, input2) => {
    if (input1 === input2) return false;
    return true;
  }

  clickHandler = async (event) => {
    const { dispatch, history: { push } } = this.props;
    event.preventDefault();
    const input1 = this.input1.value;
    const input2 = this.input2.value;
    if (!this.isFormValid(input1, input2)) alert('Entered options cannot be the same');
    else {
      await dispatch(createQuestion(input1, input2));
      push('/');
    }
  }

  render() {
    const { authedUser, creatingQuestion } = this.props;

    if (!authedUser) return <Redirect to={{ pathname: '/login', state: { from: '/add' } }} />;

    return (
      <div className="Add">
        <h1 className="title">Create New Question</h1>
        <span>Fill out form:</span>
        <h3 className="subtitle" style={{ fontWeight: 'bold' }}>Would you rather...</h3>
        <form className="create-question" onSubmit={(event) => this.clickHandler(event)}>
          <input
            type="Text"
            placeholder="Enter Option One Text Here"
            ref={(input) => { this.input1 = input; }}
            required
          />
          <span>or</span>
          <input
            type="Text"
            placeholder="Enter Option Two Text Here"
            ref={(input) => { this.input2 = input; }}
            required
          />
          <Button className={`is-primary ${creatingQuestion ? 'is-loading' : ''}`}>Submit</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, ui }) => ({
  authedUser,
  creatingQuestion: ui.creatingQuestion,
});

export default connect(mapStateToProps)(CreateQuestion);

CreateQuestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  authedUser: PropTypes.string,
  creatingQuestion: PropTypes.bool.isRequired,
};
