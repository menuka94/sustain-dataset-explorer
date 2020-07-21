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
        this.setState({
            selectedDataset: e.target.value
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
            this.setState({
                datasetProperties: ''
            });
        }

        const queries = [...this.state.queries];
        const newKey = Math.random();
        let newQueryElement = <Query name={this.state.selectedDataset}
                                     key={newKey}
                                     id={newKey}
                                     details={JSON.stringify(this.state.datasetProperties)}
                                     onClickRemove={this.removeQuery}
        />
        let newQuery = {'id': newKey, 'element': newQueryElement};
        queries.push(newQuery);
        this.setState({
            queries: queries
        });
    }

    removeQuery(key) {
        const queries = [...this.state.queries];
        const updatedQueries = queries.filter(x => x.id !== key);
        this.setState({
            queries: updatedQueries
        });
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
            <Jumbotron>
                <Row>
                    <Col className="col-6">
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
                    <Col className="col-6">
                        <h3>Query Pipeline</h3>
                        {queriesElement}
                    </Col>
                </Row>
            </Jumbotron>
        );
    }
}

