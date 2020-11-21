import React from 'react';
import { useHistory } from 'react-router-dom';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { deleteMethodOptions, postMethodOptions, getMethodOptions } from '../options';
// import { getListofGames } from '../pages/Dashboard';
// import { useHistory, useParams } from 'react-router-dom';
import QuizDetailComponent from './QuizDetailComponent';

const BASE_URL = 'http://localhost:5005';

function QuizCard({
  id, quizName, thumbnail, setGameFunction, status, getListofGames,
}) {
  const [quizId, setQuizId] = React.useState(id);
  const [quizState, setQuizState] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [sess, setSess] = React.useState('');
  // eslint-disable-next-line no-new
  new ClipboardJS('.btn');
  // const [sessionId, setSessionId] = React.useState('');
  const history = useHistory();
  const altText = `Image for quiz Id: ${quizId}`;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleStartQuiz = async () => {
    await handleClose();
    await setQuizState(true);
  };

  // function saveToClip() {
  //   const url = 'wwwnwnoi';
  //   url.select();
  //   document.execCommand('copy');
  // }

  const startQuizButtonHandler = async () => {
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/start`, postMethodOptions);
    if (response.status === 200) {
      getMethodOptions.headers.Authorization = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/admin/quiz/${quizId}`, getMethodOptions);
      if (res.status === 200) {
        const res2 = await res.json();
        console.log(res2);
        setSess(res2.active);
        await handleShow();
      }
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
    console.log('Advance Quiz Button Pressed');
    setQuizId(id);
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/advance`, postMethodOptions);
    if (response.status !== 200) {
      setQuizState(false);
    }
  };
  if (quizState || status) {
    return (
      <div className="quizCardActive">
        <p>{quizName}</p>
        <img src={thumbnail} alt={altText} />
        <QuizDetailComponent
          quizId={quizId}
        />
        <button type="button" className="advanceQuizButton" onClick={advanceQuizButtonHandler}>Next Question</button>
        <button type="button" className="stopQuizButton" onClick={stopQuizButtonHandler}>Stop Quiz</button>
      </div>
    );
  }

  return (
    <>
      <div className="quizCard">
        <p>{quizName}</p>
        <img src={thumbnail} alt={altText} />
        <QuizDetailComponent
          quizId={quizId}
        />
        <button type="button" className="editQuizButton" onClick={editQuizButtonHandler}>Edit</button>
        <button type="button" className="deleteQuizButton" onClick={deleteQuizButtonHandler}>Delete</button>
        <button type="button" className="startQuizButton" onClick={startQuizButtonHandler}>Start Quiz</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              Session ID:
              {' '}
              {sess}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{`ID: ${sess}`}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleStartQuiz}>
              Close
            </Button>
            <Button className="bnt" variant="primary" data-clipboard-text="localhost:3000/player" data-clipboard-action="copy">
              Save to ClipBoard
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default QuizCard;

QuizCard.propTypes = {
  id: PropTypes.number.isRequired,
  quizName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  setGameFunction: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  getListofGames: PropTypes.func.isRequired,
};
