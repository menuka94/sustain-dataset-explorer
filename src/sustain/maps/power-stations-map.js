import React from "react";
import '../../App.css';
import {Icon} from "leaflet";
import {TileLayer, Marker, Popup} from "react-leaflet";

const {client} = require('../grpc-client/grpc-querier');
const {DatasetRequest} = require('../grpc-client/census_pb');

export class PowerStationsMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePowerStation: null,
            powerStationIcon: new Icon({
                iconUrl: 'power-plan-icon.png',
                iconSize: [25, 25]
            }),
            powerStationsData: []
        }
    }

    updateData() {
        const geoJson = this.props.geoJson;
        if (geoJson) {
            let powerStationsData = [];
            const datasetRequest = new DatasetRequest();
            datasetRequest.setDataset(5);
            datasetRequest.setSpatialop(0);
            datasetRequest.setRequestgeojson(this.props.geoJson);
            let call = client.datasetQuery(datasetRequest);
            call.on('data', (data) => {
                const response = JSON.parse(data.getResponse());
                powerStationsData.push(response);
            });
            call.on('error', console.error);
            call.on('end', () => {
                console.log('hospitals count:', powerStationsData.length);
                this.setState({
                    powerStationsData: powerStationsData
                });
            });
        } else {
            console.error("GeoJson is undefined");
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateData();
    }

    render() {
        let activePowerStation = this.state.activePowerStation;
        let powerStationsData = this.state.powerStationsData;
        return (
            <div>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {powerStationsData && powerStationsData.length > 0 &&
                powerStationsData.map(powerStation =>
                    <Marker key={powerStation.properties.PGM_SYS_ID} position={[
                        powerStation.geometry.coordinates[1],
                        powerStation.geometry.coordinates[0]
                    ]}
                            onClick={() => {
                                this.setState({
                                    activePowerStation: powerStation
                                });
                            }}
                            icon={this.state.powerStationIcon}
                    ></Marker>
                )}

                {activePowerStation && <Popup
                    position={[
                        activePowerStation.geometry.coordinates[1],
                        activePowerStation.geometry.coordinates[0]
                    ]}
                    onClose={() => {
                        this.setState({
                            activePowerStation: null
                        });
                    }}
                >
                    <div>
                        <h4>{activePowerStation.properties.PRIMARY_NA}</h4>
                        <h5>Energy Source: {activePowerStation.properties.ENERGY_SRC}</h5>
                        <h6>Location: {activePowerStation.properties.CITY_NAME}, {activePowerStation.properties.STATE_CODE}</h6>
                    </div>
                </Popup>}
            </div>
        );
    }
}