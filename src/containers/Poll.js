import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Poll.css';
import PollOptions from '../components/PollOptions';
import PollResults from '../components/PollResults';

class Poll extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: null,
    };
  }

  componentDidMount() {
    const { question, authedUser } = this.props;
    this.setState({
      answered: question.optionOne.votes.includes(authedUser)
        || question.optionTwo.votes.includes(authedUser),
    });
  }

  render() {
    const { answered } = this.state;
    const {
      authedUser,
      name,
      avatarURL,
      question,
    } = this.props;

    return (
      <div className="Poll">
        <h2 className="subtitle">{`${name} asks:`}</h2>
        <img className="avatar" alt={`Avatar of ${avatarURL}`} src={avatarURL} />
        <div className="poll-info">
          {answered ? (
            <PollResults
              authedUser={authedUser}
              options={[question.optionOne, question.optionTwo]}
            />
          )
            : <PollOptions optOne={question.optionOne.text} optTwo={question.optionTwo.text} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, questions, users }, props) => {
  const { id } = props.match.params;
  const { name, avatarURL } = users[questions[id].author];
  return {
    authedUser,
    question: questions[id],
    author: users[questions[id].author],
    name,
    avatarURL,
  };
};

export default connect(mapStateToProps)(Poll);

Poll.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  question: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  authedUser: PropTypes.string.isRequired,
};
