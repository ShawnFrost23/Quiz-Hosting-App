/* eslint-disable */

import React from 'react';

function QuizCard({id, quizName, thumbnail}) {
  const [quizId, setQuizId] = React.useEffect('');
  setQuizId(id)
  const [quizState, setQuizState] = React.useEffect(false);
  if (quizState) {
    return (
      <p>To be implemented</p>
      // Add render when quiz is active.
    );
  }
  const altText = `Image for quiz Id: ${quizId}`
  return (
    <div className="quizCard" styles={{margin: '1px solid red'}}>
      <p>{quizName}</p>
      <img src={thumbnail} alt={altText} />
      {/* <QuestionsDetailComponent /> */}
      <button className="editQuizButton">Edit</button>
      <button className="deleteQuizButton">Delete</button>
      <button className="startQuizButton">Start</button>
    </div>
  );
};

export default QuizCard;