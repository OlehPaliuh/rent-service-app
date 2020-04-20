import React, { Component } from "react"
import ApartmentCard from './ApartmentCard'
import { apartmentService } from '../services/apartmentService';
import { Link } from 'react-router-dom';
import "../index.css"

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apatmentArray: [],
            user: {},
            loading: false
        }
    }

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            loading: true
        });
        apartmentService.getAllApatments().then(array => this.setState({ apatmentArray: array.map(item => <ApartmentCard key={item.id} rental={item} />), loading: false }));
    }

    render() {
        return (
            <div className="container ownContainer">
                {localStorage.getItem('user') &&
                    <Link className="btn btn-primary" to={`apartment/create/`}>Create Appartment</Link>
                }
                <div className="container ownContainer">
                    {this.state.loading && <em>Loading apatments...</em>}

                    <div className="row">{this.state.apatmentArray}</div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;