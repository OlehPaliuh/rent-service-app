import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Form, FormGroup, PaginationLink, Col, Row, Button } from 'reactstrap';
import ApartmentCard from '../apartment/ApartmentCard'
import { imageService } from "../../services/imageService";
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
            favouriteList: [],
            avatarImage: ""
        }
    }

    componentDidMount() {
        this.setState({ loaded: false });
        this.fetchOwnerAccountDetails();
    }

    handleUpdateAvatar = () => {
        this.upload.click();
    }

    handleAvatarChange = (e) => {
        const file = e.target.files[0];
        this.setState({avatarImage: file});
        if(file) {
            imageService.updateProfileImage(file)
               .then(responce => {
                    this.setState({ account: responce });
                },
                    error => this.setState({ error })
                );
        }
    }

    fetchOwnerAccountDetails = () => {
        userService.getOwnerAccountDetails(this.state.accountId)
            .then(result => {
                this.setState({ account: result, loaded: true });
            },
                error => this.setState({ error, loaded: true })
            );
    }

    handleEditClick = () => {
        const { from } = this.props.location.state || { from: { pathname: `/edit/${this.state.accountId}` } };
        this.props.history.push(from); 
    }

    render() {

        if (this.state.loaded) {
            this.state.account.ownApartmentList.map(item => this.state.ownList.push(<ApartmentCard key={item.id} apartment={item} />));
            console.log("Favourite");
            this.state.account.favouriteList.map(favourite => this.state.favouriteList.push(<ApartmentCard key={favourite.apartment.id} apartment={favourite.apartment} />));
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
                                <img className="profile-image" src={this.state.account.avatarPath || "/images/profile.png"} alt="Avatar" />
                                <Row >
                                        <Col >
                                        <input hidden name="avatarImage" type='file' id='single' ref={(ref) => this.upload = ref}
                                        accept="image/*" style={{display: 'none'}} onChange={this.handleAvatarChange} /> 
                                             <Button color="primary" className="update-image-button" onClick={this.handleUpdateAvatar}>Update image</Button>
                                             </Col>
                                        </Row>
                            </Col>
                            <Col ms={9}>
                                <Row>
                                    <Col lg={7} ms={10}>
                                        <h4 className="name-title">{this.state.account.firstName} {this.state.account.lastName}</h4>
                                        <p className="nickname">nickname: {this.state.account.username}</p>
                                    </Col>
                                    <Col lg={5} ms={2} >
                                        <Button color="warning" className="btn edit-button" onClick={this.handleEditClick}>
                                            Edit
                                    </Button>
                                    </Col>
                                </Row>
                                <h6 className="info-text">Email: {this.state.account.email}</h6>
                                <h6 className="info-text">Phone: {this.state.account.phoneNumber}</h6>
                                <h6 className="info-text">Role: {this.state.account.role.name}</h6>
                                <h6 className="info-text">Account Locked: {this.state.account.locked ? "Yes" : "No"}</h6>

                                {this.state.account.locked &&
                                    <h6 className="info-text">Lock reason: {this.state.account.lockReason}</h6>
                                }
                            </Col>
                        </Row>
                    }
                    {this.state.loaded && this.state.ownList.length > 0 &&
                        <div>
                            <h2 className="title">Own apartment list</h2>

                            <Row >
                                {this.state.ownList.map(app => <Col className="" md={4} lg={4}> {app} </Col>)}
                            </Row>
                        </div>
                    }

                    {this.state.loaded && this.state.favouriteList.length > 0 &&
                        <div>
                            <h2 className="title">Favourite list</h2>
                            
                            <Row >
                                {this.state.favouriteList.map(app => <Col className="" md={4} lg={4}> {app} </Col>)}
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