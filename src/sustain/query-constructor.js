import React from "react";
import {datasets} from './datasets';
import {
    Jumbotron, Form, Row, Col, Button,
} from "react-bootstrap";
import {CensusFeatureSelector} from "./census-feature-selector";
import {Query} from "./query";

export class QueryConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: 'Census',
            queries: [],
            censusProperties: {
                censusFeature: '',
                censusDecade: '',
                censusResolution: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.addQuery = this.addQuery.bind(this);
    }

    handleChange(e) {
        console.log("handleChange()");
        this.setState({
            selectValue: e.target.value
        });
    }

    addQuery() {

    }

    render() {
        const isCensus = this.state.selectValue === 'Census';

        let censusFeatureSelector;
        if (isCensus) {
            censusFeatureSelector = (
                <CensusFeatureSelector/>
            );
        } else {
            censusFeatureSelector = '';
        }

        return (
            <Jumbotron>
                <Row>
                    <Col className="col-5">
                        <h3>Construct Query</h3>
                        <Form>
                            <Form.Group>
                                <Form.Label>Select Dataset</Form.Label>
                                <Form.Control as="select"
                                              onChange={this.handleChange}
                                              value={this.state.selectValue}
                                >
                                    {datasets.map(item => {
                                        return <option key={item.id}>{item.value}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            {censusFeatureSelector}
                        </Form>
                    </Col>
                    <Col className="col-7">
                        <h3>Query Pipeline</h3>
                        <Query name="Census"
                            // details={JSON.stringify({'decade': '2010', 'feature': 'Total Population'})}
                        />
                    </Col>
                </Row>
                <br/>
                <Button>Add</Button>
            </Jumbotron>
        );
    }
}
