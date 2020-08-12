import React from "react";
import {Map3} from "./maps/map3";
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
                <div className="row">
                    <div title="Leaflet" className="col">
                        <Map3
                            globalPosition={this.state.globalPosition}
                            setGlobalPosition={this.setGlobalPosition}
                            activeDatasets={this.props.activeDatasets}/>
                    </div>
                    <div title="Base Maps" className="col">
                        <Map2
                            globalPosition={this.state.globalPosition}
                            setGlobalPosition={this.setGlobalPosition}
                            activeDatasets={this.props.activeDatasets}/>
                    </div>
                </div>
            </div>
        );
    }
}