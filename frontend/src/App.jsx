import React from 'react';
import './App.css';

const BASE_URL = 'http://localhost:5005';

function App() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/admin/auth/login`, {
      body: {
        email,
        password,
      },
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
    if (response.status === 200) {
      setLoggedIn(true);
    }
    console.log(response);
    return false;
  };

  if (loggedIn) {
    return (
      <div className="App">
        Youre logged in!
      </div>
    );
  }

  return (
    <div className="App">
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
        <input type="submit" value="login" />
        <br />
      </form>
    </div>
  );
}

export default App;
