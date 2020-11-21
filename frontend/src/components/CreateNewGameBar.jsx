import React from 'react';
import { postMethodOptions } from '../options';
// eslint-disable-next-line
import { getListofGames } from '../pages/Dashboard';

const BASE_URL = 'http://localhost:5005';

const token = localStorage.getItem('token');
// eslint-disable-next-line
function CreateNewGameBar({ setGameFunction }) {
  const [newGameName, setNewGameName] = React.useState('');

  const handleNewGameButton = async () => {
    if (newGameName.length > 0) {
      postMethodOptions.headers.Authorization = token;
      const newBody = {
        name: newGameName,
      };
      postMethodOptions.body = JSON.stringify(newBody);
      const response = await fetch(`${BASE_URL}/admin/quiz/new`, postMethodOptions);
      if (response.status === 200) {
        getListofGames(setGameFunction);
        setNewGameName('');
        window.location.reload(false);
      }
    } else {
      document.getElementById('name').className = 'form-control is-invalid bg-transparent';
      document.getElementById('name').placeholder = 'Enter a valid name';
    }
    return false;
  };

  return (
    <div className="h-50 d-flex justify-content-center align-items-center flex-row bg-light">
      <form id="newGameForm" className="w-half">
        <input
          onChange={(e) => setNewGameName(e.target.value)}
          type="text"
          id="name"
          placeholder="Enter New Game Name"
          className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
        />
      </form>
      <button className="btn btn-primary btn-rounded" type="submit" onClick={handleNewGameButton}>Create New Game</button>
    </div>
  );
}

export default CreateNewGameBar;
