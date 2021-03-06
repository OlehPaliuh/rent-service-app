import React, { Component } from "react"
import { Link } from 'react-router-dom';
import { Navbar, Button, NavbarBrand, NavLink, Form } from 'reactstrap'
import { userService } from "../services/userService";
import { Redirect} from "react-router-dom";
import { messengerService } from '../services/messengerService';
import "../index.css"

class NavbarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSearchPageOpened: this.props.item || false,
            apartments: [],
            searchString: "",
            loading: false,
            error: ''
        }
    }

    handleSearchStringChanged = e => {
        const { value } = e.target;

        this.setState({ searchString: value });
    }

    handleSearch = e => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { searchString } = this.state;

        // stop here if form is invalid
        if (!searchString) {
            this.setState({ error: "Form is not filled", loading: false })
            return;
        }

        this.setState({ loading: true });

        window.location.href = `/search?q=${searchString}`;
    }

    getSupportChat = () => {
        messengerService.getOrCreateChat("support").then(chat => {
          this.setState({
            ...this.state,
            chatId: chat.id,
            toMessenger: true
          })
        })
      }

    render() {

        const { searchString } = this.state;

        if (this.state.toMessenger === true) {
            let url = '/chat/' + this.state.chatId;
            // const { from } = this.props.location.state || { from: { pathname: `/edit/${this.state.accountId}` } };
                // this.props.history.push(from);
            return <Redirect to={url}/>
          }

        return (
            <Navbar className="navbar navbar-expand-lg navbar-expand-sm navbar-dark bg-dark">
                <NavbarBrand href="/">RentalService</NavbarBrand>
                <Button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </Button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink href="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item active">
                        <NavLink href="/chat">Messenger <span className="sr-only">(current)</span></NavLink>

                        {/* <Button onClick={this.getSupportChat}>Messenger <span className="sr-only">(current)</span></Button> */}
                        </li>
                    </ul>
                    <Link to={`/profile`} >
                        <img src="/images/profile_navBar_icon.png" className="nav-bar-profile-icon" alt="profile icon" />
                    </Link>
                    {!this.state.isSearchPageOpened &&
                        <Form className="form-inline my-2 my-lg-1" onSubmit={this.handleSearch}>
                            <input className="form-control mr-sm-2"
                                value={searchString}
                                type="search"
                                name="searchString"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={this.handleSearchStringChanged} />
                            <Button className="btn-success" type="submit">Search</Button>
                        </Form>
                    }
                    <NavLink className="btn btn-danger logoutButton" href="/login" onClick={userService.logout}>Log Out</NavLink>
                </div>
            </Navbar>
        )
    }
}

export default NavbarComponent;