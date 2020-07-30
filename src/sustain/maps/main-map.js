import React from "react";
import '../../App.css';
import {Map} from "react-leaflet";
import {PowerStationsMap} from "./power-stations-map";
import {makeGeoJson} from "../grpc-querier";
import {NaturalGasPipelinesMap} from "./natural-gas-pipelines-map";
import {HospitalsMap} from "./hospitals-map";

export class MainMap extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let mapRef = React.createRef();

        let enableHospitals = false;
        let enableNaturalGasPipelines = false;

        console.log("main map's render():", this.props.activeDatasets);
        if (this.props.activeDatasets && this.props.activeDatasets.indexOf('hospitals') > -1) {
            enableHospitals = true;
        } else if (this.props.activeDatasets && this.props.activeDatasets.indexOf('natural_gas_pipelines') > -1) {
            enableNaturalGasPipelines = true;
        }

        return (
            <Map center={[42.2, -71.7]} zoom={8}
                 onZoom={() => {
                     const bounds = mapRef.current.leafletElement.getBounds();
                     const geoJson = makeGeoJson(bounds._southWest, bounds._northEast);
                     console.log(geoJson);
                 }}
                 ref={mapRef}
            >
                {enableHospitals && <HospitalsMap/>}
                {enableNaturalGasPipelines && <NaturalGasPipelinesMap/>}
                {/*{enablePowerPlants && <PowerStationsMap/>}*/}
            </Map>
        );
    }
}