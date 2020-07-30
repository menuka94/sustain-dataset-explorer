import React from "react";
import '../../App.css';
import {Icon} from "leaflet";
import {TileLayer, Marker, Popup, Polyline, GeoJSON} from "react-leaflet";
import * as naturalGasPipelinesData from "../../resources/data/natural_gas_pipelines.json";

export const NaturalGasPipelinesMap = () => {
    return (
        <div>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <GeoJSON
                data={naturalGasPipelinesData.features}
            ></GeoJSON>
        </div>
    );
}