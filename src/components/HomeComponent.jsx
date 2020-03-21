import React, { Component } from "react"
import RentalCard from './RentalCard'
import { realtyService } from '../services/realtyService';
import "../index.css"

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rentalArray: [],
            user: {},
            loading: false
        }
    }

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            loading: true
        });
        realtyService.getAllRealty().then(array => this.setState({ rentalArray: array.map(item => <RentalCard key={item.id} rental={item} />), loading: false }));
    }

    render() {
        return (
            <div>
                <div className="container ownContainer">
                    {this.state.loading && <em>Loading realty...</em>}

                    <div className="row">{this.state.rentalArray}</div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;