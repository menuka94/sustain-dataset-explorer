import React from "react";
import {Button, Card} from "react-bootstrap";

export class Query extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('query.js - props:', this.props);
        return (
            <div>
                <Card style={{width: '16rem'}}>
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            {/*{this.props.details}*/}
                            <Button className="btn-sm btn-danger"
                                    onClick={() => this.props.onClickRemove(this.props.id)}
                            >Remove</Button>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}