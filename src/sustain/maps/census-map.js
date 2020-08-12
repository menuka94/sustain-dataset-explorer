import React from "react";
import {GeoJSON, Tooltip} from "react-leaflet";
// import * as naturalGasPipelinesData from "../../resources/data/natural_gas_pipelines.json";

const {client} = require('../grpc-client/grpc-querier');
const {SpatialRequest} = require('../grpc-client/census_pb');

export class CensusMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusData: null,
            element: null
        }
    }

    onEachFeature(feature, layer) {
        // console.log('feature.values:', feature.values);
        layer.bindTooltip(feature.values);
    }

    updateData() {
        const geoJson = this.props.geoJson;
        if (geoJson) {
            let censusData = [];
            const spatialRequest = new SpatialRequest();
            spatialRequest.setCensusresolution(1);  // county
            spatialRequest.setCensusfeature(0); // total population
            spatialRequest.setRequestgeojson(geoJson);
            spatialRequest.setSpatialop(1); // GeoWithin
            let call = client.spatialQuery(spatialRequest);
            call.on('data', (data) => {
                let response = JSON.parse(data.array[1]);
                response.values = JSON.parse(data.array[0])["2010_total_population"];
                censusData.push(response);
            })
            call.on('end', () => {
                console.log('census entries count:', censusData.length);
                this.setState({
                    censusData: censusData,
                    element: <GeoJSON
                        data={censusData}
                        onEachFeature={this.onEachFeature}
                    >
                    </GeoJSON>
                });
            })
            call.on('err', console.error);
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
        let censusData = this.state.censusData;
        return (
            <div>
                {censusData && censusData.length > 0 && this.state.element}
            </div>
        );
    }
}