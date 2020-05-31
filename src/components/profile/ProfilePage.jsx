import React, { Component } from "react";
import { Col, Row, Button } from 'reactstrap';
import ApartmentCard from '../apartment/ApartmentCard'
import { imageService } from "../../services/imageService";
import { userService } from "../../services/userService";
import OverviewCard from "../overview/OverviewCard";
import { overviewService } from "../../services/overviewService";
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
            avatarImage: "",
            overviewRequests: []
        }
    }

    componentDidMount() {
        this.setState({ loaded: false });
        this.fetchOwnerAccountDetails();
        this.fetchAccountOverviewRequests();
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

    fetchAccountOverviewRequests = () => {
        this.setState({ loadedOverviews: false });
        overviewService.getAccountOverviewRequests(this.state.accountId)
            .then(result => {
                this.setState({ overviewRequests: result });
            },
                error => this.setState({ error })
            );
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

    handleDeleteAccount = () => {

        if (!window.confirm('Account information will be deleted! Dou you want to continue?')) {
            return;
        }

        const reason = "Is deleted by owner";

        userService.deleteOwnAccount(this.state.accountId, reason)
            .then(response => {
                userService.logout();
                window.location.reload(false);
            })
    }

    render() {

        const favouriteList = [];

        const ownList = [];

        if (this.state.loaded) {
            this.state.account.ownApartmentList.map(item => ownList.push(<ApartmentCard key={item.id} apartment={item} />));
            this.state.account.favouriteList.map(favourite => favouriteList.push(<ApartmentCard key={favourite.apartment.id} apartment={favourite.apartment} />));
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
                    {this.state.loaded && ownList.length > 0 &&
                        <div>
                            <h2 className="title">Own apartment list</h2>

                            <Row >
                                {ownList.map(app => <Col className="" md={4} lg={4}> {app} </Col>)}
                            </Row>
                        </div>
                    }

                    {this.state.loaded && favouriteList.length > 0 &&
                        <div>
                            <h2 className="title">Favourite list</h2>
                            
                            <Row >
                                {favouriteList.map(app => <Col className="" md={4} lg={4}> {app} </Col>)}
                            </Row>
                        </div>
                    }

                        { this.state.overviewRequests && this.state.overviewRequests.length > 0 &&
                            <Row>
                            <h4 className="title">Overview requests</h4>
                                {this.state.overviewRequests.map(overview => <Col ms={3} lg={3}><OverviewCard overview={overview} /></Col>)}
                            </Row>
                    }

                    {this.state.accountId && <div className="delete-account"><Button color="danger" onClick={this.handleDeleteAccount}>Delete Account</Button>
                    </div> }
                </div>
            </div>
        )
    }
}

export default ProfilePage;