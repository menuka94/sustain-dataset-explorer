import React from "react";
import {Form, Row, Col} from "react-bootstrap";
import {census_decades, census_features, census_resolution} from "./datasets";

export class CensusFeatureSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusFeature: 'Total Population',
            censusDecade: '2010',
            censusResolution: 'County'
        };
        this.setCensusFeature = this.setCensusFeature.bind(this);
        this.setCensusDecade = this.setCensusDecade.bind(this);
        this.setCensusResolution = this.setCensusResolution.bind(this);
    }

    setCensusFeature(e) {
        console.log('setCensusFeature:', e.target.value);
        this.setState({
            censusFeature: e.target.value
        });
    }

    setCensusDecade(e) {
        this.setState({
            censusDecade: e.target.value
        });
    }

    setCensusResolution(e) {
        this.setState({
            censusResolution: e.target.value
        });
    }

    render() {
        console.log(this.state);
        return (
                <Form.Group>
                    <Row>
                        <Col className="col-6">
                            <Form.Label>Feature</Form.Label>
                            <Form.Control as="select"
                                          onChange={this.setCensusFeature}
                                value={this.state.censusFeature}
                            >
                                {census_features.map(item => {
                                    return <option key={item.id}>{item.value}</option>
                                })}
                            </Form.Control>
                        </Col>
                        <Col className="col-3">
                            <Form.Label>Decade</Form.Label>
                            <Form.Control as="select"
                                          onChange={(e) => this.setCensusDecade(e)}
                                value={this.state.censusDecade}
                            >
                                {census_decades.map(item => {
                                    return <option key={item.id}>{item.value}</option>
                                })}
                            </Form.Control>
                        </Col>
                        <Col className="col-3">
                            <Form.Label>Resolution</Form.Label>
                            <Form.Control as="select"
                                          onChange={this.setCensusResolution}
                                value={this.state.censusResolution}
                            >
                                {census_resolution.map(item => {
                                    return <option key={item.id}>{item.value}</option>
                                })}
                            </Form.Control>
                        </Col>
                    </Row>
                </Form.Group>
        );
    }
}