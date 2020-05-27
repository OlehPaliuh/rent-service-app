import React from "react"
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { apartmentService } from '../services/apartmentService';
import { geocodeService } from '../googleMapService/geocodeService';
import { imageService } from '../services/imageService';
import MapContainer from '../googleMapService/MapContainer';
import SuggestionListComponent from '../googleMapService/SuggestionListComponent';
import Geocode from "react-geocode";
import { ListGroup } from 'reactstrap';
import { Checkbox } from "@material-ui/core";
import Dropzone from 'react-dropzone'
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
                price: 1,
                totalArea: 1,
                livingArea: 1,
                allowPets: false,
                buildingType: "NEW_BUILDING",
                floor: 1,
                tags: ''
            },
            apartmentLocation: {
                latitude: 49.84338737581792,
                longitude: 24.02659943370216,
                fullAddress: '',
            },
            suggestions: [],
            files: [],
            fileLinks: [],
            filesLoaded: false,
            submitted: false,
            loading: false,
            error: '',
            photoError: false,
            photoErrorMessage: ""
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

    handleCheckboxChange = e => {
        const { name, value } = e.target;

        const apartmentObj = this.state.apartment;

        for (let [keyObj] of Object.entries(apartmentObj)) {
            if (name === keyObj) {
                apartmentObj[keyObj] = !apartmentObj[keyObj];
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
            apartmentLocation: apartmentLocationObj
        });
    }

    handleCancel = (e) => {
        e.preventDefault();

        const { apartment } = this.state;

         this.state.fileLinks.map(item => {imageService.deleteImage(item)
            .then(response => {
                this.setState({ fileLinks: [], files: [] });
            }, error => {
                console.error("Failed delete image")
            });});

        if (apartment.title || apartment.description || apartment.address) {
            if(!window.confirm('Your data wil be lost, do you want to continue?')) {
                return;
            } 
        }
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        this.props.history.push(from);
    }

    handleMapChange = location => {
        Geocode.setApiKey(API_KEY);
        Geocode.setLanguage("en");
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
        const { apartment, apartmentLocation, fileLinks } = this.state;

        // stop here if form is invalid
        if (!(apartment.title && apartment.description && apartment.price
            && apartment.livingArea && apartment.totalArea && apartment.numberOfRooms && apartmentLocation.fullAddress)) {
            this.setState({ error: "Form is not filled", loading: false })
            return;
        }

        if (apartment.price < 1 || apartment.livingArea < 1 || apartment.numberOfRooms < 1) {
            this.setState({ error: "Fields should be positive and less than 1 000 000", loading: false })
            return;
        }

        this.setState({ loading: true });

        apartmentService.createApatment(apartment, apartmentLocation, fileLinks)
            .then(
                apartment => {
                    const { from } = this.props.location.state || { from: { pathname: `../../apartment/${apartment.id}` } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    handleImageUpload = () => {
        imageService.uploadImage(this.state.files);
    }

    handleDrop = (filesToSate) => {

        this.setState({ photoError: false, photoErrorMessage: "" })

        const { files } = this.state;
        const { fileLinks } = this.state;

        console.log(files.length);
        if ((files.length + filesToSate.length) < 8) {
            filesToSate.map(file => files.push(file));
            this.setState({ files: files });

            imageService.uploadImage(filesToSate)
                .then(data => {
                    data.map(link => fileLinks.push(link))
                    this.setState({ fileLinks: fileLinks });
                });
        } else {
            this.setState({ photoError: true, photoErrorMessage: "You can load only 7 photos, size less 3 MB" });
            return;
        }
    }

    handleImageDelete = (e) => {
        const { value } = e.target;
        console.log(value)
        const { fileLinks } = this.state;
        imageService.deleteImage(value)
            .then(response => {
                console.error(response)
                const resultFiles = [];
                fileLinks.map(item => {
                    if (item !== value)
                        resultFiles.push(item);
                })
                this.setState({ fileLinks: resultFiles });
            }, error => {
                console.error("Failed delete image")
            });
    }

    handleAutocompleteClick = suggestion => {
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

        const { photoError, photoErrorMessage } = this.state;

        const thumbs = this.state.fileLinks.map(link => (
            <div className="thumb" key={link}>
                <div className="thumbInner">
                    <div class="img-wraps">
                        <Button key={link} color="danger" size="sm" className="closes" value={link} onClick={this.handleImageDelete}>&times;</Button>
                        <img
                            alt="Loaded"
                            src={link}
                            className="img"
                        />
                    </div>
                </div>
            </div>
        ))

        const { apartment, apartmentLocation, error, submitted } = this.state;

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
                            step="1"
                            min="1"
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
                        <Label className="labelFont" for="Living area"> Living area square</Label>
                        <Input
                            type="number"
                            step="1"
                            min="1"
                            name="livingArea"
                            id="livingArea"
                            placeholder="Enter living area square"
                            value={apartment.livingArea}
                            onChange={this.handleChange} />
                        {submitted && !apartment.livingArea &&
                            <div className="alert alert-warning help-block">Living area square is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="totalArea">Total area square</Label>
                        <Input
                            type="number"
                            step="1"
                            min="1"
                            name="totalArea"
                            id="totalArea"
                            placeholder="Enter total area square"
                            value={apartment.totalArea}
                            onChange={this.handleChange} />
                        {submitted && !apartment.totalArea &&
                            <div className="alert alert-warning help-block">Total area square is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="Floor number">Floor number</Label>
                        <Input
                            type="number"
                            step="1"
                            min="1"
                            name="floor"
                            id="floor"
                            placeholder="Enter floor number"
                            value={apartment.floor}
                            onChange={this.handleChange} />
                        {submitted && !apartment.floor &&
                            <div className="alert alert-warning help-block">Tloor number is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col ms={10} lg={10}>
                                <Label className="labelFont" for="buildingType">Select building type</Label>
                                <Input
                                    type="select"
                                    name="buildingType"
                                    id="buildingType"
                                    value={apartment.buildingType}
                                    onChange={this.handleChange}
                                >
                                    <option value="NEW_BUILDING">New building</option>
                                    <option value="OLD_BUILDING">Old building</option>
                                </Input>
                            </Col>
                            <Col ms={2} lg={2} className="allow-pets-check ">
                                <Label className="labelFont" for="allowPets">Allow pets</Label>
                                <Checkbox
                                    id="allowPets"
                                    name="allowPets"
                                    color="primary"
                                    checked={apartment.allowPets}
                                    onChange={this.handleCheckboxChange}
                                />
                            </Col>
                            {submitted && !apartment.buildingType &&
                                <div className="alert alert-warning help-block">Building type is required</div>
                            }
                        </Row>
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
                        <Label className="labelFont" for="photos">Photos</Label>
                        <Dropzone
                            onChangeStatus={this.handleChangeStatus}
                            onDrop={this.handleDrop}
                            maxFiles={7}
                            inputContent="Drop 7 Files"
                            inputWithFilesContent={files => `${7 - files.length} more`}
                            submitButtonDisabled={files => files.length < 7}
                        >
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps({ className: "dropzone" })}>
                                    <input {...getInputProps()} />
                                    <p>Drag'n'drop files, or click to select files</p>
                                </div>
                            )}
                        </Dropzone>
                        <Input type="file"
                            name="photos"
                            id="photos"
                            hidden
                        />
                        <aside className="thumbsContainer">
                            {thumbs}
                        </aside>

                        {photoError &&
                            <div className={'alert alert-danger'}>{photoErrorMessage}</div>
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
                            <Button color="red" type="reset" className="btn btn-danger btn-block cancelButton" onClick={this.handleCancel} >Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

export default CreateApatmentComponent;