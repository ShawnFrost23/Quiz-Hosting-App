import React from 'react';
import ReactCountdownClock from 'react-countdown-clock';
import AnswerOption from '../components/AnswerOption';

export default () => {
  // const { id, title, thumbnail } = props;

  // const playerID = localStorage.getItem('playerID');
  // const BASE_URL = 'http://localhost:5005';
  // const [getOrg, setOrgData] = React.useState([]);

  // React.useEffect(() => {
  //   async function getQuestion() {
  //     const response = await fetch(`${BASE_URL}/play/${playerID}/question`, {
  //       headers: {
  //         accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       },
  //       method: 'GET',
  //     });
  //     if (response.status === 200) {
  //       const response2 = await response.json();
  //       setOrgData(response2.question);
  //     }
  //   }
  //   if (playerID) {
  //     getQuestion();
  //   }
  // }, [playerID, getOrg]);
  const item = {
    id: 0,
    title: 'What is Newtons first name?',
    thumbnail: null,
    time: 10,
    score: 5,
  };
  // setOrgData(item);
  // const convertTime = item.time * 100;
  function myCallback() {
    console.log('time done');
    return (
      <>
        <div>Answer feedback</div>
      </>
    );
  }
  const one = {
    id: 0,
    text: 'Alfred',
  };
  const two = {
    id: 1,
    text: 'Bert',
  };
  const three = {
    id: 2,
    text: 'Issac',
  };
  const four = {
    id: 3,
    text: 'Antonio',
  };
  const ansItem = [
    one,
    two,
    three,
    four,
  ];
  // setOrgData(ansItem);
  console.log(ansItem);
  return (
    <>
      <ReactCountdownClock
        seconds={item.time}
        color="#000"
        alpha={0.9}
        size={50}
        onComplete={myCallback}
      />
      <br />
      <div>
        {item.title}
      </div>
      <br />
      <img src={item.thumbnail} alt="this is a pic" />
      <br />
      <div>
        Points Value:
        {item.score}
      </div>
      <div>
        {/* {
        getOrg.map((q) => (
          <AnswerOption
            key={q.id}
            id={q.id}
            text={q.text}
          />
        ))
        } */}
        <AnswerOption
          key={one.id}
          id={one.id}
          text={one.text}
        />
      </div>
    </>
  );
};
