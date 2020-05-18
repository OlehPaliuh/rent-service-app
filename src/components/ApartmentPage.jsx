import React from "react"
import "../index.css"
import {
    Col, Row, Table
} from 'reactstrap';
import MapContainer from '../googleMapService/MapContainer';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "../index.css"
import "../styles/LoginStyle.css"

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
            photoLoaded: false
        }

    }

    componentDidMount() {
        this.fetchRealtyById()
    }

    ckick = () => {
        console.log("click");
    }

    fetchRealtyById = async () => {
        console.log(this.state.id)
        await fetch(`/api/apartment/${this.state.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    apartmentItem: data,
                    loading: false,
                    photoLoaded: true
                })
            });
    };

    render() {

        if (this.state.loading) {
            return <em>Loading apatment...</em>
        }
        const { photoIndex, isOpen, apartmentItem } = this.state;

        return (
            <div className="container ownContainer">

                <Row>
                    <Col>
                        <h3 className="title">{this.state.apartmentItem.name}</h3>
                    </Col>
                </Row>

                <Table bordered striped>
                    <tbody>
                        {(!this.state.loading && apartmentItem) &&
                            Object.keys(apartmentItem).map(function (key) {
                                if (key === "imageLinks") {
                                    console.log("imageLinks")
                                } else if (key !== 'location') {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key}</th>
                                            <td>{apartmentItem[key]}</td>
                                        </tr>)
                                } else {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key}</th>
                                            <td>{apartmentItem[key].fullAddress}</td>
                                        </tr>)
                                }
                            })
                        }
                    </tbody>
                </Table>

                <MapContainer
                    onClick={this.ckick}
                    location={apartmentItem.location}
                    center={{ lat: apartmentItem.location.latitude, lng: apartmentItem.location.longitude }}
                />


                <button type="button" onClick={() => this.setState({ isOpen: true })}>
                    Open Lightbox
                </button>


                {this.state.photoLoaded &&

                    <CarouselProvider
                        naturalSlideWidth={60}
                        naturalSlideHeight={60}
                        totalSlides={apartmentItem.imageLinks.length}
                        className="sliderContainer"
                    >
                        <Slider>
                            {apartmentItem.imageLinks.map(slide =>
                                <Slide key={slide}
                                    index={slide}
                                >
                                    <img src={slide} className="item" alt={slide} />
                                </Slide>)}
                        </Slider>
                        <ButtonBack className="prev-button">Back</ButtonBack>
                        <ButtonNext className="next-button">Next</ButtonNext>
                    </CarouselProvider>
                }

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