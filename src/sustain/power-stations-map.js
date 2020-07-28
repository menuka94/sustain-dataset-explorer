import React from "react";
import '../App.css';
import {Icon} from "leaflet";
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import * as powerStationsData from "../resources/data/power_plants.json";

export const PowerStationsMap = () => {
    const [activePowerStation, setActivePowerStation] = React.useState(null);
    const powerStationIcon = new Icon({
        iconUrl: 'power-plan-icon.png',
        iconSize: [25, 25]
    });

    return (
        <div>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {powerStationsData.features.map(powerStation =>
                <Marker key={powerStation.properties.PGM_SYS_ID} position={[
                    powerStation.geometry.coordinates[1],
                    powerStation.geometry.coordinates[0]
                ]}
                        onClick={() => {
                            setActivePowerStation(powerStation);
                        }}
                        icon={powerStationIcon}
                ></Marker>
            )}

            {activePowerStation && <Popup
                position={[
                    activePowerStation.geometry.coordinates[1],
                    activePowerStation.geometry.coordinates[0]
                ]}
                onClose={() => {
                    setActivePowerStation(null);
                }}
            >
                {/*<div>*/}
                {/*    <h4>{activePowerStation.properties.NAME}</h4>*/}
                {/*    <h6>{activePowerStation.properties.ADDRESS}, {activePowerStation.properties.CITY}, {activePowerStation.properties.STATE}</h6>*/}
                {/*</div>*/}
            </Popup>}
        </div>
    );
}