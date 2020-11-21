import React from 'react';
import { useHistory } from 'react-router-dom';
import { postMethodOptions } from '../options';
import '../styles/Login.css';

require('halfmoon/css/halfmoon-variables.min.css');

const BASE_URL = 'http://localhost:5005';

export default () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  const loginButtonHandler = async (e) => {
    e.preventDefault();
    const newBody = {
      email,
      password,
    };
    postMethodOptions.body = JSON.stringify(newBody);
    const response = await fetch(`${BASE_URL}/admin/auth/login`, postMethodOptions);
    const response2 = await response.json();
    if (response.status === 200) {
      const token = `Bearer ${response2.token}`;
      localStorage.setItem('token', token);
      console.log(localStorage.getItem('token'));
      history.push('/dashboard');
      window.location.reload(false);
    } else {
      document.getElementById('email').className = 'form-control is-invalid bg-transparent';
      document.getElementById('password').className = 'form-control is-invalid bg-transparent';
      document.getElementById('errorMessage').className = 'position-absolute z-20 w-400 h-200 font-size-24 alert visible alert alert-danger filled';
    }
    return false;
  };

  const newRegisterButtonHandler = () => {
    history.push('/registration');
  };

  const dismissAlertHandler = () => {
    document.getElementById('errorMessage').className = 'position-absolute z-20 alert invisible';
  };

  return (
    <div className="position-relative w-full h-full d-flex justify-content-center align-items-center bg-dark">
      <div id="errorMessage" className="position-absolute z-20 alert invisible" role="alert">
        <button className="close" data-dismiss="alert" type="button" aria-label="Close">
          <span onClick={dismissAlertHandler} aria-hidden="true">&times;</span>
        </button>
        Invalid Details
        <br />
        Try Again!
      </div>
      <div className="position-absolute z-0 w-350 h-400 d-flex justify-content-center align-items-center border flex-column rounded shadow-lg bg-light">
        <form onSubmit={loginButtonHandler} className="w-300 mw-full">
          <label htmlFor="email" className="w-full h-100">
            Email
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              value={email}
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
              placeholder="Enter Email"
            />
          </label>
          <br />
          <label htmlFor="password" className="w-full h-100">
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              value={password}
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
              placeholder="Enter Password"
            />
          </label>
          <div className="w-full d-flex justify-content-center">
            <input className="w-half btn btn-secondary btn-rounded" type="submit" value="Login" />
          </div>
          <br />
        </form>
        <div className="w-full d-flex justify-content-center">
          <button className="w-auto btn btn-secondary btn-rounded" type="button" onClick={newRegisterButtonHandler}>New? Register Now!</button>
        </div>
      </div>
    </div>
  );
};
