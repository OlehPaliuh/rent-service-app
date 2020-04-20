import React, { Component } from "react";
import { Link } from 'react-router-dom';

class ApartmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rental: this.props.rental,
            match: this.props.match
        }
    }

    render() {
        return (
            <div className="card" style={{ width: "25%", margin: "20px" }}>
                {/* <img className="card-img-top" alt="Card image cap" /> */}
                <div className="card-body">
                    {/* <h5 className="card-title">Card title</h5> */}
                    <h6 className="card-address">Address: {this.state.rental.address}</h6>
                    <p className="card-text">Description: {this.state.rental.description}</p>
                    <Link color="primary" class="btn btn-primary"
                        to={`apartment/${this.state.rental.id}`}>Show more</Link>
                </div>
            </div>
        )
    }
}

export default ApartmentCard;