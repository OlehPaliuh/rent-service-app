import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ApartmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: this.props.apartment,
            match: this.props.match
        }
    }

    render() {
        return (
            <div className="card" style={{ width: "25%", margin: "20px" }}>
                {/* <img className="card-img-top" alt="Card image cap" /> */}
                <div className="card-body">
                    <h5 className="card-title">{this.state.apartment.title}</h5>
                    {/* { this.state.apartment.loctaion &&
                        Object.keys(this.state.apartment.loctaion).map(function (key) {
                            if (key !== 'fullAddress') {
                                return (
                                    <h6 className="card-address">Address: {this.state.apartment.loctaion[key]}</h6>
                                )
                            }
                        })
                    } */}
                    <p className="card-text">Description: {this.state.apartment.description}</p>
                    <Link exect color="primary" className="btn btn-primary"
                        to={`/apartment/${this.state.apartment.id}`}>Show more</Link>
                </div>
            </div>
        )
    }
}

export default ApartmentCard;