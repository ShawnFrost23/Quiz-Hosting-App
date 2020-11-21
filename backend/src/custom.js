/*
 For a given data structure of a question, produce another
 object that doesn't contain any important meta data (e.g. the answer)
 to return to a "player"
*/
export const quizQuestionPublicReturn = question => {
  console.log('See question: ', question);
  const retQues = { title: question.title, thumbnail: question.thumbnail, score: question.score, time: question.time, answers: question.answers, };
  return retQues;
};

/*
 For a given data structure of a question, get the IDs of
 the correct answers (minimum 1).
*/
export const quizQuestionGetCorrectAnswers = question => {
  // For a single answer
  const ans = [];
  console.log(question.answers.length);
  console.log(question.answers[0]);
  for (let i = 0; i < question.answers.length; i++) {
    if (question.answers[i].correct === 'true') {
      ans.push(question.answers[i].id);
    }
  }
  console.log(ans);
  return ans;
};

/*
 For a given data structure of a question, get the IDs of
 all of the answers, correct or incorrect.
*/
export const quizQuestionGetAnswers = question => {
  return question.answers;
};

/*
 For a given data structure of a question, get the duration
 of the question once it starts. (Seconds)
*/
export const quizQuestionGetDuration = question => {
  return question.time;
};
