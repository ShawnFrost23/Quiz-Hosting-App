import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { getMethodOptions } from '../options';
import NavBar from '../components/NavBar';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const ber = localStorage.getItem('token');
  const [getData, setGetData] = React.useState([]);

  let { id1 } = useParams();
  id1 = id1.substring(1);
  React.useEffect(() => {
    async function renderQuestion() {
      // const idy = localStorage.getItem('quizID');
      getMethodOptions.headers.Authorization = ber;
      getMethodOptions.headers.accept = 'application/json';
      const response = await fetch(`${BASE_URL}/admin/quiz/${id1}`, getMethodOptions);
      if (response.status === 200) {
        const response2 = await response.json();
        setGetData(response2.questions);
        const variable = response2.questions.length;
        localStorage.setItem('numOfQ', variable);
        localStorage.setItem('quizname', response2.name);
        localStorage.setItem('quizthumbnail', response2.thumbnail);
      }
    }
    if (ber) {
      renderQuestion();
    }
  }, [ber, id1]);

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

  function addQuestion() {
    const length = localStorage.getItem('numOfQ');
    const newQ = {
      id: length,
      title: 'New Question',
      thumbnail: null,
      time: 30,
      type: 'Single',
      answers: [
        {
          id: 0,
          text: 'A',
          correct: 'false',
        },
        {
          id: 1,
          text: 'B',
          correct: 'false',
        },
        {
          id: 2,
          text: '',
          correct: 'false',
        },
        {
          id: 3,
          text: '',
          correct: 'false',
        },
        {
          id: 4,
          text: '',
          correct: 'false',
        },
        {
          id: 5,
          text: '',
          correct: 'false',
        },
      ],
    };
    const quizName = localStorage.getItem('quizname');
    const thumbnail = localStorage.getItem('quizthumbnail');
    const questions = getData.concat(newQ);
    const newBody = {
      questions,
      name: quizName,
      thumbnail,
    };
    putQuiz(newBody);
    window.location.reload(false);
  }

  return (
    <>
      <NavBar />
      <div className="w-full h-50 d-flex justify-content-center align-items-center bg-light">
        <button className="w-quarter btn btn-primary btn-rounded" type="button" onClick={addQuestion}>Add Questions!</button>
      </div>
      <div className="w-full h-auto d-flex flex-wrap bg-dark">
        { getData.map((q) => (
          <QuestionCard
            key={q.id}
            id={q.id}
            title={q.title}
            thumbnail={q.thumbnail}
          />
        ))}
      </div>
      <br />
    </>
  );
};
