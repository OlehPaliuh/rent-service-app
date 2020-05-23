import React, { Component } from 'react';
import './App.css';
import HomeComponent from './components/HomeComponent'
import ApartmentPage from "./components/apartment/ApartmentPage"
import AboutComponent from "./components/AboutComponent"
import LoginComponent from "./components/LoginComponent"
import { PrivateRoute } from "./components/PrivateRoute"
import { Route, Switch } from 'react-router-dom';
import { userService } from './services/userService';
import NavbarComponent from './components/NavbarComponent';
import RegisterComponent from './components/RegisterComponent';
import CreateApatmentComponent from './components/CreateApartmentComponent';
import SearchResultComponent from './components/SearchResultComponent';
import ProfilePage from './components/profile/ProfilePage';
import EditProfilePage from './components/profile/EditProfilePage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearchPageOpened: false,
      currentUser: null,
      loading: false
    };
  }

  componentDidMount() {
    userService.currentUser.subscribe(x => this.setState({ currentUser: JSON.parse(localStorage.getItem('user')) }));
  }

  searchPageOpened = (bol) => {
    this.setState({isSearchPageOpened: bol})
  }

  render() {
    return (
      <div>
        {(this.state.currentUser || this.state.loading) &&
          <NavbarComponent item={this.state.isSearchPageOpened}/>
        }
        <Switch>
          <PrivateRoute exact path="/" component={HomeComponent} />
          <Route path="/login" component={LoginComponent} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/edit/:id" component={EditProfilePage} />
          <Route path="/about" component={AboutComponent} />
          <Route path="/search" render={(props) => <SearchResultComponent {...props} onOpen={this.searchPageOpened} />} />
          <Route exact path="/apartment/create" component={CreateApatmentComponent} />
          <Route path="/apartment/:id" component={ApartmentPage} />
        </Switch>
      </div>
    )
  }
}


export default App;
