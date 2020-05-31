import React, { Component } from "react";
import { Button, Alert, Row, Col } from 'reactstrap';
import { userService } from "../../services/userService";
import ModalCreateComplain from "../modal/ModalCreateComplain";
import Moment from 'moment';
import "../../styles/ProfileCard.css"

class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: this.props.id,
            account: {},
            loading: false,
            modalOpen: true,
            modalComplainOpen: false
        }
    }

    componentDidMount() {
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

     handleCreateComplainCancel = () => {
        this.setState({ modalComplainOpen: false });
    }

     handleCreateComplain = () => {
        this.setState({ modalComplainOpen: true });
    }

    render() {
        const date = new Date(this.state.account.lastLoginTime);
        const formattedDate = Moment(date).format('LLL');
        const isOnline = this.state.account.isOnline;

        return (
            <div className="card profile-card">
                <img className="profile-card-image" alt="Profile avatar" src={this.state.account.avatarPath || "/images/profile.png"} />
                <div className="card-body">
                    <h6 className="profile-title profile-card-title">
                        <span>{this.state.account.firstName} </span>
                        <span> {this.state.account.lastName}</span>
                    </h6>
                    <h6 className="card-title profile-card-title">Email:  {this.state.account.email}</h6>
                    <h6 className="card-title profile-card-title">Phone:  {this.state.account.phoneNumber}</h6>
                    
                    <ModalCreateComplain
                    accountToId={this.state.accountId}
                    modal={this.state.modalComplainOpen}
                    onCancel={this.handleCreateComplainCancel} 
                    />
                    
                    {isOnline &&
                        <h6 className="card-title profile-card-title">Status: Online</h6>
                    }
                    {!this.props.isApartmentOwner &&
                        <div>
                            {!isOnline &&
                                <h6 className="card-title profile-card-title">Last visit:   {formattedDate}</h6>
                            }
                            {this.state.account.maklerProbabilityScore >= 0.7 &&
                                <Alert color="danger" className="makler-warning">
                                    Pay attention, possible makler!</Alert>
                            }
                            {this.state.account.maklerProbabilityScore > 0.4 && this.state.account.maklerProbabilityScore < 0.7 &&
                                <Alert color="warning" className="makler-warning">
                                    Can be a makler</Alert>
                            }
                            <Row>
                                <Col>
                                    <Button color="primary" className="request-ovwerview-btn" onClick={this.props.requestReview}>
                                        Request overview
                        </Button>
                                </Col>
                                <Col>
                                    <Button color="primary" className="request-ovwerview-btn" onClick={this.handleCreateComplain}>
                                        Create Complain
                        </Button>
                                </Col>
                            </Row>



                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ProfileCard;