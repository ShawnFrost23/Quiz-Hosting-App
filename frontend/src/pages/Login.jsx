import React from 'react';
// import { useAlert } from 'react-alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import { postMethodOptions } from '../options';
import '../styles/Login.css';

const BASE_URL = 'http://localhost:5005';

export default () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const history = useHistory();

  const submit = async (e) => {
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
    } else {
      // Yet to implement error handling.
      alert('Some Error Occured, Try Again!');
    }
    return false;
  };

  return (
    <div>
      <Form onSubmit={submit} className="Login">
        <Form.Group size="lg">
          <Form.Label>
            Email
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              id="email"
              value={email}
            />
          </Form.Label>
          <br />
        </Form.Group>
        <Form.Group size="lg">
          <Form.Label>
            Password
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              value={password}
            />
          </Form.Label>
          <br />
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
        <br />
      </Form>
    </div>
  );
};

// export default App;
