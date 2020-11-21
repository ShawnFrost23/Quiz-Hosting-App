import React from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
// import './index.css';

const id1 = localStorage.getItem('player');
const BASE_URL = 'http://localhost:5005';

export default function AnswerOption(props) {
  const { id, text } = props;

  async function putAnswer(ans) {
    const response = await fetch(`${BASE_URL}/play/${id1}/answer`, {
      body: JSON.stringify({
        answerIds: ans,
      }),
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
    const answerIds = [];
    answerIds.push(value);
    putAnswer(answerIds);
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
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
