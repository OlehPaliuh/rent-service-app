import React from "react"
import "../index.css"

class RentalPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            rentalItem: {}
        }
    }

    componentWillMount() {
        this.fetchRealtyById()
    }

    fetchRealtyById = () => {
        fetch(`/api/realty/${this.state.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    rentalItem: data
                })
            });
    };

    render() {
        return (
            <div className="container ownContainer">
                <div>{this.state.rentalItem.id}</div>
                <div>{this.state.rentalItem.address}</div>
                <div>{this.state.rentalItem.description}</div>
            </div>
        )
    }
}

export default RentalPage;