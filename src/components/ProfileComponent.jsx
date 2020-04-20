import React, { Component } from "react"
import { userService } from '../services/userService';
import "../styles/LoginStyle.css"

class ProfileComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        return(
       <div>Profile page</div>
        );
    }
}

export default ProfileComponent;