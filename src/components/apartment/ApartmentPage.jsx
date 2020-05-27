import React from "react"
import { Col, Row, Table, Button, ToastHeader, Toast, ToastBody, Label } from 'reactstrap';
import MapContainer from '../../googleMapService/MapContainer';
import ModalComponent from '../modal/ModalComponent';
import ProfileCard from '../profile/ProfileCard';
import Lightbox from 'react-image-lightbox';
import { overviewService } from "../../services/overviewService";
import 'react-image-lightbox/style.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Moment from 'moment';
import "../../index.css"
import "../../styles/LoginStyle.css"
import "../../styles/ApartmentPage.css"
import OverviewCard from "../overview/OverviewCard";
import { Comment, Form, Header } from 'semantic-ui-react'
import ModalChangeApartmentStatus from "../modal/ModalChangeApartmentStatus";
import CommentBox from "../comment/CommentBox";

const Location = {
    administrativeArea: String,
    country: String,
    city: String,
    sublocality: String,
    route: String,
    streetNumber: String,
    political: String,
    postal_code: String,
    fullAddress: String,
    latitude: String,
    longitude: String
}

class ApartmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            apartmentItem: {
                location: Location
            },
            loading: false,
            photoIndex: 0,
            isOpen: false,
            photoLoaded: false,
            loadedAccount: false,
            modalOpen: false,
            statusModalOpen: false,
            isApartmentOwner: false,
            loadedOverviews: false,
            overviewRequests: []
        }
    }

    componentWillMount() {
        this.fetchRealtyById()
        this.fetchApartmentOverviewRequests()
    }

    fetchRealtyById = async () => {
        this.setState({ loadedAccount: false });

        const currentUserId = JSON.parse(localStorage.getItem('user')).id;

        await fetch(`/api/apartment/${this.state.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    apartmentItem: data,
                    loading: false,
                    photoLoaded: true,
                    loadedAccount: true
                })
                if (data.accountId === currentUserId) {
                    this.setState({ isApartmentOwner: true })
                }
            });
    };

    fetchApartmentOverviewRequests = () => {
        this.setState({ loadedOverviews: false });
        overviewService.getApartmentOverviewRequests(this.state.id)
            .then(result => {
                this.setState({ overviewRequests: result, loadedOverviews: true });
            },
                error => this.setState({ error, loadedOverviews: true })
            );
    }

    handleCancel = () => {
        this.setState({ modalOpen: false });
    }

    handleStatusModalCancel = () => {
        this.setState({ statusModalOpen: false });
    }

    handleChangeStatus = () => {
        this.setState({ statusModalOpen: true });
    }

    hadleStatusChanged = (status) => {
        const { apartmentItem } = this.state;
        apartmentItem.status = status;
        this.setState({ apartmentItem: apartmentItem });
    }

    handleRequestOverview = () => {
        this.setState({ modalOpen: true });
    }

    handleDeleteComment = (id) => {
        const { apartmentItem } = this.state;
        const comments = [];
        apartmentItem.comments.map(item => {
            if(item.id !== id) {
                comments.push(item);
            }
        })
        apartmentItem.comments = comments;

        this.setState({apartmentItem: apartmentItem});
    }

    handleAddComment = (comment) => {
        const { apartmentItem } = this.state;
       
        apartmentItem.comments.push(comment);

        this.setState({apartmentItem: apartmentItem});
    }

    render() {

        if (this.state.loading) {
            return <em>Loading apatment...</em>
        }
        const { photoIndex, isOpen, apartmentItem, isApartmentOwner } = this.state;

        const statusDate = new Date(apartmentItem.statusDateChange);
        const formattedDateTime = Moment(statusDate).format('LLL');

        return (
            <div className="container ownContainer">

                <Row>
                    <Col>
                        <h3 className="title">{this.state.apartmentItem.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {this.state.isApartmentOwner &&
                            <h6 className="title2">Status:  {this.state.apartmentItem.status}  <Button color="warning" onClick={this.handleChangeStatus}>Change</Button></h6>
                        }
                        {!this.state.isApartmentOwner &&
                            <h6 className="title2">Status:  {this.state.apartmentItem.status}</h6>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h6 className="title2">Last modification: {formattedDateTime}</h6>
                    </Col>
                </Row>

                <ModalChangeApartmentStatus
                    apartmentId={this.state.apartmentItem.id}
                    modal={this.state.statusModalOpen}
                    status={this.state.apartmentItem.status}
                    onCancel={this.handleStatusModalCancel}
                    onSubmit={this.hadleStatusChanged}
                />

                <Row>
                    <Col md={4}>
                        {this.state.loadedAccount && <ProfileCard
                            id={apartmentItem.accountId}
                            isApartmentOwner={isApartmentOwner}
                            requestReview={this.handleRequestOverview}
                        />
                        }
                    </Col>
                    <Col md={8}>
                        {(!this.state.loading && apartmentItem) &&
                            <Table bordered striped>
                                <tbody>
                                    <tr>
                                        <th scope="row">Price</th>
                                        <td>{apartmentItem.price}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Area</th>
                                        <td>{apartmentItem.totalArea}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Floor</th>
                                        <td>{apartmentItem.floor}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Lvivng Area</th>
                                        <td>{apartmentItem.livingArea}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Building Type</th>
                                        <td>{apartmentItem.buildingType === "NEW_BUILDING" ? "new building" : "old building"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">AllowPets</th>
                                        <td>{apartmentItem.allowPets === true ? "Yes" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Rooms</th>
                                        <td>{apartmentItem.numberOfRooms}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Tags</th>
                                        <td>{apartmentItem.tags}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Location</th>
                                        <td>{apartmentItem.location.fullAddress}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        }
                    </Col>
                </Row>
                <Row>
                    <Table bordered striped>
                        <tbody>
                            <tr>
                                <th scope="row">Description</th>
                                <td>{apartmentItem.description}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
                <ModalComponent
                    accountId={this.state.apartmentItem.accountId}
                    apartmentId={this.state.apartmentItem.id}
                    modal={this.state.modalOpen}
                    onCancel={this.handleCancel} />

                <div className="map-cont">
                    <MapContainer
                        onClick={this.ckick}
                        location={apartmentItem.location}
                        center={{ lat: apartmentItem.location.latitude, lng: apartmentItem.location.longitude }}
                    />
                </div>


                <Row>
                    <Col lg={5} ms={6}>

                        {this.state.photoLoaded && apartmentItem.imageLinks.length > 0 &&
                            <h4 className="title">Photos</h4>
                        }

                        {this.state.photoLoaded && apartmentItem.imageLinks.length > 0 &&

                            <CarouselProvider
                                naturalSlideWidth={60}
                                naturalSlideHeight={60}
                                totalSlides={apartmentItem.imageLinks.length}
                                className="sliderContainer"
                            >
                                <Slider
                                    onClick={() => this.setState({ isOpen: true })}
                                >
                                    {apartmentItem.imageLinks.map(slide =>
                                        <Slide key={slide}
                                            index={slide}
                                        >
                                            <img src={slide} className="item" alt={slide} />
                                        </Slide>)}
                                </Slider>
                                <ButtonBack className="prev-button btn btn-primary">Back</ButtonBack>
                                <ButtonNext className="next-button btn btn-primary">Next</ButtonNext>
                            </CarouselProvider>
                        }
                    </Col>

                    {this.state.isApartmentOwner && this.state.loadedOverviews && this.state.overviewRequests.length > 0 &&
                        <Col lg={6} ms={6}>
                            <h4 className="title">Active overview requests</h4>
                            <Row>
                                {this.state.overviewRequests.map(overview => <Col ms={3}><OverviewCard overview={overview} /></Col>)}
                            </Row>
                        </Col>
                    }
                </Row>

                <Label className="title"> <h4>Comments</h4></Label>

                {this.state.apartmentItem && 
                    <CommentBox className="commentBox" 
                        apartmentId={this.state.apartmentItem.id}
                        comments={this.state.apartmentItem.comments}
                        deleteComment={this.handleDeleteComment}
                        addComment={this.handleAddComment}
                        />
                }

                {/* <div className="comments-container">
        
                    <Toast className="comment-item">
                        <ToastHeader>
                            Reactstrap
                     </ToastHeader>
                        <ToastBody>
                            This is a toast on a white background — check it out!
                     </ToastBody>
                    </Toast>
                </div> */}


                {isOpen && (
                    <Lightbox
                        mainSrc={apartmentItem.imageLinks[photoIndex]}
                        nextSrc={apartmentItem.imageLinks[(photoIndex + 1) % apartmentItem.imageLinks.length]}
                        prevSrc={apartmentItem.imageLinks[(photoIndex + apartmentItem.imageLinks.length - 1) % apartmentItem.imageLinks.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + apartmentItem.imageLinks.length - 1) % apartmentItem.imageLinks.length,
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % apartmentItem.imageLinks.length,
                            })
                        }
                    />
                )}

            </div>
        )
    }
}

export default ApartmentPage;