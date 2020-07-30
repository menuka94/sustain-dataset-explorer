import React from "react";
import '../../App.css';
import {Map} from "react-leaflet";
import {PowerStationsMap} from "./power-stations-map";
import {makeGeoJson} from "../grpc-querier";
import {NaturalGasPipelinesMap} from "./natural-gas-pipelines-map";
import {HospitalsMap} from "./hospitals-map";

export const MainMap = () => {
    let mapRef = React.createRef();

    return (
        <Map center={[42.2, -71.7]} zoom={8}
             onZoom={() => {
                 const bounds = mapRef.current.leafletElement.getBounds();
                 const geoJson = makeGeoJson(bounds._southWest, bounds._northEast);
                 console.log(geoJson);
             }}
             ref={mapRef}
        >
            <HospitalsMap/>
            <PowerStationsMap/>
            <NaturalGasPipelinesMap/>
        </Map>
    );
}