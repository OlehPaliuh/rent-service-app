import React, { Component } from "react"
import { Col, Row, NavLink, Form, FormGroup, Label, Input } from 'reactstrap';
import { userService } from '../services/userService';
import "../styles/LoginStyle.css"

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      submitted: false,
      loading: false,
      error: false,
      message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      user: {
        firstName: prevState.user.firstName,
        lastName: prevState.user.lastName,
        email: prevState.user.email,
        password: prevState.user.password,
        username: prevState.user.username,
        phoneNumber: prevState.user.phoneNumber,
        [name]: value
      }
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;

    // stop here if form is invalid
    if (!(user.username && user.password && user.email
      && user.firstName && user.lastName && user.phoneNumber)) {
      return;
    }

    this.setState({ loading: true });
    userService.register(user)
      .then(
        user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
        },
        error => {
          this.setState({ error: false, message: "Registration error", loading: false })
        }
      );
  }

  render() {
    const { user, error, submitted, message } = this.state;

    return (
      <div className="backgroundClass">
        <div className="register-container">
          <Form onSubmit={this.handleSubmit}>
            <h3 className="title">Sign up</h3>
            {error &&
              <div className={'alert alert-danger'}>{message}</div>
            }
            <Row >
              <Col md={6}>
                <FormGroup>
                  <Label className="labelFont" for="firstName">First Name</Label>
                  <Input type="text" 
                  name="firstName" 
                  id="user.firstName" 
                  placeholder="First Name" 
                  value={user.firstName} 
                  onChange={this.handleChange} />
                  {submitted && !user.firstName &&
                    <div className="alert alert-warning help-block">First Name is required</div>
                  }
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="labelFont" for="lastName">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name" 
                    value={user.lastName} 
                    onChange={this.handleChange} />
                  {submitted && !user.lastName &&
                    <div className="alert alert-warning help-block">Last Name is required</div>
                  }
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label className="labelFont" for="username">Username</Label>
              <Input type="text" name="username" id="username" placeholder="username" value={user.username} onChange={this.handleChange} />
              {submitted && !user.username &&
                <div className="alert alert-warning help-block">Username is required</div>
              }
            </FormGroup>
            <FormGroup>
              <Label className="labelFont" for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="username@gmail.com" value={user.email} onChange={this.handleChange} />
              {submitted && !user.email &&
                <div className="alert alert-warning help-block">Email is required</div>
              }
            </FormGroup>
            <FormGroup>
              <Label className="labelFont" for="phoneNumber">Phone Number</Label>
              <Input type="phone" name="phoneNumber" id="phoneNumber" placeholder="+380635475138" value={user.phoneNumber} onChange={this.handleChange} />
              {submitted && !user.phoneNumber &&
                <div className="alert alert-warning help-block">Phone number is required</div>
              }
            </FormGroup>
            <FormGroup>
              <Label className="labelFont" for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="password" value={user.password} onChange={this.handleChange} />
              {submitted && !user.password &&
                <div className="alert alert-warning help-block">Password is required</div>
              }
            </FormGroup>
            <button className="btn btn-primary btn-block labelFont">Register</button>
            <p className="forgot-password text-right" >
              <NavLink href="/login">Already have an account? Sign in</NavLink>
            </p>
          </Form>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;