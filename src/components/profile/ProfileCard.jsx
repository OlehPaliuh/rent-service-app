import React, { Component } from "react";
import {  Button } from 'reactstrap';
import { userService } from "../../services/userService";
import "../../styles/ProfileCard.css"

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: this.props.id,
            account: {},
            loading: false,
            modalOpen: true
        }
    }

    componentDidMount() {
        console.log("isApartmentOwner")
        console.log(this.props.isApartmentOwner)

        this.setState({ loading: true });
        this.fetchAccountDetails();
    }

    fetchAccountDetails = () => {
        userService.getUserDetails(this.props.id)
            .then(result => {
                this.setState({ account: result, loading: false });
            },
                error => this.setState({ error, loading: false })
            );
    }

    handleRequestOverview = () => {
        this.setState({ modalOpen: true });
    }

    render() {

        return (
            <div className="card profile-card">
                <img className="profile-card-image" alt="Profile image" src={this.state.account.image || "/images/profile.png"} />
                <div className="card-body">
                    <h6 className="profile-title profile-card-title">
                        <span>{this.state.account.firstName} </span>
                        <span> {this.state.account.lastName}</span>
                    </h6>
                    <h6 className="card-title profile-card-title">Email:  {this.state.account.email}</h6>
                    <h6 className="card-title profile-card-title">Phone:  {this.state.account.phoneNumber}</h6>
                    {
                        console.log("isApartmentOwner")}
                      {  console.log(this.props.isApartmentOwner)
                    }
                    {!this.props.isApartmentOwner &&
                    <Button color="primary" className="request-ovwerview-btn" onClick={this.props.requestReview}>
                            Request overview
                        </Button>
                    }
                    {/* { this.state.apartment.loctaion &&
                        Object.keys(this.state.apartment.loctaion).map(function (key) {
                            if (key !== 'fullAddress') {
                                return (
                                    <h6 className="card-address">Address: {this.state.apartment.loctaion[key]}</h6>
                                )
                            }
                        })
                    } */}

                </div>
            </div>
        )
    }
}

export default ProfileCard;