import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { favouriteService } from "../../services/favouriteService";
import "../../styles/ApartmentCard.css"

class ApartmentCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: this.props.apartment || {},
            match: this.props.match,
            isLiked: false,
        }
    }

    componentDidMount() {
        const currentUserId = JSON.parse(localStorage.getItem('user')).id;
             this.state.apartment.favouriteList.map(obj => {
                 if (obj.accountId === currentUserId) {
                    this.setState({ isLiked: true });
                }
                return true;
            });
    }

    handleRemoveFromFavourite = () => {
        favouriteService.removeFromFavourite(this.state.apartment.id)
            .then(response => {
                this.setState({ isLiked: false });
            })
    }

    handleAddToFavourite = () => {
        favouriteService.addToFavourite(this.state.apartment.id)
            .then(response => {
                this.setState({ isLiked: true });
            })
    }

    render() {
        const { imageLinks } = this.state.apartment || [];

        if (imageLinks.length === 0) {
            imageLinks.push("/images/no-image.png")
        }
        let roomString = null;

        if (this.state.apartment.numberOfRooms > 1) {
            roomString = "rooms"
        } else {
            roomString = "room"
        }

        return (
            <div className="card apartment-card">
                {imageLinks.length > 0 &&
                    <img className="card-img-top card-image" alt="Card cap" src={imageLinks[0]} />
                }
                <div className="card-body">
                    <h5 className="card-title">{this.state.apartment.title}</h5>
                    <p className="card-text">
                        <span className="card-text-price">{this.state.apartment.price}$</span>
                        <span className="card-text">   {this.state.apartment.numberOfRooms} {roomString}</span>
                        <span className="card-text">   {this.state.apartment.totalArea} м2</span>
                        <span className="card-text">    {this.state.apartment.floor} floor     </span>
                    </p>
                    <Row>
                        <Col ms={8}>
                            <Link exect color="primary" className="btn btn-primary"
                                to={`/apartment/${this.state.apartment.id}`}>Show more</Link>
                        </Col>
                        <Col ms={4} className="icon-col">
                            {this.state.isLiked &&
                                <img src="/images/icons/heart-red.png" className="like-icon-red" alt="like" onClick={this.handleRemoveFromFavourite} />
                            }
                            {!this.state.isLiked &&
                                <img src="/images/icons/heart-black.png" className="like-icon-black" alt="like" onClick={this.handleAddToFavourite} />
                            }
                        </Col>
                    </Row>

                </div>
            </div>
        )
    }
}

export default ApartmentCard;