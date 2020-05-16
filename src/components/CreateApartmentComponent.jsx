import React from "react"
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { apartmentService } from '../services/apartmentService';
import { geocodeService } from '../googleMapService/geocodeService';
import { Link } from 'react-router-dom';
import MapContainer from '../googleMapService/MapContainer';
import SuggestionListComponent from '../googleMapService/SuggestionListComponent';
import Geocode from "react-geocode";
import { ListGroup } from 'reactstrap';
import "../index.css"
import "../styles/LoginStyle.css"
import "../styles/CreateApartment.css"

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

class CreateApatmentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: {
                title: '',
                description: '',
                numberOfRooms: 1,
                price: 0,
                area: 1,
                tags: ''
            },
            apartmentLocation: {
                latitude: 49.84338737581792,
                longitude: 24.02659943370216,
                fullAddress: '',
            },
            suggestions: [],
            addressForLooking: '',
            submitted: false,
            loading: false,
            error: ''
        }
    }

    handleChange = e => {
        const { name, value } = e.target;

        const apartmentObj = this.state.apartment;

        for (let [keyObj] of Object.entries(apartmentObj)) {
            if (name === keyObj) {
                apartmentObj[keyObj] = value;
            }
        }

        this.setState({
            apartment: apartmentObj
        });
    }

    updateLocationObj = (name, value) => {

        const apartmentLocationObj = this.state.apartmentLocation;

        for (let [keyObj] of Object.entries(apartmentLocationObj)) {
            if (name === keyObj) {
                apartmentLocationObj[keyObj] = value;
            }
        }

        this.setState({
            apartment: apartmentLocationObj
        });
    }

    handleCancel = e => {
        e.preventDefault();

        const { apartment } = this.state;

        if (apartment.title || apartment.description || apartment.address) {
            // this.setState({ error: "Form is not filled", loading: false })
            window.confirm('Are you sure you wish to delete this item?')
            return;
        }
    }

    handleMapChange = location => {
        Geocode.setApiKey(API_KEY);
        Geocode.setLanguage("uk");
        Geocode.setRegion("ua");
        Geocode.enableDebug();
        Geocode.fromLatLng(location.lat(), location.lng()).then(
            response => {
                const locationObj = response.results[0].address_components.reduce((seed, { long_name, types }) => {
                    types.forEach(t => {
                        seed[t] = long_name;
                    });
                    return seed;
                }, {});

                locationObj['fullAddress'] = response.results[0].formatted_address;
                locationObj['latitude'] = location.lat();
                locationObj['longitude'] = location.lng();

                this.setState({
                    apartmentLocation: locationObj
                })
            },
            error => {
                console.error(error);
            }
        );
    }

    handleAddressInputChanged = async (e) => {
        const { value } = e.target;

        this.setState({ suggestions: [], loading: true });

        this.updateLocationObj("fullAddress", value);

        geocodeService.getAutocompleteAdress(value)
            .then(data => this.setState({ suggestions: data, loading: false }));
    }

    handleSubmit = e => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { apartment, apartmentLocation } = this.state;

        // stop here if form is invalid
        if (!(apartment.title && apartment.description && apartment.price
            && apartment.area && apartment.numberOfRooms && apartmentLocation.fullAddress)) {
            // this.setState({ error: "Form is not filled", loading: false })
            return;
        }

        this.setState({ loading: true });

        apartmentService.createApatment(apartment, apartmentLocation)
            .then(
                apartment => {
                    const { from } = this.props.location.state || { from: { pathname: `../../apartment/${apartment.id}` } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    handleAutocompleteClick = suggestion => {
        console.log(suggestion.place_id);
        this.setState({ suggestions: [] });
        geocodeService.getPlaceByPlaceId(suggestion.place_id)
            .then(response => {
                const locationObj = response.result.address_components.reduce((seed, { long_name, types }) => {
                    types.forEach(t => {
                        seed[t] = long_name;
                    });
                    return seed;
                }, {});

                locationObj['fullAddress'] = response.result.formatted_address;
                locationObj['latitude'] = response.result.geometry.location.lat;
                locationObj['longitude'] = response.result.geometry.location.lng;

                this.setState({
                    apartmentLocation: locationObj
                })
            })
    }

    render() {

        const selectOptions = function () {
            var options = [];
            for (var i = 1; i < 11; i++) {
                options.push(<option value={i} key={i}>{i}</option>);
            }
            return options;
        }

        const { apartment, apartmentLocation, error, submitted } = this.state;

        const { suggestions, addressForLooking } = this.state;

        return (
            <div className=" create-apartment-container ownContainer">

                <h3 className="title">Create apartment</h3>

                {error &&
                    <div className={'alert alert-danger'}>{error}</div>
                }
                <Form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
                    <FormGroup>
                        <Label className="labelFont" for="title">Title</Label>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter name for apartment"
                            value={apartment.title}
                            onChange={this.handleChange} />
                        {submitted && !apartment.title &&
                            <div className="alert alert-warning help-block">Title is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="description">Description</Label>
                        <Input
                            type="textarea"
                            name="description"
                            id="description"
                            placeholder="Type a description"
                            value={apartment.description}
                            onChange={this.handleChange} />
                        {submitted && !apartment.description &&
                            <div className="alert alert-warning help-block">Description is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="numberOfRooms">Number of rooms</Label>
                        <Input
                            type="select"
                            name="numberOfRooms"
                            id="numberOfRooms"
                            value={apartment.numberOfRooms}
                            onChange={this.handleChange} >
                            {selectOptions().map(option => option)}
                        </Input>
                        {submitted && !apartment.numberOfRooms &&
                            <div className="alert alert-warning help-block">Bumber of rooms is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="price">Price</Label>
                        <Input
                            type="number"
                            step="0.01"
                            name="price"
                            id="price"
                            placeholder="Enter price"
                            value={apartment.price}
                            onChange={this.handleChange} />
                        {submitted && !apartment.price &&
                            <div className="alert alert-warning help-block">Price is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="area">Area square</Label>
                        <Input
                            type="number"
                            step="0.01"
                            name="area"
                            id="area"
                            placeholder="Enter area square"
                            value={apartment.area}
                            onChange={this.handleChange} />
                        {submitted && !apartment.area &&
                            <div className="alert alert-warning help-block">Area square is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="fullAddress">Address</Label>
                        <Input
                            type="text"
                            name="fullAddress"
                            id="fullAddress"
                            placeholder="Enter apartment address"
                            value={apartmentLocation.fullAddress}
                            onChange={this.handleAddressInputChanged}
                        >
                        </Input>
                        <div className="autocomplete-dropdown-container">
                            {this.state.loading && <div>Loading...</div>}
                            <ListGroup>
                                {this.state.suggestions.map(suggestion => <SuggestionListComponent
                                    key={suggestion.id}
                                    value={suggestion}
                                    onClick={this.handleAutocompleteClick}
                                    item={suggestion}
                                />)}
                            </ListGroup>
                        </div>
                        <MapContainer
                            onClick={this.handleMapChange}
                            location={this.state.apartmentLocation}
                        />
                        {submitted && !apartmentLocation.fullAddress &&
                            <div className="alert alert-warning help-block">Address is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="tags">Tags</Label>
                        <Input
                            type="tags"
                            name="tags"
                            id="tags"
                            value={apartment.tags}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <Row>
                        <Col md={6}>
                            <Button color="blue" type="submit" className="btn btn-primary btn-block submitButton">Submit</Button>
                        </Col>
                        <Col md={6}>
                            <Link color="red" type="reset" className="btn btn-danger btn-block cancelButton" to={`/`}>Cancel</Link>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default CreateApatmentComponent;