import React, { Component } from "react";
import { Pagination, PaginationItem, PaginationLink, Col, Row, Button } from 'reactstrap';
import ApartmentCard from '../apartment/ApartmentCard'
import { userService } from "../../services/userService";
import "../../styles/ProfilePage.css"

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountId: JSON.parse(localStorage.getItem('user')).id,
            account: {},
            loaded: false,
            ownList: [],
            favouriteList: []
        }
    }

    componentDidMount() {
        this.setState({ loading: false });
        this.fetchOwnerAccountDetails();
    }

    fetchOwnerAccountDetails = () => {
        userService.getOwnerAccountDetails(this.state.accountId)
            .then(result => {
                this.setState({ account: result, loaded: true });
            },
                error => this.setState({ error, loaded: true })
            );
    }

    render() {

        if (this.state.loaded) {
            this.state.account.ownApartmentList.map(item => this.state.ownList.push(<ApartmentCard key={item.id} apartment={item} />));
            this.state.account.favouriteList.map(apartment => this.state.favouriteList.push(<ApartmentCard key={apartment.id} apartment={apartment} />));
        }

        return (
            <div>

                <div className="container profile-container">
                    <Row>
                        <Col>
                            <h3 className="title">Profile</h3>
                        </Col>
                    </Row>
                    {this.state.loaded &&
                        <Row>
                            <Col ms={3}>
                                <img className="profile-image" src="/images/profile.png" alt="Avatar" />
                            </Col>
                            <Col ms={9}>
                                <Row>
                                    <Col lg={7} ms={10}>
                                        <h4 className="name-title">{this.state.account.firstName} {this.state.account.lastName}</h4>
                                        <p className="nickname">nickname: {this.state.account.username}</p>
                                    </Col>
                                    <Col lg={5} ms={2} >
                                        <Button color="warning" className="btn edit-button">
                                            Edit
                                    </Button>
                                    </Col>
                                </Row>
                                <h6 className="info-text">Email: {this.state.account.email}</h6>
                                <h6 className="info-text">Phone: {this.state.account.phoneNumber}</h6>
                                <h6 className="info-text">Role: {this.state.account.role.name}</h6>
                                <h6 className="info-text">Account Locked: {this.state.account.isLocked ? "Yes" : "No"}</h6>
                            </Col>
                        </Row>
                    }
                    {this.state.loaded && this.state.ownList.length > 0 &&
                        <div>
                            <h2 className="title">Own apartment list</h2>

                            <Row >
                                {this.state.ownList.map(app => <Col className="" md={3} lg={3}> {app} </Col>)}
                            </Row>
                        </div>
                    }

                    {this.state.loaded && this.state.favouriteList.length > 0 &&
                        <div>
                            <h2 className="title">Favourite list</h2>
                            
                            <Row >
                                {this.state.favouriteList.map(app => <Col className="" md={3} lg={3}> {app} </Col>)}
                            </Row>
                        </div>
                    }
                    {this.state.loaded && console.log(this.state.account)}
                </div>
            </div>
        )
    }
}

export default ProfilePage;