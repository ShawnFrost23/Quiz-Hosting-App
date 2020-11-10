import React from 'react';
import NavBar from '../components/NavBar';
import CreateNewGameBar from '../components/CreateNewGameBar';
// const BASE_URL = 'http://localhost:5005';
function Dashboard() {
  return (
    <>
      <NavBar />
      <CreateNewGameBar />
      Youre logged in!
    </>
  );
}

export default Dashboard;
