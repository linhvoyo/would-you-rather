import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import './Poll.css';
import PollOptions from '../components/PollOptions';
import PollResults from '../components/PollResults';
import { saveQuestion } from '../store/actions';

class Poll extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: null,
    };
  }

  componentDidMount() {
    const { authedUser, question } = this.props;
    if (authedUser && question !== null) {
      this.setState({
        answered: question.optionOne.votes.includes(authedUser)
          || question.optionTwo.votes.includes(authedUser),
      });
    }
  }

  pollSubmitHandler = async (event) => {
    event.preventDefault();
    const { dispatch, id } = this.props;
    const answer = event.target.poll.value;
    await dispatch(saveQuestion(id, answer));
    this.setState({ answered: answer });
  };

  render() {
    const { answered } = this.state;
    const {
      authedUser,
      id,
      question,
      author,
    } = this.props;

    if (!authedUser) return <Redirect to={{ pathname: '/login', state: { from: `/question/${id}` } }} />;
    return (
      <div className="Poll poll-container">
        {question && answered !== null ? (
          <>
            <img
              className="thumbnail-img"
              alt={`Avatar of ${author.avatarURL}`}
              src={author.avatarURL}
            />
            <div className="poll-info">
              <h3 className="subtitle header">{`${author.name} asks:`}</h3>
              {answered ? (
                <PollResults
                  authedUser={authedUser}
                  options={[question.optionOne, question.optionTwo]}
                />
              )
                : (
                  <PollOptions
                    onPollSubmit={this.pollSubmitHandler}
                    optOne={question.optionOne.text}
                    optTwo={question.optionTwo.text}
                  />
                )}
            </div>
          </>
        )
          : <span>{`Selected question no longer exists: ${id}`}</span>}
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.match.params;

  if (!authedUser) return { id };

  return {
    authedUser,
    question: id in questions ? questions[id] : null,
    author: id in questions ? users[questions[id].author] : null,
    id,
  };
};

export default connect(mapStateToProps)(Poll);

Poll.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  author: PropTypes.object,
  authedUser: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
  id: PropTypes.string,
};

Poll.defaultProps = {
  question: null,
  authedUser: null,
  author: null,
  id: '',
};
