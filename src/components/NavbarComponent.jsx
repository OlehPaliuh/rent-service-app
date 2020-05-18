import React, { Component } from "react"
import { Navbar, Button, NavbarBrand, NavLink, FormGroup, Form } from 'reactstrap'
import { userService } from "../services/userService";
import "../index.css"

class NavbarComponent extends Component {
    constructor(props) {
        super(props);

        console.log(this.props.item);

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

    render() {

        const { searchString } = this.state;

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
                        <li className="nav-item ">
                            <NavLink href="/#">Link</NavLink >
                        </li>
                        <li className="nav-item active">
                            <NavLink href="/about/">About</NavLink>
                        </li>
                    </ul>
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