/* eslint-disable */

import React from 'react';
import NavBar from '../components/NavBar';
import CreateNewGameBar from '../components/CreateNewGameBar';
import { getMethodOptions } from '../options';
import QuizCard from '../components/QuizCard';

const BASE_URL = 'http://localhost:5005';
const token = localStorage.getItem('token');
export const getListofGames = async (setGames) => {
  getMethodOptions.headers.Authorization = token
  const response = await fetch(`${BASE_URL}/admin/quiz`, getMethodOptions);
  if (response.status === 200) {
    const response2 = await response.json();
    setGames(response2.quizzes);
  } else {
    console.log('Bad response from server');
  }
};

function Dashboard() {
  const [games, setGames] = React.useState([]);
  
  React.useEffect(() => {
    getListofGames(setGames);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavBar />
      <CreateNewGameBar 
        setGameFunction={setGames}
      />
      <div>
        Create Games Appear here
      </div>
      {games.length > 0 && games.map(({id, name, thumbnail}) => (
        <QuizCard
          id={id}
          quizName={name}
          thumbnail={thumbnail}
          setGameFunction={setGames}
        />
      ))}
    </>
  );
}

export default Dashboard;
