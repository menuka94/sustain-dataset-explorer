import React from "react";
import '../../App.css';
import {TileLayer, GeoJSON} from "react-leaflet";

const {client} = require('../grpc-client/grpc-querier');
const {DatasetRequest} = require('../grpc-client/census_pb');

export class TransmissionLinesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transmissionLinesData: [],
            element: null
        }
    }

    updateData() {
        const geoJson = this.props.geoJson;
        if (geoJson) {
            let transmissionLinesData = [];
            const datasetRequest = new DatasetRequest();
            datasetRequest.setDataset(3);
            datasetRequest.setSpatialop(0);
            datasetRequest.setRequestgeojson(this.props.geoJson);
            let call = client.datasetQuery(datasetRequest);
            call.on('data', (data) => {
                const response = JSON.parse(data.getResponse());
                transmissionLinesData.push(response);
            });
            call.on('error', console.error);
            call.on('end', () => {
                console.log('transmission lines count:', transmissionLinesData.length);
                this.setState({
                    transmissionLinesData: transmissionLinesData,
                    element: <GeoJSON data={transmissionLinesData} style={{color: 'purple'}}/>
                });
            });
        } else {
            console.error("GeoJson is undefined");
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // this is necessary as <GeoJSON/> does not redraw on data change.
        // entire element needs to be re-rendered
        this.setState({
            element: null
        });
        this.updateData();
    }

    render() {
        let transmissionLinesData = this.state.transmissionLinesData;
        return (
            <div>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {transmissionLinesData && transmissionLinesData.length > 0 &&
                this.state.element
                }
            </div>
        );
    }
}