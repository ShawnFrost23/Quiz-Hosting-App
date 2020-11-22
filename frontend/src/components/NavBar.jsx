import React from 'react';
import { useHistory } from 'react-router-dom';
import { postMethodOptions } from '../options';

require('halfmoon/css/halfmoon-variables.min.css');

const BASE_URL = 'http://localhost:5005';

export default () => {
  const history = useHistory();
  const handleLogOut = async () => {
    postMethodOptions.headers.Authorization = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/admin/auth/logout`, postMethodOptions);
    if (response.status === 200) {
      localStorage.removeItem('token');
      history.push('/login');
      window.location.reload(false);
    } else {
      alert('error occured please try again');
    }
  };

  const handleDashBoard = () => {
    history.push('/dashboard');
    window.location.reload(false);
  };
  return (
    <>
      <div className="h-50 d-flex justify-content-center align-items-center bg-dark">
        <button id="logOut" className="w-quarter btn btn-secondary btn-rounded btn-lg mx-5" type="button" onClick={handleLogOut}>Log Out</button>
        <button className="w-quarter btn btn-secondary btn-rounded btn-lg mx-5" type="button" onClick={handleDashBoard}>Dashboard</button>
      </div>
    </>
  );
};
