import React from 'react';
// import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import AnswerCard from './AnswersCard';

const answersArray = [];
const correctArray = [];
// let arrayOfAnswer = [];

export default function EditForm() {
  // const { id, title, thumbnail } = props;
  const history = useHistory();
  const ber = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5005';
  const [getData, setGetData] = React.useState([]);
  const [getOrg, setOrgData] = React.useState([]);
  const [title, setQ] = React.useState('');
  const [time, setTime] = React.useState('');
  const [type, setType] = React.useState('');
  const [points, setPoints] = React.useState('');
  const [thumbnail, setThum] = React.useState('');
  const [ques, setQues] = React.useState('');
  let { id1, id2 } = useParams();
  id1 = id1.substring(1);
  id2 = id2.substring(1);

  React.useEffect(() => {
    async function getQuiz() {
      const response = await fetch(`${BASE_URL}/admin/quiz/${id1}`, {
        headers: {
          accept: 'application/json',
          Authorization: ber,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (response.status === 200) {
        const response2 = await response.json();
        setQues(response2);
        setGetData(response2.questions[id2]);
        setOrgData(response2.questions[id2].answers);
      }
    }
    if (ber) {
      getQuiz();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function backToQ() {
    history.push(`/editpage/:${id1}`);
  }

  function collectAnswer(id, text, correct) {
    const newBody = {
      id,
      text,
      correct,
    };
    let isPresent = 0;
    answersArray.forEach((newAns, index) => {
      if (newAns.id === id) {
        answersArray[index].text = text;
        isPresent = 1;
      }
    });
    if (!isPresent) answersArray.push(newBody);
  }

  function collectCorrect(id, correct) {
    const newBody = {
      id,
      correct,
    };
    let isPresent = 0;
    correctArray.forEach((newCorrect, index) => {
      if (newCorrect.id === id) {
        correctArray[index].correct = correct;
        isPresent = 1;
        getOrg[id].correct = correct;
      }
    });
    if (!isPresent) correctArray.push(newBody);
  }

  async function putQuiz(newBody) {
    const response = await fetch(`${BASE_URL}/admin/quiz/${id1}`, {
      body: JSON.stringify(newBody),
      headers: {
        accept: 'application/json',
        Authorization: ber,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    });
    if (response.status === 200) {
      const response2 = await response.json();
      console.log(response2);
      console.log('PLEASE WORK');
    }
  }

  function checkValidity(t, c, a) {
    if ((t === 'Single') && (c > 1)) {
      alert('Please have one right answer for Single Choice, Try Again!');
      return false;
    }
    if ((t === 'MCQ') && (c <= 1)) {
      alert('Please have more than one answer for MCQ, Try Again!');
      return false;
    }
    if (a < 2) {
      alert('Please have more than two answers');
      return false;
    }
    return true;
  }

  const submit = async (e) => {
    e.preventDefault();

    let cCount = 0;
    let aCount = 0;
    const copyOfState = ques;

    if (title !== '') copyOfState.questions[id2].title = title;
    if (type !== '') copyOfState.questions[id2].type = type;
    if (time !== '') copyOfState.questions[id2].time = time;
    if (points !== '') copyOfState.questions[id2].score = points;
    if (type !== '') copyOfState.questions[id2].type = type;

    answersArray.forEach((newAns) => {
      copyOfState.questions[id2].answers.forEach((oldAns, index) => {
        if (oldAns.id === newAns.id) copyOfState.questions[id2].answers[index].text = newAns.text;
        if ((oldAns.id !== '') || (oldAns.id !== ' ')) aCount += 1;
      });
    });

    correctArray.forEach((newCorrect) => {
      copyOfState.questions[id2].answers.forEach((oldCorrect, index) => {
        if (oldCorrect.id === newCorrect.id) {
          copyOfState.questions[id2].answers[index].correct = newCorrect.correct;
          if ((copyOfState.questions[id2].answers[index].correct === 'true') && (copyOfState.questions[id2].answers[index].text !== '')) cCount += 1;
        }
      });
    });

    if (checkValidity(type, cCount, aCount)) {
      putQuiz(ques);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={submit}>
          <label htmlFor="email">
            Question:
            <input
              type="text"
              id="email"
              defaultValue={getData.title}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="type">
            Type
            <select name="type" value={type} id="type" onChange={(e) => setType(e.target.value)}>
              <option value="MCQ">Multiple Choice</option>
              <option value="Single">Single Choice</option>
            </select>
          </label>
          <br />
          <label htmlFor="time" onChange={(e) => setTime(e.target.value)}>
            Time (in Seconds)
            <input
              type="text"
              id="time"
              defaultValue={getData.time}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="points" value={points} onChange={(e) => setPoints(e.target.value)}>
            Points
            <input
              type="text"
              id="points"
              defaultValue={getData.score}
              onChange={(e) => setPoints(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="thum" value={thumbnail} onChange={(e) => setThum(e.target.files[0])}>
            Thumbnail
            <input
              type="url"
              id="thumbnail"
              defaultValue={getData.thumbnail}
            />
          </label>
          <div>
            {
            getOrg.map((q) => (
              <AnswerCard
                key={q.id}
                id={q.id}
                text={q.text}
                correct={q.correct}
                getAns={collectAnswer}
                getCorrect={collectCorrect}
              />
            ))
            }
          </div>
          <br />
          <input type="submit" value="Done" />
          <br />
          <button type="button" onClick={backToQ}>Back to Questions!</button>
        </form>
      </div>
    </>
  );
}
