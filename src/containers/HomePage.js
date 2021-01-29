import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { Button } from 'react-bulma-components';
import './HomePage.css';
import PollInfo from '../components/PollInfo';
import Spinner from '../components/UI/Spinner';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
    };
  }

  viewPollHandler = (id) => {
    const { history: { push } } = this.props;
    push(`/questions/${id}`);
  };

  toggleTypeHandler = () => {
    this.setState((prev) => ({ answered: !prev.answered }));
  };

  render() {
    const {
      questions,
      users,
      authedUser,
      appLoading,
    } = this.props;
    const { answered } = this.state;

    if (!authedUser) return <Redirect to={{ pathname: '/login', state: { from: '/' } }} />;

    const allQuestions = questions.filter((q) => q.answeredBy.includes(authedUser) === answered);

    const display = allQuestions.length ? allQuestions.map((q) => (
      <PollInfo
        key={q.id}
        author={q.author}
        avatar={users[q.author].avatarURL}
        id={q.id}
        onViewPoll={this.viewPollHandler}
        text={q.optionOne.text || q.optionTwo.text}
      />
    )) : <div><strong>Current list is empty!</strong></div>;

    return (
      <div className="HomePage">
        <Button className="toggle-type" onClick={this.toggleTypeHandler}>
          {answered ? 'View Unanswered' : 'View Answered'}
        </Button>
        <h1 className="subtitle">{`${answered ? 'Answered' : 'Unanswered'} Questions`}</h1>
        <div className="poll-list">
          {appLoading ? <Spinner /> : display}
        </div>
      </div>
    );
  }
}

const mapPropsToState = ({
  questions,
  users,
  authedUser,
  ui,
}) => ({
  authedUser,
  appLoading: ui.appLoading,
  users,
  questions: Object.values(questions)
    .map((q) => ({ ...q, answeredBy: [...q.optionOne.votes, ...q.optionTwo.votes] }))
    .sort((a, b) => b.timestamp - a.timestamp),
});

export default connect(mapPropsToState)(HomePage);

HomePage.propTypes = {
  questions: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
  authedUser: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  appLoading: PropTypes.bool.isRequired,
};
