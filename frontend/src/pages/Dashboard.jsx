/* eslint-disable */
import React from 'react';
import NavBar from '../components/NavBar';
import CreateNewGameBar from '../components/CreateNewGameBar';
import { getMethodOptions } from '../options';

const BASE_URL = 'http://localhost:5005';

function Dashboard() {
  const [games, setGames] = React.useState([]);
  const getListofGames = async () => {
    getMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/quiz`, getMethodOptions);
    const response2 = await response.json();
    console.log(response2.quizzes);
    setGames(response2.quizzes);
    console.log(games);
  };
  React.useEffect(() => {
    getListofGames();
  }, [])
  return (
    <>
      <NavBar />
      <CreateNewGameBar />
      <div>
        Create Games Appear here
      </div>
    </>
  );
}

export default Dashboard;
