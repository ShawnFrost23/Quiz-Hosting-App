// File checked
import React from 'react';
import PropTypes from 'prop-types';
import { putMethodOptions } from '../options';

const id1 = localStorage.getItem('player');
const BASE_URL = 'http://localhost:5005';

export default function AnswerOption(props) {
  const { id, text } = props;

  async function putAnswer(ans) {
    putMethodOptions.body = JSON.stringify({
      answerIds: ans,
    });
    putMethodOptions.headers.accept = 'application/json';
    const response = await fetch(`${BASE_URL}/play/${id1}/answer`, putMethodOptions);
    if (response.status === 200) {
      console.log(response);
    }
  }

  function handleClick(value) {
    const answerIds = [];
    answerIds.push(value);
    putAnswer(answerIds);
  }
  if (text.length > 0) {
    return (
      <button
        type="button"
        className="w-half btn btn-primary btn-rounded"
        name="radioGroup"
        id={id}
        onClick={(e) => handleClick(e.target.id)}
        aria-label={text}
      >
        {text}
      </button>
    );
  }
  return null;
}

AnswerOption.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};
