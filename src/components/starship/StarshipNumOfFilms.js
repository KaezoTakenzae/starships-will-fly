import React from 'react';

const StarshipNumOfFilms = ({count}) => {
  return (
    <div className="starship-nof">
      Seen in <span>{count}</span> {count === 1 ? 'film' : 'films'}
    </div>
  );
};

export default StarshipNumOfFilms;
