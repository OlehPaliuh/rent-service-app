import React, { Component } from "react"
import "../index.css"
import { userService } from "../services/userService";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">RentalService</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/about/">About</a>
                        </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-1">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                        <a className="btn btn-outline-danger logoutButton" href="/login" onClick={userService.logout}>Log Out</a>
                </div>
            </nav>
        )
    }
}

export default Navbar;