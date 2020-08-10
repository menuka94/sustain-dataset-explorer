import React from "react";
import {Map3} from "./maps/map3";
import {Row, Tab, Col} from "react-bootstrap";
import {Map2} from "./maps/map2";

export class AllMaps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalPosition: {
                center: [42.2, -71.7],
                zoom: 8
            }
        }
        this.setGlobalPosition = this.setGlobalPosition.bind(this);
    }

    setGlobalPosition(center, zoom) {
        this.setState({
            globalPosition: {
                center: center,
                zoom: zoom
            }
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col title="Leaflet">
                        <Map3
                            globalPosition={this.state.globalPosition}
                            setGlobalPosition={this.setGlobalPosition}
                            activeDatasets={this.props.activeDatasets}/>
                    </Col>
                    <Col title="Base Maps">
                        <Map2
                            globalPosition={this.state.globalPosition}
                            setGlobalPosition={this.setGlobalPosition}
                            activeDatasets={this.props.activeDatasets}/>
                    </Col>
                </Row>
            </div>
        );
    }
}