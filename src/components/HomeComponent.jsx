import React, { Component } from "react"
import RentalCard from './RentalCard'
import Navbar from './Navbar';


class HomeComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rentalArray: []
        }
    }

    componentWillMount() {
        this.fetchRealty()
    }

    fetchRealty = () => {
        fetch("/api/realty/all/")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    rentalArray: data.map(item => <RentalCard key={item.id} rental={item} />)
                })
            });
    };

    render() {
        return (
            <div>
                <Navbar />
                <div className="container" style={{ marginTop: "10px" }}>
                    <div className="row">{this.state.rentalArray}</div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;