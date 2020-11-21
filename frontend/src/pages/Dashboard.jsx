import React from 'react';
import NavBar from '../components/NavBar';
// eslint-disable-next-line
import CreateNewGameBar from '../components/CreateNewGameBar';
// eslint-disable-next-line
import { getMethodOptions } from '../options';
// eslint-disable-next-line
import QuizCard from '../components/QuizCard';

const BASE_URL = 'http://localhost:5005';

require('halfmoon/css/halfmoon-variables.min.css');

const token = localStorage.getItem('token');
export const getListofGames = async (setGames) => {
  getMethodOptions.headers.Authorization = token;
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
      <div className="w-full h-auto d-flex flex-wrap bg-dark">
        {games.length > 0 && games.map(({
          id, name, thumbnail, active,
        }) => (
          <QuizCard
            id={id}
            quizName={name}
            thumbnail={thumbnail}
            setGameFunction={setGames}
            status={active}
            getListofGames={getListofGames}
          />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
