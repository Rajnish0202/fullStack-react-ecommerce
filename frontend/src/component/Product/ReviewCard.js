import React from 'react';
import { Rating } from '@material-ui/lab';
import profilePng from '../../images/Profile.png';

const ReviewCard = ({ review, user }) => {
  const { url } = user.avatar;
  const options = {
    value: review.rating,
    precision: 0.5,
    readOnly: true,
  };

  return (
    <div className='reviewCard'>
      <img src={user ? url : profilePng} alt='User' />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className='reviewCard-span'>{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
