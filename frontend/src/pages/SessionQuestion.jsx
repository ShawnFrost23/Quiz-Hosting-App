/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import React from 'react';
import ReactdownClock from 'react-countdown-clock';
import { useParams } from 'react-router-dom';
import AnswerOption from '../components/AnswerOption';

export default () => {
  let { id1 } = useParams();
  id1 = id1.substring(1);
  localStorage.setItem('player', id1);
  const BASE_URL = 'http://localhost:5005';
  const [questions, setQuestions] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [answers, setAnswers] = React.useState([]);
  const [prevq, setPrevQ] = React.useState([]);
  // const [rightAns, setRightAns] = React.useState('');
  const [ansRight, setAnsRight] = React.useState([]);
  const [nextAns, setNextAns] = React.useState(true);

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
        console.log(response);
      }
    }
    if ((id1) && (!status)) {
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
      }
    }
    if (status) {
      getQuestion();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  React.useEffect(() => {
    console.log('here');
    async function getAnswer() {
      const response = await fetch(`${BASE_URL}/play/${id1}/answer`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (response.status === 200) {
        // const response2 = await response.json();
        setAnsRight(await response.json().answerIds);
        console.log(ansRight);
        // etRightAns(response2.answerIds); // fails
        // console.log(response2);
        // console.log(response2.answerIds);
        // console.log(rightAns);
      }
    }
    if (nextAns) {
      getAnswer();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextAns]);

  const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  async function myCallback() {
    setNextAns(true);
    // if (nextAns) {
    //   // do sometng
    // }
    // console.log(ansRight);
    let seaching = true;
    while (seaching) {
      await sleep(2000);

      const response = await fetch(`${BASE_URL}/play/${id1}/question`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });

      console.log(response.status);

      if (response.status === 200) {
        const response2 = await response.json();
        if (prevq.title !== response2.question.title) {
          setQuestions(response2.question);
          setAnswers(response2.question.answers);
          setPrevQ(response2.question);
          seaching = false;
        }
      }
    }
  }

  return (
    <>
      <ReactdownClock
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
    </>
  );
};
