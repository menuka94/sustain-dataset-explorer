import React from "react";
import './App.css';
import {Icon} from "leaflet";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import * as hospitalData from "./resources/data/hospitals.json";


export const LeafletMap = () => {
    const [activeHospital, setActiveHospital] = React.useState(null);
    const hospitalIcon = new Icon({
        iconUrl: 'healthcare-icon.png',
        iconSize: [25, 25]
    });

    return (
        <Map center={[42.2, -71.7]} zoom={8}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {hospitalData.features.map(hospital =>
                <Marker key={hospital.properties.ID} position={[
                    hospital.geometry.coordinates[1],
                    hospital.geometry.coordinates[0]
                ]}
                        onClick={() => {
                            setActiveHospital(hospital);
                        }}
                        icon={hospitalIcon}
                ></Marker>
            )}

            {activeHospital && <Popup
                position={[
                    activeHospital.geometry.coordinates[1],
                    activeHospital.geometry.coordinates[0]
                ]}
                onClose={() => {
                    setActiveHospital(null);
                }}
            >
                <div>
                    <h4>{activeHospital.properties.NAME}</h4>
                    <h6>{activeHospital.properties.ADDRESS}, {activeHospital.properties.CITY}, {activeHospital.properties.STATE}</h6>
                </div>
            </Popup>}
        </Map>
    );
}