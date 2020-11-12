/* eslint-disable */

import React from 'react';
import { deleteMethodOptions } from '../options';
import { getListofGames } from '../pages/Dashboard';

const BASE_URL = 'http://localhost:5005';

function QuizCard({id, quizName, thumbnail, setGameFunction}) {
  const [quizId, setQuizId] = React.useState(id);
  const [quizState, setQuizState] = React.useState(false);
  if (quizState) {
    return (
      <p>To be implemented</p>
      // Add render when quiz is active.
    );
  }
  const altText = `Image for quiz Id: ${quizId}`

  const editQuizButtonHandler = () => {
    console.log('Edit Quiz Button Pressed');
  }

  const deleteQuizButtonHandler = async () => {
    deleteMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}`, deleteMethodOptions)
    getListofGames(setGameFunction)
  }

  const startQuizButtonHandler = () => {
    console.log('Start Quiz Button Pressed');
  }
  return (
    <div className="quizCard">
      <p>{quizName}</p>
      <img src={thumbnail} alt={altText} />
      {/* <QuestionsDetailComponent /> */}
      <button className="editQuizButton" onClick={editQuizButtonHandler}>Edit</button>
      <button className="deleteQuizButton" onClick={deleteQuizButtonHandler}>Delete</button>
      <button className="startQuizButton" onClick={startQuizButtonHandler}>Start Quiz</button>
    </div>
  );
};

export default QuizCard;