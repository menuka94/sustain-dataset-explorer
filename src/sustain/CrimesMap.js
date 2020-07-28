import React from "react";
import {Icon} from "leaflet";
import '../App.css';
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then(response => response.json());

export const CrimesMap = () => {
    const url = "http://localhost:9000/Fire_Stations.json";
    const {data, error} = useSwr(url, {fetcher});
    const crimes = data && !error ? data.slice(0, 100) : [];

    return (
        <Map center={[42.2, -71.7]} zoom={8}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {crimes.map(station => (
                <Popup key={station.properties.PERMANENT_}
                       position={[
                           station.geometry.coordinates[1],
                           station.geometry.coordinates[0],
                       ]}
                />
            ))}
        </Map>
    );
}