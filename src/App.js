import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HomeComponent from './components/HomeComponent'

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <HomeComponent />
      </div>
    )
  }
}

export default App;
