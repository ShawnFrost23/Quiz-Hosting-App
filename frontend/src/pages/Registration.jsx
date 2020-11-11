import React from 'react';
// import { useAlert } from 'react-alert';
// import './App.css';
import { useHistory } from 'react-router-dom';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');

  // const alert = useAlert();
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/admin/auth/register`, {
      body: JSON.stringify({
        email,
        password,
        name,
      }),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
    if (response.status === 200) {
      history.push('/login');
    }
    return false;
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="email">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            id="email"
            value={email}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            value={password}
          />
        </label>
        <br />
        <label htmlFor="name">
          Name
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            value={name}
          />
        </label>
        <input type="submit" value="Register!" />
        <br />
      </form>
    </div>
  );
};
