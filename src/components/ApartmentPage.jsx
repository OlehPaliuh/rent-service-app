import React from "react"
import "../index.css"
import { Col, Row, Table } from "reactstrap";
import MapContainer from '../googleMapService/MapContainer';

const Location = {
    administrativeArea: String,
    country: String,
    city: String,
    sublocality: String,
    route: String,
    streetNumber: String,
    political: String,
    postal_code: String,
    fullAddress: String,
    latitude: String,
    longitude: String
}

class ApartmentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            apartmentItem: {
                location: Location
            },
            loading: false
        }

    }

    componentDidMount() {
        this.fetchRealtyById()
    }

    ckick = () => {
        console.log("click");
    }

    fetchRealtyById = () => {
        console.log(this.state.id)
        fetch(`/api/apartment/${this.state.id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    apartmentItem: data,
                    loading: false
                })
            });
    };

    render() {
        
        if (this.state.loading) {
            return <em>Loading apatment...</em>
        }

        const { apartmentItem } = this.state

        return (
            <div className="container ownContainer">

                <Row>
                    <Col>
                        <h3 className="title">{this.state.apartmentItem.name}</h3>
                    </Col>
                </Row>

                <Table bordered striped>
                    <tbody>
                        {(!this.state.loading && apartmentItem) &&
                            Object.keys(apartmentItem).map(function (key) {
                                if (key !== 'location') {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key}</th>
                                            <td>{apartmentItem[key]}</td>
                                        </tr>)
                                } else {
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key}</th>
                                            <td>{apartmentItem[key].fullAddress}</td>
                                        </tr>)
                                }
                            })
                        }
                    </tbody>
                </Table>
                {console.log(apartmentItem.location)}
                <MapContainer onClick={this.ckick} location={apartmentItem.location} />
            </div>
        )
    }
}

export default ApartmentPage;