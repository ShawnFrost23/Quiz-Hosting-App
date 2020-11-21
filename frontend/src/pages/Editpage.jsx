import React from 'react';
import { useParams } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { getMethodOptions, putMethodOptions } from '../options';
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
    putMethodOptions.headers.Authorization = ber;
    putMethodOptions.headers.accept = 'application/json';
    putMethodOptions.body = JSON.stringify(newBody);
    const response = await fetch(`${BASE_URL}/admin/quiz/${id1}`, putMethodOptions);
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

  const removePrefix = (string) => {
    if (string.includes('jpeg')) {
      return string.replace('data:image/jpeg;base64,', '');
    // eslint-disable-next-line
    } else if (string.includes('png')) {
      return string.replace('data:image/png;base64,', '');
    // eslint-disable-next-line
    } else if (string.includes('jpg')) {
      return string.replace('data:image/jpg;base64,', '');
    }
    return '';
  };

  const fileToDataUrl = (file) => {
    const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const valid = validFileTypes.find((type) => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
      throw Error('provided file is not a png, jpg or jpeg image.');
    }
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
  };

  const uploadFileButtonHandler = async () => {
    const postForm = document.forms.imageUpload;
    const file = postForm.elements.uploadFile.files[0];
    if (file) {
      const newPromise = await fileToDataUrl(file);
      const newUrl = await removePrefix(newPromise);
      getMethodOptions.headers.Authorization = ber;
      const response2 = await fetch(`${BASE_URL}/admin/quiz/${id1}`, getMethodOptions);
      const response3 = await response2.json();
      const newBody = {
        questions: response3.questions,
        name: response3.name,
        thumbnail: `data:image/png;base64,${newUrl}`,
      };
      putQuiz(newBody);
      setGetData(newBody.questions);
      window.location.reload(false);
    } else {
      alert('Upload a file');
    }
  };

  const uploadQuestionButtonHandler = async () => {
    console.log('Pressed');
    const postForm = document.forms.questionUpload;
    const file = postForm.elements.uploadJSON.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsText(file);
      reader.onload = async function () {
        const newBody = JSON.parse(reader.result);
        if (newBody.name && newBody.questions.length > 0) {
          putQuiz(newBody);
          window.location.reload(false);
        }
      };
      reader.onerror = function () {
        console.log(reader.error);
      };
    } else {
      alert('Upload a valid JSON File');
    }
  };

  return (
    <>
      <NavBar />
      <div className="w-full h-50 d-flex justify-content-center align-items-center bg-light">
        <button className="w-quarter btn btn-primary btn-rounded" type="button" onClick={addQuestion} aria-label="Add Question">Add Questions!</button>
      </div>
      <div className="w-full h-50 d-flex justify-content-center align-items-center bg-light">
        <form name="imageUpload">
          <input name="uploadFile" type="file" />
        </form>
        <button className="btn btn-primary btn-rounded" type="button" onClick={uploadFileButtonHandler} aria-label="Upload Image">Upload Image For Quiz</button>
      </div>
      <div className="w-full h-50 d-flex justify-content-center align-items-center bg-light">
        <form name="questionUpload">
          <input name="uploadJSON" type="file" />
        </form>
        <button className="btn btn-primary btn-rounded" type="button" onClick={uploadQuestionButtonHandler} aria-label="Upload Questions">Upload Questions For Quiz</button>
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
