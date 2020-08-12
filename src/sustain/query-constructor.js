import React from "react";
import {datasets} from './datasets';
import {Jumbotron, Form, Row, Col, Button} from "react-bootstrap";
import {CensusFeatureSelector} from "./census-feature-selector";
import {Query} from "./query";

export class QueryConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDataset: datasets[0],
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
        let selectedDataset = datasets.find(x => x.value === rawValue);
        this.setState({
            selectedDataset
        });
    }

    addQuery() {
        if (this.state.selectedDataset.id === 'census') {
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

        this.props.addActiveDataset(this.state.selectedDataset.id);

        const queries = [...this.state.queries];    // get all existing queries
        const newKey = Math.random();   // key for the new query
        let newQueryElement = <Query name={this.state.selectedDataset.value}
                                     key={this.state.selectedDataset.id}   // not a prop, but required for rendering the element
                                     id={this.state.selectedDataset.id}    // prop
                                     details={JSON.stringify(this.state.datasetProperties)}
                                     onClickRemove={this.removeQuery}
        />
        let newQuery = {
            'id': newKey,
            'name': this.state.selectedDataset.value,
            'element': newQueryElement
        };
        queries.push(newQuery);
        this.setState({
            queries: queries
        });
    }

    removeQuery(id) {
        console.log('removeQuery:', id);
        const queries = [...this.state.queries];
        console.log('queries:', queries);
        const updatedQueries = queries.filter(x => x.element.key !== id);
        this.setState({
            queries: updatedQueries
        });
        this.props.removeActiveDataset(id);
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
        if (this.state.selectedDataset.id === 'census') {
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
                                                  value={this.state.selectedDataset.value}
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

