export async function testFetch() {
    const response = await fetch("https://tourism.opendatahub.com/v1/District?pagesize=25&pagenumber=1&language=en");
    const movies = await response.json();
    console.log("test");
    return movies
}

export async function getSkiAreas() {
    let res = await fetch("https://tourism.opendatahub.com/v1/SkiArea");
    res = await res.json();
    //console.log(res.Items);
    let areas = [];
    res.forEach(e => {
        areas.push({
            Active: e.Active,
            ShortName: e.ShortName,
            AltitudeFrom: e.AltitudeFrom,
            AltitudeTo: e.AltitudeTo,
            AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
            Detail: e.Detail,
            GpsPoints: {
                position: {
                    Gpstype: e.GpsPoints.position.Gpstype,
                    Latitude: e.GpsPoints.position.Longitude,
                    Longitude: e.GpsPoints.position.Latitude,
                    AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
                }
            },
        });
    });
    return areas
} 