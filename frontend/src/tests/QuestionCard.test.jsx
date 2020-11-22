import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import QuestionCard from '../components/QuestionCard';

configure({ adapter: new Adapter() });

const sampleData = {
  id: 1234,
  q: 'This is a sample qu',
  thumbnail: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
};

test.skip('renders Quizdtails without props correctly', () => {
  render(<QuestionCard />);
});

test.skip('renders Quizdtails props correctly', () => {
  render(<QuestionCard title={sampleData.q} id={sampleData.id} thumbnail={sampleData.thumbnail} />);
});

test.skip('if question title is correctly shown', () => {
  render(<QuestionCard title={sampleData.q} id={sampleData.id} thumbnail={sampleData.thumbnail} />);
  const linkElement = screen.getByText(/This is a sample qu/i);
  expect(linkElement).toBeInTheDocument();
});

test.skip('works if thumbnail is rendered correctly', () => {
  render(<QuestionCard title={sampleData.q} id={sampleData.id} thumbnail={sampleData.thumbnail} />);
});
