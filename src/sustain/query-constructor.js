import React from "react";
import {datasets} from './datasets';
import {Jumbotron, Form, Row, Col, Button} from "react-bootstrap";
import {CensusFeatureSelector} from "./census-feature-selector";
import {Query} from "./query";

export class QueryConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDataset: 'Census',
            queries: [],
            censusProperties: {
                censusFeature: '',
                censusDecade: '',
                censusResolution: ''
            },
            datasetProperties: ''
        };
        this.handleSelectDataset = this.handleSelectDataset.bind(this);
        this.updateProperties = this.updateProperties.bind(this);
        this.addQuery = this.addQuery.bind(this);
        this.removeQuery = this.removeQuery.bind(this);
    }

    handleSelectDataset(e) {
        const rawValue = e.target.value;
        let selectedDataset = '';
        if (rawValue === 'Census') {
            selectedDataset = 'census';
        } else if (rawValue === 'Natural Gas Pipelines') {
            selectedDataset = 'natural_gas_pipelines';
        } else if (rawValue === 'Hospitals') {
            selectedDataset = 'hospitals';
        }
        this.setState({
            selectedDataset
        });
    }

    addQuery() {
        if (this.state.selectedDataset === 'Census') {
            if (this.state.censusProperties.censusDecade === '' ||
                this.state.censusProperties.censusFeature === '' ||
                this.state.censusProperties.censusResolution === '') {
                alert('Census Properties not set. Cannot construct query');
            } else {
                this.setState({
                    datasetProperties: this.state.censusProperties
                });

            }
        } else {
            // TODO: support adding properties for datasets other than Census
            this.setState({
                datasetProperties: ''
            });
        }

        this.props.addActiveDataset(this.state.selectedDataset);

        const queries = [...this.state.queries];    // get all existing queries
        const newKey = Math.random();   // key for the new query
        let newQueryElement = <Query name={this.state.selectedDataset}
                                     key={newKey}   // not a prop, but required for rendering the element
                                     id={newKey}    // prop
                                     details={JSON.stringify(this.state.datasetProperties)}
                                     onClickRemove={this.removeQuery}
        />
        let newQuery = {
            'id': newKey,
            'name': this.state.selectedDataset,
            'element': newQueryElement
        };
        queries.push(newQuery);
        this.setState({
            queries: queries
        });
    }

    removeQuery(id, name) {
        const queries = [...this.state.queries];
        const updatedQueries = queries.filter(x => x.id !== id);
        this.setState({
            queries: updatedQueries
        });
        this.props.removeActiveDataset(name);
    }

    updateProperties(dataset, properties) {
        if (dataset === 'Census') {
            console.log(true);
            this.setState({
                censusProperties: properties,
            });
        }
        console.log(properties);
        console.log(this.state.censusProperties);
    }

    render() {
        let featureSelectorElement;
        if (this.state.selectedDataset === 'Census') {
            featureSelectorElement = <CensusFeatureSelector
                updateProperties={this.updateProperties}
            />;
        } else {
            featureSelectorElement = '';
        }

        let queriesElement;
        if (this.state.queries === []) {
            queriesElement = '';
        } else {
            queriesElement = this.state.queries.map(item => {
                return item.element;
            });
        }

        return (
            <div>
                <Jumbotron>
                    <Row>
                        <Col>
                            <h3>Construct Query</h3>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Select Dataset</Form.Label>
                                    <Form.Control as="select"
                                                  onChange={this.handleSelectDataset}
                                                  value={this.state.selectValue}
                                    >
                                        {datasets.map(item => {
                                            return <option key={item.id}>{item.value}</option>
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                {featureSelectorElement}
                            </Form>
                            <br/>
                            <Button onClick={this.addQuery}>Add</Button>
                        </Col>
                    </Row>
                    <br/>
                    <hr/>
                    <Row>
                        <Col className="col-3">
                            <h3>Query Pipeline</h3>
                            {queriesElement}
                        </Col>
                    </Row>
                </Jumbotron>
            </div>
        );
    }
}

