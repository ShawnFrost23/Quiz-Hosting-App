import React from 'react';

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
    time: 50,
    score: 5,
  };
  // setOrgData(item);

  return (
    <>
      <div>
        {item.title}
      </div>
      <img src={item.thumbnail} alt="this is a pic" />
      <div>
        Points Value:
        {item.score}
        Testing Code
      </div>
    </>
  );
};
