import React from 'react';
// import { useHistory } from 'react-router-dom';
// import { postMethodOptions } from '../options';
import QuestionCard from '../components/QuestionCard';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const ber = localStorage.getItem('token');
  const [getData, setGetData] = React.useState([]);
  // const [getOrg, setOrgData] = React.useState([]);
  console.log(ber);
  // setGetData([]);

  React.useEffect(() => {
    async function renderQuestion() {
      const response = await fetch(`${BASE_URL}/admin/quiz/128872413`, {
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
        console.log(response2.questions);
        setGetData(response2.questions);
        // setOrgData(response2);
      }
    }
    if (ber) {
      renderQuestion();
    }
  }, [ber]);

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
      <button type="button">Add Questions!</button>
    </>
  );
};
