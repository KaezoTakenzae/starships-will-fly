import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    fetch('https://swapi.co/api/starships/').then(resp => {
      return resp.json();
    }).then(myJson => {
      console.log(myJson);
      let results = [...myJson.results];
      results.sort((a, b) => {
        return parseInt(a.crew, 10) > parseInt(b.crew, 10) ? 1 : -1;
      });
      results = results.filter(result => {
        return parseInt(result.crew, 10) >= 10;
      })
      console.log(results);
    })
  }

  render() {
    return (
      <div className="App">
        Hello
      </div>
    );
  }
}

export default App;
