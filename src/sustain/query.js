import React from "react";
import {Button, Card} from "react-bootstrap";

export class Query extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card style={{width: '18rem'}}>
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            {this.props.details}
                            <Button className="btn-sm btn-danger">Remove</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}