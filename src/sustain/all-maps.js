import React from "react";
import {MainMap} from "./maps/main-map";
import {Tabs, Tab} from "react-bootstrap";
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

    setGlobalPosition(position) {
        this.setState({
            globalPosition: {
                center: position.center,
                zoom: position.zoom
            }
        });
    }

    render() {
        return (
            <div>
                <Tabs>
                    <Tab eventKey="map3" title="Leaflet">
                        <MainMap
                            globalPosition={this.state.globalPosition}
                            setGlobalPosition={this.setGlobalPosition}
                            activeDatasets={this.props.activeDatasets}/>
                    </Tab>
                    <Tab eventKey="map2" title="Base Maps">
                        <Map2
                            globalPosition={this.state.globalPosition}
                            setGlobalPosition={this.setGlobalPosition}
                            activeDatasets={this.props.activeDatasets}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}