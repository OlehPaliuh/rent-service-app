import React, { Component } from "react"
import ApartmentCard from './apartment/ApartmentCard'
import FilteringComponent from './filter/FilteringComponent'
import { apartmentService } from '../services/apartmentService';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import "../index.css"

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: JSON.parse(localStorage.getItem('filter')) || {},
            apatmentArray: [],
            user: {},
            loading: false,
        }
    }

    componentWillMount() {
        this.fetchAllApartments()
    }

    fetchAllApartments = () => {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            loading: true
        });
        apartmentService.getAllApatments()
            .then(array => this.setState({ apatmentArray: array.map(item => <ApartmentCard key={item.id} apartment={item} />), loading: false }));
    }

    handleFilteringApartments = () => {
        this.setState({
            loading: true
        });

        apartmentService.getFilteredApartment(this.state.filter)
            .then(response => {
                this.setState({apatmentArray: response.map(item => <ApartmentCard key={item.id} apartment={item} />), loading: false});
            })
    } 

    handleCheckboxChange = async (name) => {
        console.log(name);
        const { filter } = this.state;
        filter[name] = !filter[name];
        await this.setState({ filter: filter })
        localStorage.setItem('filter', JSON.stringify(filter));
    }

    handleInputChange = (name, value) => {
        const { filter } = this.state; 
        filter[name] = value;
        this.setState({filter: filter});
        localStorage.setItem('filter', JSON.stringify(filter));
    }

    handleResteFilter = () => {
        this.setState({filter: {}});
        localStorage.removeItem('filter');
        this.fetchAllApartments()
    }

    render() {
        return (
            <div className="container ownContainer">
                        <FilteringComponent 
                        onSubmitFiltering={this.handleFilteringApartments} 
                        filter={this.state.filter} 
                        handleCheckboxChange={this.handleCheckboxChange}
                        handleInputChange={this.handleInputChange}
                        onReset={this.handleResteFilter}/>
              <Row >
                  <Col ms={9} lg={10} className="filter-comp">
                  </Col>
                  <Col ms={3} lg={2} className="add-apartment">
                  {localStorage.getItem('user') &&
                    <Link exect className="add-apartment btn btn-primary" to={`/apartment/create/`} > + Add Apartment</Link>
                }
                  </Col>
              </Row>
               

                <div className="container ownContainer2">
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