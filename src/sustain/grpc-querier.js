export function makeGeoJson(southwest, northeast) {
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