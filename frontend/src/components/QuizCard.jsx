// File Checked
import React from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { deleteMethodOptions, postMethodOptions, getMethodOptions } from '../options';
// eslint-disable-next-line
import QuizDetailComponent from './QuizDetailComponent';

const BASE_URL = 'http://localhost:5005';

require('halfmoon/css/halfmoon-variables.min.css');

function QuizCard({
  id, quizName, thumbnail, setGameFunction, status, getListofGames,
}) {
  const [quizId, setQuizId] = React.useState(id);
  const [quizState, setQuizState] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [sess, setSess] = React.useState('');
  // eslint-disable-next-line no-new
  new ClipboardJS('.btn');
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
    handleClose();
    setQuizState(true);
  };

  const startQuizButtonHandler = async () => {
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/start`, postMethodOptions);
    if (response.status === 200) {
      getMethodOptions.headers.Authorization = localStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/admin/quiz/${quizId}`, getMethodOptions);
      if (res.status === 200) {
        const res2 = await res.json();
        setSess(res2.active);
        handleShow();
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
    setQuizId(id);
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}/advance`, postMethodOptions);
    if (response.status !== 200) {
      setQuizState(false);
    }
  };

  if (quizState || status) {
    return (
      <div className="d-flex justify-content-around align-items-center flex-column w-400 h-500 mx-20 my-20 px-5 py-5 border rounded bg-primary">
        <h3>{quizName}</h3>
        <img className="w-full h-half border rounded" src={thumbnail} alt={altText} />
        <QuizDetailComponent
          quizId={quizId}
        />
        <button className="w-half btn btn-success btn-rounded my-5" type="button" onClick={advanceQuizButtonHandler} aria-label="Advance Quiz">Next Question</button>
        <button id="endQ" className="w-half btn btn-danger btn-rounded my-5" type="button" onClick={stopQuizButtonHandler} aria-label="Stop Quiz">Stop Quiz</button>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-around align-items-center flex-column w-400 h-500 mx-20 my-20 px-5 py-5 border rounded bg-light">
        <h3>{quizName}</h3>
        <img className="w-full h-half border rounded" src={thumbnail} alt={altText} />
        <QuizDetailComponent
          quizId={quizId}
        />
        <button className="w-half btn btn-primary btn-rounded my-5" type="button" onClick={editQuizButtonHandler} aria-label="Edit Quiz">Edit</button>
        <button className="w-half btn btn-danger btn-rounded my-5" type="button" onClick={deleteQuizButtonHandler} aria-label="Delete Quiz">Delete</button>
        <button id="startQ" className="w-half btn btn-success btn-rounded my-5" type="button" onClick={startQuizButtonHandler} aria-label="Start Quiz">Start Quiz</button>
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
  thumbnail: PropTypes.string,
  setGameFunction: PropTypes.func.isRequired,
  status: PropTypes.string,
  getListofGames: PropTypes.func.isRequired,
};

QuizCard.defaultProps = {
  thumbnail: '',
  status: null,
};
