/* eslint-disable */

import React from 'react';
import NavBar from '../components/NavBar';
import CreateNewGameBar from '../components/CreateNewGameBar';
import { getMethodOptions } from '../options';
import QuizCard from '../components/QuizCard';

const BASE_URL = 'http://localhost:5005';

function Dashboard() {
  const [games, setGames] = React.useState([]);
  const token = localStorage.getItem('token');
  React.useEffect(() => {
    async function getListofGames() {
      getMethodOptions.headers.Authorization = token
      const response = await fetch(`${BASE_URL}/admin/quiz`, getMethodOptions);
      const response2 = await response.json();
      const newGames = [];
      newGames.push(response2.quizzes);
      console.log(newGames);
      setGames(newGames);
    };
    if (token) {
      getListofGames();
      console.log(games);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <>
      <NavBar />
      <CreateNewGameBar />
      <div>
        Create Games Appear here
      </div>
      {games.map(({id, name, thumbnail}) => (
        <QuizCard 
          quizId={id}
          quizName={name}
          thumbnail={thumbnail}
        />
      ))}
    </>
  );
}

export default Dashboard;
