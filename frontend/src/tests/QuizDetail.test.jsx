import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import QuizDetailComponent from '../components/QuizDetailComponent';

configure({ adapter: new Adapter() });

const quizId = 0;

test('renders Quizdtails without props correctly', () => {
  render(<QuizDetailComponent />);
});

test('renders Quizdtails props correctly', () => {
  render(<QuizDetailComponent quizId={quizId} />);
});
