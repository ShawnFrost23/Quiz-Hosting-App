/* eslint-disable */
import React from 'react';
import { postMethodOptions } from '../options';
import { getListofGames } from '../pages/Dashboard';


const BASE_URL = 'http://localhost:5005';
const token = localStorage.getItem('token');
function CreateNewGameBar({setGameFunction}) {
  const [newGameName, setNewGameName] = React.useState('');
  
  const handleNewGameButton = async () => {
    if(newGameName.length > 0) {
      postMethodOptions.headers.Authorization = token;
      const newBody = {
        'name': newGameName,
      };
      postMethodOptions.body = JSON.stringify(newBody);
      const response = await fetch(`${BASE_URL}/admin/quiz/new`, postMethodOptions)
      
      getListofGames(setGameFunction);
      setNewGameName('');
      //document.getElementById('newGameForm').reset();
      window.location.reload(false)
    } else {
      alert('Enter a valid quiz name')
    }
  };

  return (
    <div className="createNewGameBar">
      <form id='newGameForm' onSubmit={handleNewGameButton}>
        <input
          onChange={(e) => setNewGameName(e.target.value)}
          type="text"
          placeholder="Enter New Game Name"
        />
        <button type="submit">Create New Game</button>
      </form>
    </div>
  );
};

export default CreateNewGameBar;
