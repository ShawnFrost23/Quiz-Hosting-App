import React from 'react';
import PropTypes from 'prop-types';

export default function QuestionCard(props) {
  const onClickRoutePage = async (e) => {
    console.log(e.target.id);
  };
  const { id, title, thumbnail } = props;
  return (
    <>
      <div>{title}</div>
      <img src={thumbnail} alt="this is a pic" />
      <button id={id} type="button" onClick={onClickRoutePage}>Edit</button>
      <button id={id} type="button">Delete</button>
    </>

  );
}

QuestionCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
