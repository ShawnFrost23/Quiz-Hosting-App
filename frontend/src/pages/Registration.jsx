import React from 'react';
import { useHistory } from 'react-router-dom';
import { postMethodOptions } from '../options';

require('halfmoon/css/halfmoon-variables.min.css');

const BASE_URL = 'http://localhost:5005';

export default () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const history = useHistory();

  const registerButtonHandler = async (e) => {
    e.preventDefault();
    if (email === '' || name === '' || password === '') {
      document.getElementById('email').className = 'form-control is-invalid bg-transparent';
      document.getElementById('password').className = 'form-control is-invalid bg-transparent';
      document.getElementById('name').className = 'form-control is-invalid bg-transparent';
      document.getElementById('errorMessage').className = 'position-absolute z-20 w-400 h-200 font-size-24 alert visible alert alert-danger filled';
    } else {
      postMethodOptions.headers.accept = 'application/json';
      const newBody = {
        email,
        password,
        name,
      };
      postMethodOptions.body = JSON.stringify(newBody);
      const response = await fetch(`${BASE_URL}/admin/auth/register`, postMethodOptions);
      if (response.status === 200) {
        history.push('/login');
      } else {
        document.getElementById('errorMessage').className = 'position-absolute z-20 w-400 h-200 font-size-24 alert visible alert alert-danger filled';
      }
    }
    return false;
  };

  const loginNowButtonHandler = () => {
    history.push('/login');
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
        Error Occured
        <br />
        Try Again
      </div>
      <div className="position-absolute z-0 w-350 h-400 d-flex justify-content-center align-items-center border flex-column rounded shadow-lg bg-light">
        <form onSubmit={registerButtonHandler} className="w-300 mw-full">
          <label htmlFor="email" className="w-full">
            Email
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
              value={email}
              placeholder="Enter Email"
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
              aria-label="Enter Email"
            />
          </label>
          <br />
          <label htmlFor="password" className="w-full">
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
              aria-label="Enter Password"
            />
          </label>
          <br />
          <label htmlFor="name" className="w-full">
            Name
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Enter Name"
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
              aria-label="Enter Name"
            />
          </label>
          <div className="w-full d-flex justify-content-center">
            <input className="w-half btn btn-secondary btn-rounded" type="submit" value="Register" aria-label="Register" />
          </div>
          <br />
        </form>
        <div className="w-full d-flex justify-content-center">
          <button className="w-auto btn btn-secondary btn-rounded" type="button" onClick={loginNowButtonHandler} aria-label="Login">Login Now!</button>
        </div>
      </div>
    </div>
  );
};
