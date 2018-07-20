import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import calculations from './calculations';

class App extends Component {
  constructor() {
    super()
    this.state = {'weight': 0};
  }

  componentDidMount() {
    let avgWeight = calculations.getAvgWeight();
    avgWeight.then(avg => {
      this.setState({'weight': avg});
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        The average weight of these products is {this.state.weight}.
        </p>
      </div>
    );
  }
}

export default App;
