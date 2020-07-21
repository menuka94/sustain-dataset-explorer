import React from "react";
import {Form} from "react-bootstrap";
import {census_features} from "./datasets";

export class CensusFeatureSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            censusFeature: '',
            censusDecade: '',
            censusResolution: ''
        };
    }

    setCensusProperty(key, e) {
        console.log('key:', key);
        console.log('e:', e);
        // this.setState({
        //     [key]: e.target.value
        // });
    }

    render() {
        return (
            <Form.Group>
                <Form.Label>Feature</Form.Label>
                <Form.Control as="select"
                              onChange={this.setCensusProperty('censusFeature', this)}
                >
                    {census_features.map(item => {
                        return <option key={item.id}>{item.value}</option>
                    })}
                </Form.Control>
            </Form.Group>
        );
    }
}