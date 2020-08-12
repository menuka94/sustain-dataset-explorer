const {CensusClient} = require('./census_grpc_web_pb');

let client = new CensusClient('http://' + window.location.hostname + ':9092', 'for-dataset-explorer');

function makeGeoJson(southwest, northeast) {
    const geo = {type: "Feature", properties: {}};
    const geometry = {
        type: "polygon", coordinates: [[
            [southwest.lng, southwest.lat],
            [southwest.lng, northeast.lat],
            [northeast.lng, northeast.lat],
            [northeast.lng, southwest.lat],
            [southwest.lng, southwest.lat]]]
    };
    geo.geometry = geometry;
    return JSON.stringify(geo);
}

let requestGeoJson = `{
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -74.23118591308594,
                        40.56389453066509
                    ],
                    [
                        -73.75259399414062,
                        40.56389453066509
                    ],
                    [
                        -73.75259399414062,
                        40.80965166748853
                    ],
                    [
                        -74.23118591308594,
                        40.80965166748853
                    ],
                    [
                        -74.23118591308594,
                        40.56389453066509
                    ]
                ]
            ]
        }
    }`;

module.exports = {
    client: client,
    makeGeoJson: makeGeoJson,
    requestGeoJson: requestGeoJson
}