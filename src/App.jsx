import React, { Component } from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent'
import ProductPage from "./components/RentalPage"
import AboutComponent from "./components/AboutComponent"
import LoginComponent from "./components/LoginComponent"
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact={true} path="/" component={HomeComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/about" component={AboutComponent} />
        <Route path="/rental/:id" component={ProductPage} />
      </div>
    )
  }
}

export default App;
