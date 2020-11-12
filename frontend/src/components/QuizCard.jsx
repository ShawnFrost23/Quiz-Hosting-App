/* eslint-disable */

import React from 'react';

function QuizCard({id, quizName, thumbnail}) {
  const [quizId, setQuizId] = React.useState(id);
  const [quizState, setQuizState] = React.useState(false);
  if (quizState) {
    return (
      <p>To be implemented</p>
      // Add render when quiz is active.
    );
  }
  const altText = `Image for quiz Id: ${quizId}`

  const editQuizButtonHandler = () => {
    console.log('Edit Quiz Button Pressed');
  }

  const deleteQuizButtonHandler = () => {
    console.log('Delete Quiz Button Pressed');
  }

  const startQuizButtonHandler = () => {
    console.log('Start Quiz Button Pressed');
  }
  return (
    <div className="quizCard">
      <p>{quizName}</p>
      <img src={thumbnail} alt={altText} />
      {/* <QuestionsDetailComponent /> */}
      <button className="editQuizButton" onClick={editQuizButtonHandler}>Edit</button>
      <button className="deleteQuizButton" onClick={deleteQuizButtonHandler}>Delete</button>
      <button className="startQuizButton" onClick={startQuizButtonHandler}>Start Quiz</button>
    </div>
  );
};

export default QuizCard;