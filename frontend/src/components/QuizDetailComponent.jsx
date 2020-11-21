import React from 'react';
import { getMethodOptions } from '../options';

const BASE_URL = 'http://localhost:5005';

// eslint-disable-next-line
function QuizDetailComponent({ quizId }) {
  const [numQuestions, setNumQuestions] = React.useState(0);
  const [totalTime, setTotalTime] = React.useState(0);
  React.useEffect(() => {
    async function getQuiz() {
      getMethodOptions.headers.Authorization = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/admin/quiz/${quizId}`, getMethodOptions);
      const response2 = await response.json();
      setNumQuestions(response2.questions.length);
      let time = 0;
      response2.questions.forEach((question) => {
        time += question.time;
        console.log(`Quiz Time ${time}`);
        setTotalTime(totalTime + question.time);
      });
    }
    getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="quizDetails">
      Total Questions:
      {numQuestions}
      <br />
      Total Time:
      {totalTime}
    </div>
  );
}

export default QuizDetailComponent;
