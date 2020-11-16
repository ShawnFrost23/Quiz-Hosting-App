/* eslint-disable */

import React from 'react';
import { deleteMethodOptions, postMethodOptions } from '../options';
import { getListofGames } from '../pages/Dashboard';
import { useHistory, useParams } from 'react-router-dom';
import QuizDetailComponent from './QuizDetailComponent';


const BASE_URL = 'http://localhost:5005';

function QuizCard({id, quizName, thumbnail, setGameFunction, status}) {
  const [quizId, setQuizId] = React.useState(id);
  const [quizState, setQuizState] = React.useState(false);
  const history = useHistory();
  const altText = `Image for quiz Id: ${quizId}`

  const editQuizButtonHandler = () => {
    console.log('Edit Quiz Button Pressed');
    localStorage.setItem('quizID', id);
    history.push(`/editpage/:${id}`);
  }

  const deleteQuizButtonHandler = async () => {
    deleteMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}`, deleteMethodOptions)
    getListofGames(setGameFunction)
    window.location.reload(false)
  }

  const startQuizButtonHandler = async () => {
    console.log('Start Quiz Button Pressed');
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/start`, postMethodOptions);
    if (response.status === 200) {
      setQuizState(true)
      console.log(response)
    }
  }

  const stopQuizButtonHandler = async () => {
    console.log('Stop Quiz Button Pressed')
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/end`, postMethodOptions);
    if (response.status === 200) {
      console.log(response);
      setQuizState(false)
    }
  }

  const advanceQuizButtonHandler = () => {
    console.log('Advance Quiz Button Pressed')
  }
  if (quizState || status) {
    return (
      <div className="quizCardActive">
        <p>{quizName}</p>
        <img src={thumbnail} alt={altText} />
        <QuizDetailComponent 
          quizId={quizId}
        />
        <button className="advanceQuizButton" onClick={advanceQuizButtonHandler}>Next Question</button>
        <button className="stopQuizButton" onClick={stopQuizButtonHandler}>Stop Quiz</button>
    </div>
    );
  }
  return (
    <div className="quizCard">
      <p>{quizName}</p>
      <img src={thumbnail} alt={altText} />
      {/* <QuestionsDetailComponent /> */}
      <QuizDetailComponent 
        quizId={quizId}
      />
      <button className="editQuizButton" onClick={editQuizButtonHandler}>Edit</button>
      <button className="deleteQuizButton" onClick={deleteQuizButtonHandler}>Delete</button>
      <button className="startQuizButton" onClick={startQuizButtonHandler}>Start Quiz</button>
    </div>
  );
};

export default QuizCard;