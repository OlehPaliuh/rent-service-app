import React, { Component } from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent'
import ProductPage from "./components/RentalPage"
import AboutComponent from "./components/AboutComponent"
import LoginComponent from "./components/LoginComponent"
import { PrivateRoute } from "./components/PrivateRoute"
import { Route } from 'react-router-dom';
import { userService } from './services/userService';
import Navbar from './components/Navbar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    userService.currentUser.subscribe(x => this.setState({ currentUser: x }));
  }

  // logout() {
  //   userService.logout();
  //   // history.push('/login');
  // }

  render() {
    return (
      <div>
        <Navbar />
        {this.state.currentUser &&
          <p>
            {/* <Link to="/login">Logout</Link> */}
          </p>
        }
        <PrivateRoute exact path="/" component={HomeComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/about" component={AboutComponent} />
        <Route path="/rental/:id" component={ProductPage} />
      </div>
    )
  }
}

export default App;
