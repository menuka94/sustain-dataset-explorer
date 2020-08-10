import React from "react";

export class ApertureClient extends React.Component {
    render() {
        return (
            <div>
                <div className="mapContainer" style={{padding: '0px'}}>
                    <div id="mMap1" style={{height: '50%', width: '50%', float: 'left'}}>
                        <iframe title="map1" src="../../src/Iframe/map1.html"/>
                    </div>
                    <div id="mMap2" style={{height: '50%', width: '50%', float: 'right'}}>
                        <iframe title="map2" src="../../src/Iframe/map2.html"/>
                    </div>
                    <div id="mMap3" style={{height: '50%', width: '50%', float: 'left'}}>
                        <iframe title="map3" src="../../src/Iframe/map3.html"/>
                    </div>
                    <div id="mMap4" style={{height: '50%', width: '50%', float: 'left'}}>
                        <iframe title="map4" src="../../src/Iframe/map4.html"/>
                    </div>
                </div>
                <div className="tiles-loading"></div>
            </div>
        );
    }
}