import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from '../components/NavBar';

configure({ adapter: new Adapter() });

const handleLogOut = () => {};

test('renders NavBar correctly', () => {
  render(<NavBar />);
});

test('NavBar contains a logout button', () => {
  const wrapper = shallow(<NavBar />);
  const logOut = <button type="button" onClick={handleLogOut}>Log Out</button>;
  expect(wrapper.containsAnyMatchingElements(logOut)).toEqual(false);
});

test('NavBar contains a log out button has meaningful name', () => {
  render(<NavBar />);
  const linkElement = screen.getByText(/Log out/i);
  expect(linkElement).toBeInTheDocument();
});
