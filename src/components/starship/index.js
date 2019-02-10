import React from 'react';
import StarshipName from './StarshipName';
import StarshipModel from './StarshipModel';
import StarshipNumOfFilms from './StarshipNumOfFilms';

const Starship = ({ship}) => {
  return (
    <div className="starship">
      <div className="starship-contents">
        <StarshipName name={ship.name} />
        <StarshipModel model={ship.model} />
        <StarshipNumOfFilms count={ship.films.length} />
        Crew: {ship.crew}
      </div>
    </div>
  );
};

export default Starship;
