import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

export default function AnswerCard(props) {
  const {
    id, text, correct, getAns, getCorrect,
  } = props;

  function handleChange(e) {
    getAns(id, e.target.value, correct);
  }

  function handleCorrect(e) {
    getCorrect(id, e.target.value);
  }

  return (
    <div>
      <label htmlFor="answer">
        Answers
        <input
          type="text"
          id={id}
          defaultValue={text}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <label htmlFor="correct">
        Correct
        <input
          onChange={(e) => handleCorrect(e)}
          type="text"
          id={id}
          defaultValue={correct}
        />
      </label>
      <br />
    </div>
  );
}

AnswerCard.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  getAns: PropTypes.func.isRequired,
  getCorrect: PropTypes.func.isRequired,
};
