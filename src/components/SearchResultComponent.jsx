import React, { Component } from "react"
import { Row, Col } from 'reactstrap'
import ApartmentCard from './apartment/ApartmentCard'
import { searchService } from "../services/searchService";
import "../styles/SearchResult.css"
import "../index.css"

class SearchResultComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apartments: [],
            searchString: new URLSearchParams(this.props.location.search).get("q") || "",
            loading: false,
            error: '',
            isEmpty: false
        }
    }

    componentDidMount() {
        this.props.onOpen(true);
        searchService.search(this.state.searchString)
            .then(result => {

                this.setState({ isEmpty: false });

                const tempApatrments = this.state.apartments;

                result.map(apartment => tempApatrments.push(<ApartmentCard key={apartment.id} apartment={apartment} />));

                if (tempApatrments.length === 0) {
                    this.setState({ isEmpty: true });
                }

                this.setState({ apartments: tempApatrments, loading: false });
            },
                error => this.setState({ error, loading: false })
            );
    }

    fetchSearch = (e) => {
        const { value } = e.target;

        this.setState({ searchString: value });

        if(value === "") {
            return;
        }

        searchService.search(value)
            .then(result => {

                this.setState({ isEmpty: false });

                const tempApatrments = [];

                result.map(apartment => tempApatrments.push(<ApartmentCard key={apartment.id} apartment={apartment} />));

                if (tempApatrments.length === 0) {
                    this.setState({ isEmpty: true });
                }

                this.setState({ apartments: tempApatrments, loading: false });
            },
                error => this.setState({ error, loading: false })
            );
    }

    componentWillUnmount() {
        this.props.onOpen(false);
    }


    handleSearchStringChanged = e => {
        const { value } = e.target;

        this.setState({ searchString: value });
    }

    render() {

        const { searchString } = this.state;

        return (
            <div>

                <div className="searchContainer">
                    <label className="search-label" htmlFor="search-input">
                        <input
                            type="text"
                            className="inputSearch"
                            value={searchString}
                            onChange={this.fetchSearch}
                            id="search-input"
                            placeholder="Search..."
                        />
                    </label>

                </div>

                <div className="container ownContainer">

                    {this.state.loading && <em>Loading apatments...</em>}

                    {this.state.isEmpty && 
                    <p>Search result for "<span className="search-result">{this.state.searchString}</span>" is empty</p>}

                    <Row>
                        {this.state.apartments.map(apartment => <Col md={4}> {apartment} </Col>)}
                    </Row>
                </div>
            </div>
        )
    }
}

export default SearchResultComponent;