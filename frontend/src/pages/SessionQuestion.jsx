/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import React from 'react';
import ReactdownClock from 'react-countdown-clock';
import { useParams } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
import AnswerOption from '../components/AnswerOption';
import { getMethodOptions } from '../options';

require('halfmoon/css/halfmoon-variables.min.css');

export default () => {
  let { id1 } = useParams();
  id1 = id1.substring(1);
  localStorage.setItem('player', id1);
  const BASE_URL = 'http://localhost:5005';
  const [questions, setQuestions] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);
  const [prevq, setPrevQ] = React.useState([]);
  const [ansRight, setAnsRight] = React.useState([]);
  const [nextAns, setNextAns] = React.useState(false);
  const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  React.useEffect(() => {
    async function getStatus() {
      getMethodOptions.headers.accept = 'application/json';
      const response = await fetch(`${BASE_URL}/play/${id1}/status`, getMethodOptions);
      if (response.status === 200) {
        setStatus(true);
      }
    }
    if (!status) {
      getStatus();
    }
  }, [id1, status]);

  React.useEffect(() => {
    async function getQuestion() {
      getMethodOptions.headers.accept = 'application/json';
      const response = await fetch(`${BASE_URL}/play/${id1}/question`, getMethodOptions);
      if (response.status === 200) {
        const response2 = await response.json();
        setQuestions(response2.question);
        setAnswers(response2.question.answers);
        setPrevQ(response2.question);
        setNextAns(true);
      }
    }
    if (status) {
      getQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function getAnswer() {
    getMethodOptions.headers.accept = 'application/json';
    const response = await fetch(`${BASE_URL}/play/${id1}/answer`, getMethodOptions);
    if (response.status === 200) {
      const response2 = await response.json();
      setAnsRight(response2.answerIds);
    }
  }

  async function myCallback() {
    if (nextAns) {
      getAnswer();
      console.log(ansRight);
    }
    let seaching = true;
    while (seaching) {
      await sleep(5000);
      getMethodOptions.headers.accept = 'application/json';
      const response = await fetch(`${BASE_URL}/play/${id1}/question`, getMethodOptions);
      if (response.status === 200) {
        const response2 = await response.json();
        if (prevq.title !== response2.question.title) {
          setQuestions(response2.question);
          setAnswers(response2.question.answers);
          setPrevQ(response2.question);
          setNextAns(true);
          seaching = false;
        }
      }
    }
  }

  if (!nextAns) {
    myCallback();
  }

  return (
    <>
      <div className="w-full h-full d-flex flex-column">
        <div className="h-100 d-flex justify-content-center align-items-center bg-light">
          <ReactdownClock
            seconds={questions.time}
            color="#000"
            alpha={0.9}
            size={50}
            onComplete={myCallback}
          />
        </div>
        <div className="d-flex justify-content-center h-full bg-dark-light py-10 px-10">
          <div className="d-flex flex-column h-500 w-500 bg-light px-5 py-5 border rounded">
            <h3>
              {questions.title}
            </h3>
            <img className="w-full h-half border rounded" src={questions.thumbnail} alt="Pic for question" />
            <div>
              Points Value:
              {questions.score}
            </div>
            <div className="h-full d-flex flex-column justify-content-around align-items-center">
              {
                answers.map((q) => (
                  <AnswerOption
                    key={q.id}
                    id={q.id}
                    text={q.text}
                  />
                ))
              }
            </div>
            {/* eslint-disable-next-line */}
            {/* <Modal show={show}>
              <Modal.Header closeButton>
                <Modal.Title>
                  Correct Answer
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>{ansRight}</Modal.Body>
              <Modal.Footer />
            </Modal> */}
          </div>
        </div>
      </div>
    </>
  );
};
