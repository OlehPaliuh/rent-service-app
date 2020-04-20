import React, { Component } from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent'
import ApartmentPage from "./components/ApartmentPage"
import AboutComponent from "./components/AboutComponent"
import LoginComponent from "./components/LoginComponent"
import { PrivateRoute } from "./components/PrivateRoute"
import { Route } from 'react-router-dom';
import { userService } from './services/userService';
import NavbarComponent from './components/NavbarComponent';
import RegisterComponent from './components/RegisterComponent';
import ProfileComponent from './components/ProfileComponent';
import CreateApatmentComponent from './components/CreateApartmentComponent';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      loading: false
    };
  }

  componentDidMount() {
    userService.currentUser.subscribe(x => this.setState({ currentUser: JSON.parse(localStorage.getItem('user'))}));
  }

  // logout() {
  //   userService.logout();
  //   // history.push('/login');
  // }

  render() {
    return (
      <div>
        {(this.state.currentUser || this.state.loading) &&
          <NavbarComponent />
        }
        <PrivateRoute exact path="/" component={HomeComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/register" component={RegisterComponent} />
        <Route path="/profile" component={ProfileComponent} />
        <Route path="/apartment/create/" component={CreateApatmentComponent} />
        <Route path="/about" component={AboutComponent} />
        <Route path="/apartment/:id" component={ApartmentPage} />
      </div>
    )
  }
}

export default App;
