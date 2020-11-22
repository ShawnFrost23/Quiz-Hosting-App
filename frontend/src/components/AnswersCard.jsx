// File Checked
import React from 'react';
import PropTypes from 'prop-types';

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
        <select name="correct" defaultValue={correct} id={id} onChange={(e) => handleCorrect(e)}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
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
