import React from "react";
import '../../App.css';
import {TileLayer, GeoJSON, Polyline} from "react-leaflet";
// import * as naturalGasPipelinesData from "../../resources/data/natural_gas_pipelines.json";

const {client} = require('../grpc-client/grpc-querier');
const {DatasetRequest} = require('../grpc-client/census_pb');

export class NaturalGasPipelinesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pipelineData: []
        }
    }

    updateData() {
        const geoJson = this.props.geoJson;
        if (geoJson) {
            let pipelineData = [];
            const datasetRequest = new DatasetRequest();
            datasetRequest.setDataset(4);
            datasetRequest.setSpatialop(0);
            datasetRequest.setRequestgeojson(this.props.geoJson);
            let call = client.datasetQuery(datasetRequest);
            call.on('data', (data) => {
                const response = JSON.parse(data.getResponse());
                pipelineData.push(response);
            });
            call.on('error', console.error);
            call.on('end', () => {
                console.log("Completed!")
                console.log('pipelines count:', pipelineData.length);
                this.setState({
                    pipelineData: pipelineData
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
        let pipelineData = this.state.pipelineData;
        return (
            <div>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {pipelineData && pipelineData.length > 0 &&
                pipelineData.map(pipeline => {
                    console.log('polyline:', pipeline);
                    return <Polyline
                        key={pipeline.id}
                        positions={pipeline.geometry.coordinates}
                    ></Polyline>
                })}
            </div>
        );
    }
}