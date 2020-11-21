import React from 'react';
import { useHistory } from 'react-router-dom';
import { postMethodOptions } from '../options';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const [session, setSession] = React.useState('');
  const [name, setName] = React.useState('');

  const history = useHistory();

  const submit = async (e) => {
    console.log(session);
    e.preventDefault();
    const newBody = {
      name,
    };
    postMethodOptions.body = JSON.stringify(newBody);
    const response = await fetch(`${BASE_URL}/play/join/${session}`, postMethodOptions);
    // const response2 = await response.json();
    if (response.status === 200) {
      // history.push('/dashboard');
      const response2 = await response.json();
      console.log('Worked success');
      console.log(response2.playerId);
      history.push(`/playsession/:${response2.playerId}`);
    } else {
      // Yet to implement error handling.
      alert('Session Not Active, Try Again!');
    }
    return false;
  };

  return (
    <div>
      <form onSubmit={submit}>
        <label htmlFor="Name">
          Name
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="email"
            value={name}
          />
        </label>
        <br />
        <label htmlFor="session">
          Session
          <input
            onChange={(e) => setSession(e.target.value)}
            type="text"
            id="session"
            value={session}
          />
        </label>
        <br />
        <input type="submit" value="Join" />
        <br />
      </form>
    </div>
  );
};
