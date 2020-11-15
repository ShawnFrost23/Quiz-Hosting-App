import React from 'react';
// import PropTypes from 'prop-types';
// import AnswerCard from './AnswersCard';
import { useParams } from 'react-router-dom';

export default function EditForm() {
  // const { id, title, thumbnail } = props;

  const ber = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5005';
  const [getData, setGetData] = React.useState([]);
  const [getOrg, setOrgData] = React.useState([]);
  const [getAns, setAnsData] = React.useState([]);
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
  }, [ber, id1, id2, getOrg]);

  // const collectAnswer = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   console.log(e.target.id);
  //   getOrg[e.target.id].text = e.target.value;
  //   console.log(getOrg);
  // };

  const submit = async (e) => {
    e.preventDefault();
    console.log('submit works');
    // const count = localStorage.getItem('length');
    // let id = parseInt(count, 10);
    // id -= 1;
    // const newBody = {
    //   id,
    //   title,
    //   time,
    //   type,
    //   points,
    //   getOrg,
    // };
    // const b = JSON.stringify(newBody);
    // console.log(b);
    // console.log(ques[id2]);
    console.log(type, getOrg);
    ques.questions[id2].id = id2;
    ques.questions[id2].title = title;
    ques.questions[id2].time = time;
    ques.questions[id2].score = points;
    ques.questions[id2].answers = getAns;
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
          <label htmlFor="password">
            Type
            <select name="type" id="type" defaultValue={getData.type} onChange={(e) => setType(e.target.value)}>
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
                    key={q.id}
                    id={q.id}
                    defaultValue={q.text}
                    onChange={(e) => setAnsData(e.target.value)}
                  />
                </label>
                <label htmlFor="correct">
                  Correct
                  <input
                    type="text"
                    id="password"
                    key={q.id}
                    defaultValue={q.correct}
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
