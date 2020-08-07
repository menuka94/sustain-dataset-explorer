import React from "react";
import '../../App.css';
import {GeoJSON} from "react-leaflet";
// import * as naturalGasPipelinesData from "../../resources/data/natural_gas_pipelines.json";

const {client} = require('../grpc-client/grpc-querier');
const {DatasetRequest} = require('../grpc-client/census_pb');

export class NaturalGasPipelinesMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pipelineData: [],
            element: null
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
                console.log('pipelines count:', pipelineData.length);
                this.setState({
                    pipelineData: pipelineData,
                    element: <GeoJSON data={pipelineData} style={{color: 'green'}}/>
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
        let pipelineData = this.state.pipelineData;
        return (
            <div>
                {pipelineData && pipelineData.length > 0 && this.state.element}
            </div>
        );
    }
}