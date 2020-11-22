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
        time += parseInt(question.time, 10);
      });
      setTotalTime(time);
    }
    getQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full h-50 d-flex justify-content-around align-items-center" aria-label="Total quiz questions">
      <p className="bg-dark text-white rounded px-5 py-5">
        Total Questions:
        {numQuestions}
      </p>
      <p className="bg-dark text-white rounded px-5 py-5" aria-label="Total quiz time">
        Total Time:
        {totalTime}
        s
      </p>
    </div>
  );
}

export default QuizDetailComponent;
