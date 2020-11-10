import React from 'react';

export default () => {
  const handleNewGameButton = () => {
    console.log('New game Button Clicked');
  };
  return (
    <div className="createNewGameBar">
      <button type="button" onClick={handleNewGameButton}>Create New Game</button>
    </div>
  );
};
