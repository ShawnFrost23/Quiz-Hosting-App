import React from 'react';
import { render, screen } from '@testing-library/react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import QuizCard from '../components/QuizCard';
import QuizDetailComponent from '../components/QuizDetailComponent';

configure({ adapter: new Adapter() });

const noop = () => {};
// const editQuizButtonHandler = () => {};

const sampleQuiz = {
  id: 1234,
  quizName: 'This is a sample quizname',
  thumbnail: '',
  status: null,
};

test('renders QuizCard without props correctly', () => {
  render(<QuizCard />);
});

test('renders QuizCard with props correctly', () => {
  render(<QuizCard
    id={sampleQuiz.id}
    quizName={sampleQuiz.quizName}
    thumbnail={sampleQuiz.thumbnail}
    setGameFunction={noop}
    status={sampleQuiz.status}
    getListofGames={noop}
  />);
});

test('renders QuizCard, and check if quizname is on page', () => {
  render(<QuizCard
    id={sampleQuiz.id}
    quizName={sampleQuiz.quizName}
    thumbnail={sampleQuiz.thumbnail}
    setGameFunction={noop}
    status={sampleQuiz.status}
    getListofGames={noop}
  />);
  const linkElement = screen.getByText(/This is a sample quizname/i);
  expect(linkElement).toBeInTheDocument();
});

test('If no props passed Edit Button should not render', () => {
  const wrapper = shallow(<QuizCard />);
  const eBtn = <button className="w-half btn btn-primary btn-rounded my-5" type="button" onClick={noop} aria-label="Edit Quiz">Edit</button>;
  expect(wrapper.contains(eBtn)).toEqual(false);
});

test('If no props passed Delete Button should not render', () => {
  const wrapper = shallow(<QuizCard />);
  const dBtn = <button className="w-half btn btn-danger btn-rounded my-5" type="button" onClick={noop} aria-label="Delete Quiz">Delete</button>;
  expect(wrapper.contains(dBtn)).toEqual(false);
});

// test('Checks if edit buttion is renders if props passed', () => {
//   const wrapper = shallow(<QuizCard
//     id={sampleQuiz.id}
//     quizName={sampleQuiz.quizName}
//     thumbnail={sampleQuiz.thumbnail}
//     setGameFunction={noop}
//     status={sampleQuiz.status}
//     getListofGames={noop}
//   />);
// const eBtn = <button
// className="w-half btn btn-primary btn-rounded my-5"
// type="button" onClick={editQuizButtonHandler} aria-label="Edit Quiz">Edit</button>;
//   expect(wrapper.contains(eBtn)).toEqual(true);
// });

test('Checks if QuizDetails is rendered correctly', () => {
  const wrapper = shallow(<QuizCard
    id={sampleQuiz.id}
    quizName={sampleQuiz.quizName}
    thumbnail={sampleQuiz.thumbnail}
    setGameFunction={noop}
    status={sampleQuiz.status}
    getListofGames={noop}
  />);
  const eBtn = <QuizDetailComponent quizId={sampleQuiz.id} />;
  expect(wrapper.contains(eBtn)).toEqual(true);
});
