/* eslint-disable */

import React from 'react';
import NavBar from '../components/NavBar';
import CreateNewGameBar from '../components/CreateNewGameBar';
import { getMethodOptions } from '../options';
import QuizCard from '../components/QuizCard';

const BASE_URL = 'http://localhost:5005';

// class Dashboard extends React.Component {
//   render() {
//     return (
//       <>
//         <NavBar />
//         <CreateNewGameBar />
//         <div>
//           Create Games Appear here
//        </div>
//         {games.length > 0 && games.map((quiz) => (
//          <QuizCard 
//            quizId={quiz.id}
//             quizName={quiz.name}
//             thumbnail={quiz.thumbnail}
//           />
//         ))}
//       </>
//     );
//   }
// }

function Dashboard() {
  const [games, setGames] = React.useState([]);
  const token = localStorage.getItem('token');
  const getListofGames = async () => {
    getMethodOptions.headers.Authorization = token
    const response = await fetch(`${BASE_URL}/admin/quiz`, getMethodOptions);
    if (response.status === 200) {
      const response2 = await response.json();
      setGames(response2.quizzes);
    }
  };
  React.useEffect(() => {
    getListofGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <NavBar />
      <CreateNewGameBar />
      <div>
        Create Games Appear here
      </div>
      {games.length > 0 && games.map(({id, name, thumbnail}) => (
        <QuizCard
          id={id}
          quizName={name}
          thumbnail={thumbnail}
        />
      ))}
    </>
  );
}

export default Dashboard;
