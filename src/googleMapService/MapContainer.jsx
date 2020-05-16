import React, { Component } from 'react';
import { Map, GoogleApiWrapper, GoogleMap, Marker } from 'google-maps-react';

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

export class MapContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Map
          className="map mapStyle"
          google={this.props.google}
          zoom={9}
          onClick={(t, map, c) => {  this.props.onClick(c.latLng); }}
          initialCenter={{ lat: 49.84338737581792, lng: 24.02659943370216 }}>
          <Marker
            position={{
              lat: this.props.location.latitude,
              lng: this.props.location.longitude
            }}
            onClick={() => console.log("You clicked me!")}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: API_KEY
})(MapContainer);
