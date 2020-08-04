import React from 'react';

import {Container, Row, Col} from 'react-bootstrap';
import {MainNavbar} from "./navbar";
import {QueryConstructor} from "./query-constructor";
import {MainMap} from "./maps/main-map";

const {DatasetRequest} = require('./grpc-client/census_pb');
const {CensusClient} = require('./grpc-client/census_grpc_web_pb');
const {client, requestGeoJson} = require('./grpc-client/grpc-querier');

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeDatasets: []
        };
        this.addActiveDataset = this.addActiveDataset.bind(this);
        this.removeActiveDataset = this.removeActiveDataset.bind(this);
    }

    componentWillMount() {
        console.log('componentWillMount()');
        const datasetRequest = new DatasetRequest();
        datasetRequest.setDataset(0);
        datasetRequest.setSpatialop(0);
        datasetRequest.setRequestgeojson(requestGeoJson);
        let call = client.datasetQuery(datasetRequest);
        call.on('data', console.log);
        call.on('error', console.error);
        call.on('end', () => console.log("Completed!"));
    }

    addActiveDataset(dataset) {
        const activeDatasets = [...this.state.activeDatasets];
        activeDatasets.push(dataset);
        this.setState({
            activeDatasets: activeDatasets
        });
    }

    removeActiveDataset(dataset) {
        // console.log('removeActiveDataset:', dataset);
        let activeDatasets = [...this.state.activeDatasets];
        const index = activeDatasets.indexOf(dataset);
        if (index > -1) {
            activeDatasets.splice(index, 1);
        }

        // console.log('updatedActiveDatasets:', activeDatasets);
        this.setState({
            activeDatasets: activeDatasets
        });
    }

    render() {
        return <Container fluid>
            <MainNavbar/>
            <Row>
                <Col className="col-lg-3">
                    <QueryConstructor
                        addActiveDataset={this.addActiveDataset}
                        removeActiveDataset={this.removeActiveDataset}
                    />
                </Col>
                {/*<Col className="col-lg-9">*/}
                <Col>
                    <MainMap activeDatasets={this.state.activeDatasets}
                    />
                </Col>
            </Row>
        </Container>
    }
}