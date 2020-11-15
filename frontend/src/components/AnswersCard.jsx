import React from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';

export default function AnswerCard(props) {
  const {
    id, text, correct, func,
  } = props;

  function handleChange(e) {
    func(id, e.target.value);
  }
  return (
    <div>
      <label htmlFor="answer">
        Answers
        <input
            // onChange={(e) => setEmail(e.target.value)}
          type="text"
          id={id}
          defaultValue={text}
          onChange={(e) => handleChange(e)}
        />
      </label>
      <br />
      <label htmlFor="correct">
        Correct
        <input
            // onChange={(e) => setPassword(e.target.value)}
          type="text"
          id={id}
          value={correct}
        />
      </label>
      <br />
    </div>
  );
}

AnswerCard.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  correct: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
