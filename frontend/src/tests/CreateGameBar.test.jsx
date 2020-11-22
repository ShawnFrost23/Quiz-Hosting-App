import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import GameBar from '../components/CreateNewGameBar';

configure({ adapter: new Adapter() });

const setGameFunction = () => {};

test('renders Create-game-bar without props correctly', () => {
  render(<GameBar />);
});

test('renders Create-game-bar with props correctly', () => {
  render(<GameBar setGameFunction={setGameFunction} />);
});

test('Button being rendered correctly', () => {
  render(<GameBar />);
  const linkElement = screen.getByText(/Create New Game/i);
  expect(linkElement).toBeInTheDocument();
});

// test('Button being rendered correctly', () => {
//   const { getB } = render(<GameBar />);
//   const i = getByLabelText("ok-add");
//   expect(linkElement).toBeInTheDocument();
// });
