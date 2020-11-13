import React from 'react';
// import PropTypes from 'prop-types';

export default function EditForm() {
  // const { id, title, thumbnail } = props;

  const ber = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5005';
  // const [getData, setGetData] = React.useState([]);
  const [title, setQ] = React.useState('');
  const [time, setTime] = React.useState('');
  const [type, setType] = React.useState('');
  const [points, setPoints] = React.useState('');
  const [thumbnail, setThum] = React.useState('');

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
        // const response2 = await response.json();
        // setGetData(response2.questions[0]);
        console.log('wow');
      }
    }
    if (ber) {
      getQuiz();
    }
  }, [ber]);

  const submit = async (e) => {
    e.preventDefault();
    console.log('submit works');
    let id = localStorage.getItem('length');
    id += 1;
    const newBody = {
      id,
      title,
      time,
      points,
    };
    console.log(newBody);
  };
  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="email">
          Question:
          <input
            type="text"
            id="email"
            value={title}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="password">
          Type
          <select name="type" id="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="MCQ">Multiple Choice</option>
            <option value="single">Single Choice</option>
          </select>
        </label>
        <br />
        <label htmlFor="time" value={time} onChange={(e) => setTime(e.target.value)}>
          Time (in Seconds)
          <input
            type="text"
            id="time"
          />
        </label>
        <br />
        <label htmlFor="points" value={points} onChange={(e) => setPoints(e.target.value)}>
          Points
          <input
            type="text"
            id="points"
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
        <br />
        <input type="submit" value="Done" />
        <br />
      </form>
    </>
  );
}
