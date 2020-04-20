import React, { Component } from "react"
import "../index.css"
import { Navbar, Button, NavbarBrand, NavLink } from 'reactstrap'
import { userService } from "../services/userService";

class NavbarComponent extends Component {
    render() {
        return (
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
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
                    <form className="form-inline my-2 my-lg-1">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <Button className="btn-success" type="submit">Search</Button>
                    </form>
                        <NavLink className="btn btn-danger logoutButton" href="/login" onClick={userService.logout}>Log Out</NavLink>
                </div>
            </Navbar>
        )
    }
}

export default NavbarComponent;