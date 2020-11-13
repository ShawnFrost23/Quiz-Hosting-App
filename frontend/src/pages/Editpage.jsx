import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { postMethodOptions } from '../options';
import { useHistory } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const ber = localStorage.getItem('token');
  const [getData, setGetData] = React.useState([]);
  // const [getOrg, setOrgData] = React.useState([]);
  console.log(ber);
  // setGetData([]);

  const history = useHistory();

  React.useEffect(() => {
    async function renderQuestion() {
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
        console.log(response2);
        // console.log(response2);
        setGetData(response2.questions);
        // setOrgData(response2);
        const variable = response2.questions;
        console.log(variable);
        localStorage.setItem('quiz', 890035905);
        localStorage.setItem('quizname', response2.name);
        localStorage.setItem('quizthumbnail', response2.thumbnail);
      }
    }
    if (ber) {
      renderQuestion();
    }
  }, [ber]);

  function addQuestion() {
    history.push('/editquestion');
  }

  return (
    <>
      <div>
        Your Quiz:
        {
          getData.map((q) => (
            <QuestionCard
              key={q.id}
              id={q.id}
              title={q.title}
              thumbnail={q.thumbnail}
            />
          ))
        }
      </div>
      <br />
      <button type="button" onClick={addQuestion}>Add Questions!</button>
    </>
  );
};
