import React from "react";
import '../../App.css';
import {Map, TileLayer} from "react-leaflet";
import {PowerStationsMap} from "./power-stations-map";
import {makeGeoJson} from "../grpc-client/grpc-querier";
import {NaturalGasPipelinesMap} from "./natural-gas-pipelines-map";
import {HospitalsMap} from "./hospitals-map";
import {DamsMap} from "./dams-map";
import {TransmissionLinesMap} from "./transmission-lines-map";

export class Map3 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            geoJson: null,
        };
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
            <Map center={[42.2, -71.7]} zoom={8}
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

                 whenReady={() => {
                     const bounds = mapRef.current.leafletElement.getBounds();
                     const geoJson = makeGeoJson(bounds._southWest, bounds._northEast);
                     this.setState({
                         geoJson: geoJson
                     });
                 }}

                 ref={mapRef}
            >

                <TileLayer
                    url={this.state.url}
                    attribution={this.state.attribution}
                />

                {enableHospitals && <HospitalsMap geoJson={this.state.geoJson}/>}
                {enableNaturalGasPipelines &&
                <NaturalGasPipelinesMap geoJson={this.state.geoJson}/>}
                {enablePowerPlants && <PowerStationsMap geoJson={this.state.geoJson}/>}
                {enableDams && <DamsMap geoJson={this.state.geoJson}/>}
                {enableTransmissionLines && <TransmissionLinesMap geoJson={this.state.geoJson}/>}
            </Map>
        );
    }
}