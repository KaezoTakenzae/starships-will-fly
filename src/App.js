import React, { Component } from 'react';
import Header from './components/header';
import Starship from './components/starship';

class App extends Component {
  state = {
    count: 0,
    filteredStarships: [],
    starships: [],
    most_frequent: {
      name: '',
      count: 0,
    },
    defaultView: true,
  };

  componentDidMount() {
    this.getStarships('https://swapi.co/api/starships/');
  };

  calculateMostFrequent = starships => {
    let most_frequent = {
      name: '',
      count: 0,
    };
    starships.forEach(starship => {
      if (starship.films.length >= most_frequent.count) {
        most_frequent = {
          name: starship.name,
          count: starship.films.length
        };
      }
    });
    this.setState({
      most_frequent
    });
    return most_frequent.count;
  };

  defaultView = (e, starships, update) => {
    const filteredStarships = starships.filter(starship => {
      return parseInt(starship.crew, 10) >= 10;
    });
    if (update) {
      this.setState({
        filteredStarships,
        defaultView: true,
      });
    }
    return filteredStarships;
  };

  getStarships = url => {
    fetch(url).then(resp => {
      return resp.json();
    }).then(results => {
      let starships = [
        ...this.state.starships,
        ...results.results
      ];
      starships.sort((a, b) => {
        return parseInt(a.crew, 10) > parseInt(b.crew, 10) ? 1 : -1;
      });
      const filteredStarships = this.defaultView(null, starships, false);
      this.setState({
        count: results.count,
        starships,
        filteredStarships
      });
      this.calculateMostFrequent(starships);
      starships.forEach(starship => {
        this.getFilms(starship);
      });
      if (results.next) {
        this.getStarships(results.next);
      }
    })
  }

  getFilms = starship => {
    let films = [];
    starship.films.forEach(film => {
      if (typeof film === 'string') {
        fetch(film).then(resp => {
          return resp.json();
        }).then(filmObj => {
          films.push(filmObj);
          starship.films = films;
        }).catch(err => {
          console.log(err);
        });
      }
    })
  }

  renderStarships = starships => (
    starships.map((starship, i) => (
      <Starship key={i} ship={starship} />
    ))
  );

  viewAll = (e, starships) => {
    const filteredStarships = starships;

    this.setState({
      filteredStarships,
      defaultView: false,
    });
  };

  viewMostFrequent = (e, starships) => {
    const mostFrqCount = this.calculateMostFrequent(starships);

    const filteredStarships = starships.filter(ship => {
      return ship.films.length === mostFrqCount;
    });

    this.setState({
      filteredStarships,
      defaultView: false,
    });
  };

  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="filters">
          <button onClick={event => this.viewMostFrequent(event, this.state.starships)}>Most Frequent</button>
          {
            this.state.defaultView ?
              <button onClick={event => this.viewAll(event, this.state.starships)}>View All</button>
            : <button onClick={event => this.defaultView(event, this.state.starships, true)}>Default View</button>
          }
        </div>
        <div className="starship-container">
          {this.renderStarships(this.state.filteredStarships)}
        </div>
      </div>
    );
  }
}

export default App;
