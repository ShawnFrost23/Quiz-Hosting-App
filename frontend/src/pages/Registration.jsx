import React from 'react';
// import { useAlert } from 'react-alert';
// import './App.css';
import { useHistory } from 'react-router-dom';
import { postMethodOptions } from '../options';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
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
        Please enter all details
      </div>
      <div className="position-absolute z-0 w-350 h-400 d-flex justify-content-center align-items-center border flex-column rounded shadow-lg bg-light">
        <form onSubmit={submit} className="w-300 mw-full">
          <label htmlFor="email" className="w-full">
            Email
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              value={email}
              placeholder="Enter Email"
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
            />
          </label>
          <br />
          <label htmlFor="password" className="w-full">
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              value={password}
              placeholder="Enter Password"
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
            />
          </label>
          <br />
          <label htmlFor="name" className="w-full">
            Name
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              value={name}
              placeholder="Enter Name"
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
            />
          </label>
          <div className="w-full d-flex justify-content-center">
            <input className="w-half btn btn-secondary btn-rounded" type="submit" value="Register" />
          </div>
          <br />
        </form>
        <div className="w-full d-flex justify-content-center">
          <button className="w-auto btn btn-secondary btn-rounded" type="button" onClick={loginNowButtonHandler}>Login Now!</button>
        </div>
      </div>
    </div>
  );
};
