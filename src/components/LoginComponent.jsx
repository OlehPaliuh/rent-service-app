import React, { Component } from "react"
import { Link } from 'react-router-dom';
import { userService } from '../services/userService';
import { Form, Row, Col, FormGroup, Label, Input, NavLink } from 'reactstrap';
import "../styles/LoginStyle.css"

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
            loading: false,
            error: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;

        // stop here if form is invalid
        if (!(username && password)) {
            return;
        }

        this.setState({ loading: true });
        userService.login(username, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from)
                    window.location.reload(false);
                },
                error => this.setState({ error, loading: false })
            );
    }

    render() {
        const { username, password, submitted, error } = this.state;
        return(
            <div className="backgroundClass">
            <div className="login-container ">
            <Form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>

            {error &&
                            <div className={'alert alert-danger'}>{error}</div>
                        }

            <FormGroup className="form-group">
                <Label for="username">Username</Label>
              <Input type="text" className="form-control" name="username" id="username" placeholder="username" value={username} onChange={this.handleChange} />
              {submitted && !username &&
                <div className="alert alert-warning help-block">Username is required</div>
                }
            </FormGroup>

            <FormGroup className="form-group">
                <Label for="password">Password</Label>
              <Input type="password" className="form-control" name="password" id="password" placeholder="password" value={password} onChange={this.handleChange} />
              {submitted && !password &&
                <div className="alert alert-warning help-block">Password is required</div>
                            }
            </FormGroup>

            <FormGroup className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </FormGroup>

            <button className="btn btn-primary btn-block">Submit</button>
           <Row>
           <Col md={6} className="forgot-password text-left" >
                 <NavLink href="/register">Register</NavLink>
            </Col>
            <Col md={6} className="forgot-password text-right">
                 <Link href="#" >Forgot password?</Link>
            </Col>
            </Row>
        </Form>
            </div>
            </div>
        );
    }
}

export default LoginComponent;