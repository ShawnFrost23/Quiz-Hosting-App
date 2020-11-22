/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import React from 'react';
import ReactdownClock from 'react-countdown-clock';
import { useParams } from 'react-router-dom';
import AnswerOption from '../components/AnswerOption';
import 'halfmoon/css/halfmoon-variables.min.css';
// import { PropTypes } from 'prop-types';

export default () => {
  let { id1 } = useParams();
  id1 = id1.substring(1);
  localStorage.setItem('player', id1);
  const BASE_URL = 'http://localhost:5005';
  const [questions, setQuestions] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);
  const [prevq, setPrevQ] = React.useState([]);
  // const [oldAns, setoldAns] = React.useState([]);
  // const [rightAns, setRightAns] = React.useState('');
  const [ansRight, setAnsRight] = React.useState([]);
  // const [nextAns, setNextAns] = React.useState(true);
  const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  React.useEffect(() => {
    async function getStatus() {
      const response = await fetch(`${BASE_URL}/play/${id1}/status`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
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
      const response = await fetch(`${BASE_URL}/play/${id1}/question`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (response.status === 200) {
        const response2 = await response.json();
        setQuestions(response2.question);
        setAnswers(response2.question.answers);
        setPrevQ(response2.question);
        console.log(prevq);
      }
    }
    if (status) {
      getQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function getAnswer() {
    const response = await fetch(`${BASE_URL}/play/${id1}/answer`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    });
    if (response.status === 200) {
      const response2 = await response.json();
      setAnsRight(response2.answerIds);
    }
  }

  async function myCallback() {
    getAnswer();
    // halfmoon.toggleModal('modal-1');
    let seaching = true;
    while (seaching) {
      await sleep(5000);

      const response = await fetch(`${BASE_URL}/play/${id1}/question`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (response.status === 200) {
        const response2 = await response.json();
        if (prevq.title !== response2.question.title) {
          setQuestions(response2.question);
          setAnswers(response2.question.answers);
          setPrevQ(response2.question);
          seaching = false;
          // halfmoon.toggleModal('modal-1');
        }
      }
    }
    console.log(ansRight);
  }

  return (
    <div>
      {/* <div className="modal" id="modal-1" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <span aria-hidden="true">&times;</span>
            <h5 className="modal-title">Modal title</h5>
            <p>
              This is a test.
              {' '}
              {ansRight}
            </p>
            <div className="text-right mt-20" />
          </div>
        </div>
      </div> */}
      <div className="page-wrapper">
        <div className="content-wrapper">
          <ReactdownClock
            defaultValue={5}
            seconds={questions.time}
            color="#000"
            alpha={0.9}
            size={50}
            onComplete={myCallback}
          />
          <br />
          <div>
            {questions.title}
          </div>
          <br />
          <img src={questions.thumbnail} alt="Pic for question" />
          <br />
          <div>
            Points Value:
            {questions.score}
          </div>
          <div>
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
        </div>
      </div>
    </div>
  );
};
