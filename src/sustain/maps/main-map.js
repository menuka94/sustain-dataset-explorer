import React from "react";
import '../../App.css';
import {Map} from "react-leaflet";
import {PowerStationsMap} from "./power-stations-map";
import {makeGeoJson} from "../grpc-client/grpc-querier";
import {NaturalGasPipelinesMap} from "./natural-gas-pipelines-map";
import {HospitalsMap} from "./hospitals-map";

export class MainMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            geoJson: null,
        };
    }

    toggleDataset(dataset) {
        const activeDatasets = this.props.activeDatasets;
        return activeDatasets && activeDatasets.indexOf(dataset) > -1;
    }

    render() {
        let mapRef = React.createRef();

        // console.log("main-map's render():", this.props.activeDatasets);

        let enableHospitals = this.toggleDataset('hospitals');
        let enableNaturalGasPipelines = this.toggleDataset('natural_gas_pipelines');

        return (
            <Map center={[42.2, -71.7]} zoom={8}
                 onZoom={() => {
                     const bounds = mapRef.current.leafletElement.getBounds();
                     const geoJson = makeGeoJson(bounds._southWest, bounds._northEast);
                     this.setState({
                         geoJson: geoJson
                     });
                 }}

                 onLoad={() => {
                     console.log('onLoad()');
                     const bounds = mapRef.current.leafletElement.getBounds();
                     const geoJson = makeGeoJson(bounds._southWest, bounds._northEast);
                     this.setState({
                         geoJson: geoJson
                     });
                 }}

                 ref={mapRef}
            >
                {enableHospitals && <HospitalsMap geoJson={this.state.geoJson}/>}
                {enableNaturalGasPipelines && <NaturalGasPipelinesMap/>}
                {/*{enablePowerPlants && <PowerStationsMap/>}*/}
            </Map>
        );
    }
}