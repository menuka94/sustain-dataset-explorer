import React from "react";
import './App.css';
import {Map, TileLayer} from "react-leaflet";

export class LeafletMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.mapbox.com/styles/v1/osmbuildings/cjt9gq35s09051fo7urho3m0f/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib3NtYnVpbGRpbmdzIiwiYSI6IjNldU0tNDAifQ.c5EU_3V8b87xO24tuWil0w'
        };
    }

    render() {
        return (
            <Map center={[40.5, -105.7]} zoom={8}>
                <TileLayer
                    url={this.state.url}
                    attribution='© Map tiles <a href="https://mapbox.com">Mapbox</a>'
                    maxZoom='18'
                    maxNativeZoom='20'
                />
            </Map>
        );
    }
}