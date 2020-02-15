import React, { Component } from "react"
import RentalCard from './RentalCard'

class HomeComponent extends Component {

    constructor() {
        super();
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
                rentalArray: data
              })
            });
    }

    render() {
        return (
            <div className="container" style={{marginTop: "20px"}}>
                <RentalCard rental={this.state.data}/>
            </div>
        )
    }
}

export default HomeComponent;