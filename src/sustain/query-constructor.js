import React from "react";
import {datasets} from './datasets';
import {
    Container,
    Form,
    Row,
    Col,
    Button,
} from "react-bootstrap";

export class QueryConstructor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectValue: 'Census'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("handleChange()");
        this.setState({
            selectValue: e.target.value
        });
    }

    render() {
        return (
            <Container>
                <h3>Construct Query</h3>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group>
                                <Form.Label>Select Dataset</Form.Label>
                                <Form.Control as="select"
                                              onChange={this.handleChange}
                                              value={this.state.selectValue}
                                >
                                    {datasets.map(item => {
                                        return <option key={item.id}>{item.name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <br/>
                <Button>Add</Button>
            </Container>
        );
    }
}