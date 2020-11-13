import React from 'react';
// import PropTypes from 'prop-types';
// import AnswerCard from './AnswersCard';

export default function EditForm() {
  // const { id, title, thumbnail } = props;

  const ber = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5005';
  const [getData, setGetData] = React.useState([]);
  const [getOrg, setOrgData] = React.useState([]);
  const [title, setQ] = React.useState('');
  const [time, setTime] = React.useState('');
  const [type, setType] = React.useState('');
  const [points, setPoints] = React.useState('');
  const [thumbnail, setThum] = React.useState('');
  const currentq = localStorage.getItem('currentq');

  React.useEffect(() => {
    async function getQuiz() {
      const response = await fetch(`${BASE_URL}/admin/quiz/890035905`, {
        headers: {
          accept: 'application/json',
          Authorization: ber,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      if (response.status === 200) {
        const response2 = await response.json();
        setGetData(response2.questions[currentq]);
        setOrgData(response2.questions[currentq].answers);
      }
    }
    if (ber) {
      getQuiz();
    }
  }, [ber, currentq]);

  const submit = async (e) => {
    e.preventDefault();
    console.log('submit works');
    const count = localStorage.getItem('length');
    let id = parseInt(count, 10);
    id -= 1;
    const newBody = {
      id,
      title,
      time,
      type,
      points,
    };
    console.log(newBody);
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
              value={getData.title}
              onChange={(e) => setQ(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="password">
            Type
            <select name="type" id="type" value={getData.type} onChange={(e) => setType(e.target.value)}>
              <option value="MCQ">Multiple Choice</option>
              <option value="single">Single Choice</option>
            </select>
          </label>
          <br />
          <label htmlFor="time" onChange={(e) => setTime(e.target.value)}>
            Time (in Seconds)
            <input
              type="text"
              id="time"
              // value={getData.time}
            />
          </label>
          <br />
          <label htmlFor="points" value={points} onChange={(e) => setPoints(e.target.value)}>
            Points
            <input
              type="text"
              id="points"
              value={getData.score}
            />
          </label>
          <br />
          <label htmlFor="thum" value={thumbnail} onChange={(e) => setThum(e.target.files[0])}>
            Thumbnail
            <input
              type="file"
              id="thumbnail"
            />
          </label>
          <div>
            {
            getOrg.map((q) => (
              // <AnswerCard
              //   key={q.id}
              //   text={q.text}
              //   correct={q.correct}
              // />
              <div>
                <label htmlFor="answer">
                  Answers
                  <input
                    type="text"
                    id="answer"
                    value={q.text}
                  />
                </label>
                <label htmlFor="correct">
                  Correct
                  <input
                    type="text"
                    id="password"
                    value={q.correct}
                  />
                </label>
              </div>
            ))
            }
          </div>
          <br />
          <input type="submit" value="Done" />
          <br />
        </form>
      </div>
    </>
  );
}
