import React from 'react';
import PropTypes from 'prop-types';
// import './index.css';

const playerID = localStorage.getItem('player');
const BASE_URL = 'http://localhost:5005';

export default function AnswerOption(props) {
  const { id, text } = props;

  async function putAnswer(ans) {
    const response = await fetch(`${BASE_URL}/play/${playerID}/question`, {
      body: JSON.stringify(ans),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    if (response.status === 200) {
      // All g
      console.log('yay');
    }
  }

  function handleClick(value) {
    const answerID = [];
    answerID.push(value);
    const newBody = {
      answerID,
    };
    putAnswer(newBody);
  }

  return (
    <li className="answerOption">
      <input
        type="button"
        className="radioCustomButton"
        name="radioGroup"
        id={id}
        value={text}
        onClick={(e) => handleClick(e.target.id)}
        // checked
      />
    </li>
  );
}

AnswerOption.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
