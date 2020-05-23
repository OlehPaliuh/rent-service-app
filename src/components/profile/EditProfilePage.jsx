import React, { Component } from "react";
import { Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { userService } from "../../services/userService";
import "../../styles/ProfileCard.css"

class EditProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            account: {},
            realData: {},
            loaded: false,
            submitted: false,
            success: false,
            error: "",
        }
    }

    componentDidMount() {
        this.fetchAccountDetails();
    }

    fetchAccountDetails = () => {
        userService.getUserDetails(this.state.id)
            .then(result => {
                this.setState({ account: result, realData: result, loaded: true });
            },
                error => this.setState({ error, loaded: true })
            );
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        const { account } = this.state;
        account[name] = value;
        this.setState({ account: account });
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    handleCancel = (e) => {
        e.preventDefault();

        const { account, realData } = this.state;

        if (realData.firstName !== account.firstName || realData.lastName !== account.lastName 
            || realData.email !== account.email || realData.phoneNumber !== account.phoneNumber) {
            if(!window.confirm('Your data wil be lost, do you want to continue?')) {
                return;
            } 
        }
        const { from } = this.props.location.state || { from: { pathname: "/profile" } };
        this.props.history.push(from);
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        this.setState({ submitted: true });
        const { account } = this.state;

        // stop here if form is invalid
        if (!(account.firstName && account.lastName && account.email && account.phoneNumber)) {
            this.setState({ error: "Form is not filled"})
            return;
        }

        userService.updateAccount(account)
            .then(apartment => {
                    this.setState({success: "Profile successfully updated"})
                },
                error => this.setState({ error, loading: false })
            );

        await this.delay(1500);

        const { from } = this.props.location.state || { from: { pathname: `../profile` } };
        this.props.history.push(from);
    }

    render() {

        const { account, submitted, error, success } = this.state;

        return (
            <div className=" create-apartment-container ownContainer">

                <h3 className="title">Edit profile</h3>

                {success &&
                    <div className={'alert alert-success'}>{success}</div>
                }

                {error &&
                    <div className={'alert alert-danger'}>{error}</div>
                }
                <Form onSubmit={this.handleSubmit} onReset={this.handleCancel}>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Label className="labelFont" for="firstName">First Name</Label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    placeholder="Enter first name"
                                    value={account.firstName}
                                    onChange={this.handleChange} />
                                {submitted && !account.lastName &&
                                    <div className="alert alert-warning help-block">First Name is required</div>
                                }
                            </Col>
                            <Col>
                            <Label className="labelFont" for="lastName">Last Name</Label>
                        <Input
                            type="text"
                            name="lastName"
                            id="title"
                            placeholder="Enter last name"
                            value={account.lastName}
                            onChange={this.handleChange} />
                        {submitted && !account.lastName &&
                            <div className="alert alert-warning help-block">Last Name is required</div>
                        }
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Type a email"
                            value={account.email}
                            onChange={this.handleChange} />
                        {submitted && !account.email &&
                            <div className="alert alert-warning help-block">Email is required</div>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Label className="labelFont" for="phoneNumber">Prone number</Label>
                        <Input
                            type="phone"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Type a phone number"
                            value={account.phoneNumber}
                            onChange={this.handleChange} />
                        {submitted && !account.phoneNumber &&
                            <div className="alert alert-warning help-block">Phone number is required</div>
                        }
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

export default EditProfilePage;