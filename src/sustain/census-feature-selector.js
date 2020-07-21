import React from "react";
import {Form, Row, Col} from "react-bootstrap";
import {census_decades, census_features, census_resolution} from "./datasets";

export class CensusFeatureSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusProperties: {
                censusFeature: 'Total Population',
                censusDecade: '2010',
                censusResolution: 'County'
            }
        };
        this.handleSelectCensusFeature = this.handleSelectCensusFeature.bind(this);
        this.handleSetCensusDecade = this.handleSetCensusDecade.bind(this);
        this.handleSetCensusResolution = this.handleSetCensusResolution.bind(this);
        this.updateQueryConstructor();
    }

    updateQueryConstructor() {
        this.props.updateProperties('Census', this.state.censusProperties);
    }

    handleSelectCensusFeature(e) {
        let censusProperties = {...this.state.censusProperties};
        censusProperties.censusFeature = e.target.value;
        this.setState({
            censusProperties: censusProperties
        });

        this.updateQueryConstructor();
    }

    handleSetCensusDecade(e) {
        let censusProperties = {...this.state.censusProperties};
        censusProperties.censusDecade = e.target.value;
        this.setState({
            censusProperties: censusProperties
        });

        this.updateQueryConstructor();
    }

    handleSetCensusResolution(e) {
        let censusProperties = {...this.state.censusProperties};
        censusProperties.censusResolution = e.target.value;
        this.setState({
            censusProperties: censusProperties
        });

        this.updateQueryConstructor();
    }

    render() {
        return (
            <Form.Group>
                <Row>
                    <Col className="col-6">
                        <Form.Label>Feature</Form.Label>
                        <Form.Control as="select"
                                      onChange={this.handleSelectCensusFeature}
                                      value={this.state.censusProperties["censusFeature"]}
                        >
                            {census_features.map(item => {
                                return <option key={item.id}>{item.value}</option>
                            })}
                        </Form.Control>
                    </Col>
                    <Col className="col-3">
                        <Form.Label>Decade</Form.Label>
                        <Form.Control as="select"
                                      onChange={(e) => this.handleSetCensusDecade(e)}
                                      value={this.state.censusProperties["censusDecade"]}
                        >
                            {census_decades.map(item => {
                                return <option key={item.id}>{item.value}</option>
                            })}
                        </Form.Control>
                    </Col>
                    <Col className="col-3">
                        <Form.Label>Resolution</Form.Label>
                        <Form.Control as="select"
                                      onChange={this.handleSetCensusResolution}
                                      value={this.state.censusProperties["censusResolution"]}
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