import React, { Component } from "react"
import ApartmentCard from './apartment/ApartmentCard'
import FilteringComponent from './filter/FilteringComponent'
import { apartmentService } from '../services/apartmentService';
import { Link } from 'react-router-dom';
import { Col, Row, Input, Label } from 'reactstrap';
import "../index.css"

class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: JSON.parse(localStorage.getItem('filter')) || {},
            sortBy: JSON.parse(localStorage.getItem('sortBy')) || "DISABLE",
            filterSet: JSON.parse(localStorage.getItem('filterSet')) || false,
            apatmentArray: [],
            user: {},
            loading: false,
        }
    }

    componentWillMount() {
        console.log("componentWillMount")
        console.log(this.state.filter)
        console.log(this.state.filterSet)
        if(this.state.filter && this.state.filterSet) {
            this.handleFilteringApartments()
        } else {
            this.fetchAllApartments()
        }
    }

    fetchAllApartments = () => {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            loading: true
        });

        console.log("all")

        apartmentService.getAllApatments(this.state.sortBy)
            .then(array => this.setState({ apatmentArray: array.map(item => <ApartmentCard key={item.id} apartment={item} />), loading: false }));
    }

    handleFilteringApartments = () => {
        this.setState({
            loading: true
        });

        console.log("filter")

        apartmentService.getFilteredApartment(this.state.filter, this.state.sortBy)
            .then(response => {
                this.setState({apatmentArray: response.map(item => <ApartmentCard key={item.id} apartment={item} />), loading: false});
            })
    } 

    handleCheckboxChange = async (name) => {
        const { filter } = this.state;
        filter[name] = !filter[name];
        await this.setState({ filter: filter, filterSet: true })
        localStorage.setItem('filter', JSON.stringify(filter));
        this.setState({filterSet: true});
        localStorage.setItem('filterSet', JSON.stringify(true));
    }

    handleInputChange = (name, value) => {
        const { filter } = this.state; 
        filter[name] = value;
        this.setState({filter: filter, filterSet: true });
        localStorage.setItem('filter', JSON.stringify(filter));
        this.setState({filterSet: true});
        localStorage.setItem('filterSet', JSON.stringify(true));
    }

    delay = ms => new Promise(res => setTimeout(res, ms));

    handleResteFilter = async () => {
        this.setState({filter: {}, filterSet: false});
        localStorage.removeItem('filter');
        localStorage.setItem('filterSet', JSON.stringify(false));
        await this.delay(200);
        this.componentWillMount();
        // this.fetchAllApartments()
    }

    onSortChange = async (e) => {
        const { value } = e.target;
        this.setState({sortBy: value});
        localStorage.setItem('sortBy', JSON.stringify(value));
        await this.delay(200);
        this.componentWillMount();
        // if(value !== "DISABLE") {
        //     apartmentService.getSortedApartments(value)
        //         .then(response => {
        //             this.setState({apatmentArray: response.map(item => <ApartmentCard key={item.id} apartment={item} />), loading: false});
        //      });
        // } else {
        //     this.fetchAllApartments();
        // }
        // console.log(value);
    }

    render() {
        const { sortBy } = this.state;
        return (
            <div className="container ownContainer">
                        <FilteringComponent 
                        onSubmitFiltering={this.handleFilteringApartments} 
                        filter={this.state.filter} 
                        handleCheckboxChange={this.handleCheckboxChange}
                        handleInputChange={this.handleInputChange}
                        onReset={this.handleResteFilter}/>
              <Row >
                <Col ms={2} lg={1} className="filter-comp">
                <Label className="sort-label">Sort By: </Label> 
                  </Col>
                  <Col ms={7} lg={9}>
                            <Input
                                    type="select"
                                    name="sort"
                                    id="sort"
                                    value={sortBy}
                                    onChange={this.onSortChange}
                                >
                                    <option value="DISABLE">disable</option>
                                    <option value="PRICE_ASD">price ascending</option>
                                    <option value="PRICE_DESC">price descending</option>
                                    <option value="DATE_DESC">date - first old apartments</option>
                                    <option value="DATE_ASD">date - first new apartments</option>
                                </Input>
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