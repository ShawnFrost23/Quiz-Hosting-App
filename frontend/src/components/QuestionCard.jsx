import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';

export default function QuestionCard(props) {
  const history = useHistory();
  const ber = localStorage.getItem('token');
  const BASE_URL = 'http://localhost:5005';
  const [getData, setGetData] = React.useState([]);

  let { id1 } = useParams();
  id1 = id1.substring(1);

  React.useEffect(() => {
    async function getQuiz() {
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
        setGetData(response2.questions);
        localStorage.setItem('length', response2.questions.length);
      }
    }
    if (ber) {
      getQuiz();
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

  const onClickRoutePage = async (e) => {
    console.log(e.target.id);
    localStorage.setItem('currentq', e.target.id);
    // console.log(id1);
    // id1 = id1.substring(1);
    const id2 = e.target.id;
    history.push(`/editquestion/:${id1}/:${id2}`);
  };
  const DeleteQuestion = async (e) => {
    console.log(e.target.id);
    getData.splice(e.target.id, 1);
    const name = localStorage.getItem('quizname');
    console.log(name);
    const thumbnail = localStorage.getItem('quizthumbnail');
    const questions = getData;
    const newBody = {
      questions,
      name,
      thumbnail,
    };
    console.log(newBody);
    putQuiz(newBody);
    window.location.reload(false);
  };

  const { id, title, thumbnail } = props;
  return (
    <>
      <div>{title}</div>
      <img src={thumbnail} alt="this is a pic" />
      <button id={id} type="button" onClick={onClickRoutePage}>Edit</button>
      <button id={id} type="button" onClick={DeleteQuestion}>Delete</button>
      <br />
    </>

  );
}

QuestionCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
