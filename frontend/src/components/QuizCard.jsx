import React from 'react';
import { useHistory } from 'react-router-dom';
import { deleteMethodOptions, postMethodOptions } from '../options';
// eslint-disable-next-line
import { getListofGames } from '../pages/Dashboard';
import QuizDetailComponent from './QuizDetailComponent';

const BASE_URL = 'http://localhost:5005';

require('halfmoon/css/halfmoon-variables.min.css');

// eslint-disable-next-line
function QuizCard({id, quizName, thumbnail, setGameFunction, status}) {
  const [quizId] = React.useState(id);
  const [quizState, setQuizState] = React.useState(false);
  const history = useHistory();
  const altText = `Image for quiz Id: ${quizId}`;

  const editQuizButtonHandler = () => {
    localStorage.setItem('quizID', id);
    history.push(`/editpage/:${id}`);
  };

  const deleteQuizButtonHandler = async () => {
    deleteMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}`, deleteMethodOptions);
    if (response.status === 200) {
      getListofGames(setGameFunction);
      window.location.reload(false);
    }
  };

  const startQuizButtonHandler = async () => {
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/start`, postMethodOptions);
    if (response.status === 200) {
      setQuizState(true);
    }
  };

  const stopQuizButtonHandler = async () => {
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/end`, postMethodOptions);
    if (response.status === 200) {
      setQuizState(false);
    }
  };

  const advanceQuizButtonHandler = async () => {
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/advance`, postMethodOptions);
    if (response.status !== 200) {
      setQuizState(false);
    }
  };

  if (quizState || status) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column w-400 h-500 mx-20 my-20 px-5 py-5 border rounded bg-primary">
        <h3>{quizName}</h3>
        <img className="w-full h-half border rounded" src={thumbnail} alt={altText} />
        <QuizDetailComponent
          quizId={quizId}
        />
        <button className="w-half btn btn-success btn-rounded my-5" type="button" onClick={advanceQuizButtonHandler} aria-label="Advance Quiz">Next Question</button>
        <button className="w-half btn btn-danger btn-rounded my-5" type="button" onClick={stopQuizButtonHandler} aria-label="Stop Quiz">Stop Quiz</button>
      </div>
    );
  }
  return (
    <div className="d-flex justify-content-center align-items-center flex-column w-400 h-500 mx-20 my-20 px-5 py-5 border rounded bg-light">
      <h3>{quizName}</h3>
      <img className="w-full h-half border rounded" src={thumbnail} alt={altText} />
      <QuizDetailComponent
        quizId={quizId}
      />
      <button className="w-half btn btn-primary btn-rounded my-5" type="button" onClick={editQuizButtonHandler} aria-label="Edit Quiz">Edit</button>
      <button className="w-half btn btn-danger btn-rounded my-5" type="button" onClick={deleteQuizButtonHandler} aria-label="Delete Quiz">Delete</button>
      <button className="w-half btn btn-success btn-rounded my-5" type="button" onClick={startQuizButtonHandler} aria-label="Start Quiz">Start Quiz</button>
    </div>
  );
}

export default QuizCard;
