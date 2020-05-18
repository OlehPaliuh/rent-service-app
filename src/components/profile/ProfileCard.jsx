import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { userService } from "../../services/userService";
import "../../styles/ProfileCard.css"

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: this.props.id,
            account: {},
            loading: false
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.fetchAccountDetails();
        console.log(this.state.account)
    }

    fetchAccountDetails = () => {
        userService.getUserDetails(this.props.id)
            .then(result => {
                this.setState({ account: result, loading: false });
            },
                error => this.setState({ error, loading: false })
            );
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