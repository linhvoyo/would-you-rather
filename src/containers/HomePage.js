import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PollThumbnail from '../components/PollThumbnail';

class HomePage extends React.Component {
  submitPollHandler = (id) => {
    console.log(`Submit Poll ${id}`);
  };

  render() {
    console.log('[HomePage.js] ');
    console.log(this.props);
    const { questions, users, authedUser } = this.props;
    const [question] = questions;
    console.log(questions);

    const answeredQs = questions.filter((q) => q.answeredBy.includes(authedUser));
    const unansweredQs = questions.filter((q) => !q.answeredBy.includes(authedUser));

    const showQuestions = answeredQs;
    return (
      <div className="Homepage">
        Homepage
        <PollThumbnail
          author={question.author}
          avatar={users[question.author].avatarURL}
          id={question.id}
          onPollSubmit={this.submitPollHandler}
          text={question.optionOne.text || question.optionTwo.text}
        />
        <ul>
          <span>Answered Questions</span>
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
