import React from "react"
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { apartmentService } from '../services/apartmentService';
import { Link } from 'react-router-dom';
import "../index.css"
import "../styles/LoginStyle.css"

class CreateApatmentComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apartment: {
                name1: '',
                description: '',
                numberOfRooms: 1,
                price: 0,
                area: 1,
                address: '',
                tags: ''
            },
            submitted: false,
            loading: false,
            error: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        console.log(name + "  " + value);
        this.setState(prevState => ({
            apartment: {
                name1: prevState.apartment.name1,
                description: prevState.apartment.description,
                numberOfRooms: prevState.apartment.numberOfRooms,
                price: prevState.apartment.price,
                area: prevState.apartment.area,
                address: prevState.apartment.address,
                tags: prevState.apartment.tags,
                [name]: value
            }
        }));
    }

    // handleSelectNumberChange(e) {
    //     const { name, value } = e.target;
    //     console.log(name + "  " + value);
    //     this.setState(prevState => ({
    //         apartment: {
    //             name1: prevState.apartment.name,
    //             description: prevState.apartment.description,
    //             numberOfRooms: prevState.apartment.numberOfRooms,
    //             price: prevState.apartment.price,
    //             areaSquare: prevState.apartment.areaSquare,
    //             address: prevState.apartment.address,
    //             tags: prevState.apartment.tags,
    //             [name]: value
    //         }
    //     }));
    // }

    handleCancel(e) {
        e.preventDefault();

        const { apartment } = this.state;

        if (apartment.name1 || apartment.description || apartment.address) {
            // this.setState({ error: "Form is not filled", loading: false })
            window.confirm('Are you sure you wish to delete this item?')
            return;
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { apartment } = this.state;

        // stop here if form is invalid
        if (!(apartment.name1 && apartment.description && apartment.price
            && apartment.area && apartment.numberOfRooms && apartment.address)) {
            // this.setState({ error: "Form is not filled", loading: false })
            return;
        }

        this.setState({ loading: true });
        apartmentService.createApatment(apartment)
            .then(
                apartment => {
                    const { from } = this.props.location.state || { from: { pathname: `../../apartment/${apartment.id}` } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {

        const selectOptions = function () {
            var options = [];
            for (var i = 1; i < 11; i++) {
                options.push(<option value={i} key={i}>{i}</option>);
            }
            return options;
        }

        const { apartment, error, submitted } = this.state;

        return (
            <div className=" create-apartment-container ownContainer">

                <h3 className="title">Create apartment</h3>

                {error &&
                    <div className={'alert alert-danger'}>{error}</div>
                }
                <Form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
                    <FormGroup>
                        <Label for="name1">Name</Label>
                        <Input
                            type="text"
                            name="name1"
                            id="name1"
                            placeholder="Enter name for apartment"
                            value={apartment.name1}
                            onChange={this.handleChange} />
                        {submitted && !apartment.name1 &&
                            <div className="alert alert-warning help-block">Name is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
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
                        <Label for="numberOfRooms">Number of rooms</Label>
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
                        <Label for="price">Price</Label>
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
                        <Label for="area">Area square</Label>
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
                        <Label for="address">Address</Label>
                        <Input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter apartment address"
                            value={apartment.address}
                            onChange={this.handleChange} />
                        {submitted && !apartment.address &&
                            <div className="alert alert-warning help-block">Address is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label for="tags">Tags</Label>
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