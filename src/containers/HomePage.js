import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button } from 'react-bulma-components';
import './HomePage.css';
import PollThumbnail from '../components/PollThumbnail';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.answered = 'Answered';
    this.unanswer = 'Unanswered';

    this.state = {
      type: this.answered,
    };
  }

  submitPollHandler = (id) => {
    console.log(`Submit Poll ${id}`);
  };

  toggleTypeHandler = () => {
    this.setState((prev) => (
      { type: prev.type === this.answered ? this.unanswer : this.answered }));
  };

  render() {
    const { questions, users, authedUser } = this.props;
    const { type } = this.state;

    const answeredQs = questions.filter((q) => q.answeredBy.includes(authedUser));
    const unansweredQs = questions.filter((q) => !q.answeredBy.includes(authedUser));

    const showQuestions = type === this.answered ? answeredQs : unansweredQs;

    return (
      <div className="HomePage">
        <h1 className="title">HomePage</h1>
        <Button className="toggle-type" onClick={this.toggleTypeHandler}>
          {type === this.answered ? 'View Unanswered' : 'View Answered'}
        </Button>
        <ul>
          <h1 className="subtitle">{`${type} Questions`}</h1>
          {showQuestions.map((q) => (
            <li key={q.id}>
              <PollThumbnail
                author={q.author}
                avatar={users[q.author].avatarURL}
                id={q.id}
                onPollSubmit={this.submitPollHandler}
                text={q.optionOne.text || q.optionTwo.text}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapPropsToState = ({ questions, users, authedUser }) => ({
  authedUser,
  users,
  questions: Object.values(questions)
    .map((q) => ({ ...q, answeredBy: [...q.optionOne.votes, ...q.optionTwo.votes] })),
});

export default connect(mapPropsToState)(HomePage);

HomePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  questions: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.string.isRequired,
};
