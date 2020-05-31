import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCenter: {
        lat: 49.84338737581792,
        lng: 24.02659943370216
      }
    }
  }

  componentWillMount() {
    if(!this.props.isCreatePage) {
    this.setState({initialCenter: this.props.center})
    }
  }

  render() {
    const { initialCenter } = this.state;

    return (
      <div className="container">
        <Map
          className="map mapStyle"
          google={this.props.google}
          zoom={9}
          center={this.props.center || this.state.initialCenter}
          onClick={(t, map, c) => {
            if (this.props.isCreatePage) {
              this.props.onClick(c.latLng);
            }
          }}
          onChange={this.handleChange}
          initialCenter={initialCenter}>
          <Marker 
            position={{
              lat: this.props.location.latitude,
              lng: this.props.location.longitude
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
