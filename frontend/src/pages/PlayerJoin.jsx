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

    if (response.status === 200) {
      const response2 = await response.json();
      console.log('Worked success');
      console.log(response2.playerId);
      history.push(`/playsession/:${response2.playerId}`);
    } else {
      document.getElementById('email').className = 'form-control is-invalid bg-transparent';
      document.getElementById('session').className = 'form-control is-invalid bg-transparent';
      document.getElementById('errorMessage').className = 'position-absolute z-20 w-400 h-200 font-size-24 alert visible alert alert-danger filled';
    }
    return false;
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
        <form onSubmit={submit} className="w-300 mw-full">
          <label htmlFor="Name" className="w-full h-100">
            Name
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="email"
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
              placeholder="Enter your name"
              value={name}
            />
          </label>
          <br />
          <label htmlFor="session" className="w-full h-100">
            Session
            <input
              onChange={(e) => setSession(e.target.value)}
              type="text"
              id="session"
              value={session}
              className="w-full form-control border-top-0 border-left-0 border-right-0 rounded-0 bg-transparent"
              placeholder="Enter Session ID"
            />
          </label>
          <div className="w-full d-flex justify-content-center">
            <input className="w-half btn btn-secondary btn-rounded" type="submit" value="Join" aria-label="Join Quiz" />
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};
