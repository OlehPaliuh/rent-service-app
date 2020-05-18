import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "../styles/ApartmentCard.css"

class ApartmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: this.props.apartment || {},
            match: this.props.match
        }
    }

    render() {
        const { imageLinks } = this.state.apartment || []; 
        
        return (
            <div className="card apartment-card">
                {console.log(imageLinks[0])}
                <img className="card-img-top card-image" alt="Card image cap" src={imageLinks[0]} />
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