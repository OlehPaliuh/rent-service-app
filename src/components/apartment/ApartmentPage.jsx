import React from "react"
import { Col, Row, Table, Button } from 'reactstrap';
import MapContainer from '../../googleMapService/MapContainer';
import ModalComponent from '../modal/ModalComponent';
import ProfileCard from '../profile/ProfileCard';
import Lightbox from 'react-image-lightbox';
import { overviewService } from "../../services/overviewService";
import 'react-image-lightbox/style.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "../../index.css"
import "../../styles/LoginStyle.css"
import "../../styles/ApartmentPage.css"
import OverviewCard from "../overview/OverviewCard";

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
            isApartmentOwner: false,
            loadedOverviews: false,
            overviewRequests: []
        }
    }

    componentDidMount() {
        this.fetchRealtyById()
        this.fetchApartmentOverviewRequests()
    }

    ckick = () => {
        console.log("click");
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

    handleRequestOverview = () => {
        this.setState({ modalOpen: true });
    }

    render() {

        if (this.state.loading) {
            return <em>Loading apatment...</em>
        }
        const { photoIndex, isOpen, apartmentItem, isApartmentOwner } = this.state;

        return (
            <div className="container ownContainer">

                <Row>
                    <Col>
                        <h3 className="title">{this.state.apartmentItem.title}</h3>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        {this.state.loadedAccount && <ProfileCard
                            id={apartmentItem.accountId}
                            isApartmentOwner={isApartmentOwner}
                            requestReview={this.handleRequestOverview} />
                        }
                    </Col>
                    <Col md={8}>
                        {(!this.state.loading && apartmentItem) &&
                            <Table bordered striped>
                                <tbody>
                                    <tr>
                                        <th scope="row">Description</th>
                                        <td>{apartmentItem.description}</td>
                                    </tr>
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