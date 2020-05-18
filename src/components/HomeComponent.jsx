import React, { Component } from "react"
import ApartmentCard from './apartment/ApartmentCard'
import { apartmentService } from '../services/apartmentService';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import "../index.css"

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            apatmentArray: [],
            user: {},
            loading: false,
        }
    }

    componentWillMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            loading: true
        });
        apartmentService.getAllApatments().then(array => this.setState({ apatmentArray: array.map(item => <ApartmentCard key={item.id} apartment={item} />), loading: false }));
    }



    render() {
        return (
            <div className="container ownContainer">
                {localStorage.getItem('user') &&
                    <Link exect className="btn btn-primary" to={`/apartment/create/`} > + ADD APARTMENT</Link>
                }

                <div className="container ownContainer">
                    {this.state.loading && <em>Loading apatments...</em>}

                    <Row>
                            {this.state.apatmentArray.map(apartment =>   <Col md={4}> {apartment} </Col>)}
                    </Row>
                </div>
            </div>
        )
    }
}

export default HomeComponent;