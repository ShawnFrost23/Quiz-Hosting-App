import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const ber = localStorage.getItem('token');
  const [getData, setGetData] = React.useState([]);
  // const [getOrg, setOrgData] = React.useState([]);

  console.log(ber);
  let { id1 } = useParams();
  id1 = id1.substring(1);
  console.log(id1);
  const history = useHistory();
  React.useEffect(() => {
    async function renderQuestion() {
      // const idy = localStorage.getItem('quizID');
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
        console.log(response2);
        // console.log(response2);
        setGetData(response2.questions);
        const variable = response2.questions;
        console.log(variable);
        localStorage.setItem('quizname', response2.name);
        localStorage.setItem('quizthumbnail', response2.thumbnail);
      }
    }
    if (ber) {
      renderQuestion();
    }
  }, [ber, id1]);

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
