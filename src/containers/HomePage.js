import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Button } from 'react-bulma-components';
import './HomePage.css';
import PollThumbnail from '../components/PollThumbnail';
import Spinner from '../components/UI/Spinner';
import { handleGetQuestions } from '../store/actions';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.answered = 'Answered';
    this.unanswered = 'Unanswered';

    this.state = {
      type: this.unanswered,
    };
  }

  viewPollHandler = (id) => {
    const { history: { push } } = this.props;
    push(`/question/${id}`);
  };

  toggleTypeHandler = () => {
    this.setState((prev) => (
      { type: prev.type === this.answered ? this.unanswered : this.answered }));
  };

  render() {
    const { questions, users, authedUser } = this.props;
    const { type } = this.state;

    if (!authedUser) return <Redirect to={{ pathname: '/login', state: { from: '/' } }} />;

    const answeredQs = questions.filter((q) => q.answeredBy.includes(authedUser));
    const unansweredQs = questions.filter((q) => !q.answeredBy.includes(authedUser));

    const showQuestions = type === this.answered ? answeredQs : unansweredQs;

    return (
      <div className="HomePage">
        <h1 className="title">HomePage</h1>
        <Button className="toggle-type" onClick={this.toggleTypeHandler}>
          {type === this.answered ? 'View Unanswered' : 'View Answered'}
        </Button>
        <h1 className="subtitle">{`${type} Questions`}</h1>
        <div className="poll">
          {showQuestions.length ? showQuestions.map((q) => (
            <PollThumbnail
              key={q.id}
              author={q.author}
              avatar={users[q.author].avatarURL}
              id={q.id}
              onViewPoll={this.viewPollHandler}
              text={q.optionOne.text || q.optionTwo.text}
            />
          ))
            : <Spinner />}
        </div>
      </div>
    );
  }
}

const mapPropsToState = ({ questions, users, authedUser }) => ({
  authedUser,
  users,
  questions: Object.values(questions)
    .map((q) => ({ ...q, answeredBy: [...q.optionOne.votes, ...q.optionTwo.votes] }))
    .sort((a, b) => b.timestamp - a.timestamp),
});

export default connect(mapPropsToState)(HomePage);

HomePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  questions: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
};
