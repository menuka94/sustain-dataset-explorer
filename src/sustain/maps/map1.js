import React from "react";
import {Map, TileLayer} from "react-leaflet";
import {makeGeoJson} from "../grpc-client/grpc-querier";
import {HospitalsMap} from "./hospitals-map";
import {NaturalGasPipelinesMap} from "./natural-gas-pipelines-map";
import {PowerStationsMap} from "./power-stations-map";
import {DamsMap} from "./dams-map";
import {TransmissionLinesMap} from "./transmission-lines-map";

export class Map1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            geoJson: null,
        }
        this.toggleDataset = this.toggleDataset.bind(this);
    }

    toggleDataset(dataset) {
        const activeDatasets = this.props.activeDatasets;
        return activeDatasets && activeDatasets.indexOf(dataset) > -1;
    }

    render() {
        let mapRef = React.createRef();

        let enableHospitals = this.toggleDataset('hospitals');
        let enableNaturalGasPipelines = this.toggleDataset('natural_gas_pipelines');
        let enablePowerPlants = this.toggleDataset('power_plants');
        let enableDams = this.toggleDataset('dams');
        let enableTransmissionLines = this.toggleDataset('transmission_lines');

        return (
            <div>
                <Map center={[42.4, -71.7]} zoom={8}
                     ref={mapRef}
                     onZoomEnd={() => {
                         const bounds = mapRef.current.leafletElement.getBounds();
                         const geoJson = makeGeoJson(bounds._southWest, bounds._northEast);
                         const center = mapRef.current.leafletElement.getCenter();
                         const zoom = mapRef.current.leafletElement.getZoom();
                         this.setState({
                             geoJson: geoJson
                         });
                         this.props.setGlobalPosition(center, zoom);
                     }}

                     onMoveEnd={() => {
                         if (mapRef && mapRef.current && mapRef.current.leafletElement) {
                             const bounds = mapRef.current.leafletElement.getBounds();
                             const center = mapRef.current.leafletElement.getCenter();
                             const zoom = mapRef.current.leafletElement.getZoom();
                             const geoJson = makeGeoJson(bounds._southWest, bounds._northEast);
                             this.setState({
                                 geoJson: geoJson
                             });
                             this.props.setGlobalPosition(center, zoom);
                         }
                     }}
                >
                    <TileLayer
                        attribution={this.state.attribution}
                        url={this.state.url}
                    />

                    {enableHospitals && <HospitalsMap geoJson={this.state.geoJson}/>}
                    {enableNaturalGasPipelines &&
                    <NaturalGasPipelinesMap geoJson={this.state.geoJson}/>}
                    {enablePowerPlants && <PowerStationsMap geoJson={this.state.geoJson}/>}
                    {enableDams && <DamsMap geoJson={this.state.geoJson}/>}
                    {enableTransmissionLines &&
                    <TransmissionLinesMap geoJson={this.state.geoJson}/>}
                </Map>
            </div>
        );
    }
}