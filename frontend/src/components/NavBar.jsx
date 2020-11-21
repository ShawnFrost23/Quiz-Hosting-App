import React from 'react';
import { useHistory } from 'react-router-dom';
import { postMethodOptions } from '../options';

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
  return (
    <>
      <div className="h-50 d-flex justify-content-center align-items-center bg-dark">
        <button className="w-half btn btn-secondary btn-rounded btn-lg" type="button" onClick={handleLogOut}>Log Out</button>
      </div>
    </>
  );
};
