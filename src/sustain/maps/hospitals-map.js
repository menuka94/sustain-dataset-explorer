import React from "react";
import '../../App.css';
import {Icon} from "leaflet";
import {Marker, Popup} from "react-leaflet";

const {client} = require('../grpc-client/grpc-querier');
const {DatasetRequest} = require('../grpc-client/census_pb');

export class HospitalsMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeHospital: null,
            hospitalIcon: new Icon({
                iconUrl: 'healthcare-icon.png',
                iconSize: [25, 25]
            }),
            hospitalData: []
        }
        this.updateData = this.updateData.bind(this);
    }

    updateData() {
        const geoJson = this.props.geoJson;
        if (geoJson) {
            let hospitalData = [];
            const datasetRequest = new DatasetRequest();
            datasetRequest.setDataset(0);
            datasetRequest.setSpatialop(0);
            datasetRequest.setRequestgeojson(this.props.geoJson);
            let call = client.datasetQuery(datasetRequest);
            call.on('data', (data) => {
                const response = JSON.parse(data.getResponse());
                hospitalData.push(response);
            });
            call.on('error', console.error);
            call.on('end', () => {
                console.log('hospitals count:', hospitalData.length);
                this.setState({
                    hospitalData: hospitalData
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
        let hospitalData = this.state.hospitalData;
        return (
            <div>
                {hospitalData && hospitalData.length > 0 && hospitalData.map(hospital =>
                    <Marker key={hospital.properties.ID} position={[
                        hospital.geometry.coordinates[1],
                        hospital.geometry.coordinates[0]
                    ]}
                            onClick={() => {
                                this.setState({
                                    activeHospital: hospital
                                });
                            }}
                            icon={this.state.hospitalIcon}
                    ></Marker>
                )}

                {this.state.activeHospital && <Popup
                    position={[
                        this.state.activeHospital.geometry.coordinates[1],
                        this.state.activeHospital.geometry.coordinates[0]
                    ]}
                    onClose={() => {
                        this.setState({
                            activeHospital: null
                        });
                    }}
                >
                    <div>
                        <h4>{this.state.activeHospital.properties.NAME}</h4>
                        <h6>{this.state.activeHospital.properties.ADDRESS}, {this.state.activeHospital.properties.CITY},
                            {this.state.activeHospital.properties.STATE}</h6>
                    </div>
                </Popup>}
            </div>
        );
    }

}