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
                    longitude: e.GpsPoints.position.Longitude,
                    latitude: e.GpsPoints.position.Latitude,
                    AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
                }
            },
        });
    });
    return areas
}


//https://tourism.opendatahub.com/v1/Accommodation?pagenumber=2&pagesize=100&roominfo=1-18,18&bokfilter=hgv&msssource=sinfo&availabilitychecklanguage=en&detail=0&latitude=46.685657&longitude=11.725011&removenullvalues=false

export async function getAccomodationNearPoint(latitude, longitude, number) {
    const radius = 10000;
    const pageSize = 1000;
    const pageNumber = 1;
    let res = await fetch("https://tourism.opendatahub.com/v1/Accommodation?pagenumber=" + pageNumber + "&pagesize=" + pageSize + "&roominfo=1-18,18&bokfilter=hgv&msssource=sinfo&availabilitychecklanguage=en&detail=0&latitude=" + latitude + "&longitude=" + longitude + "&removenullvalues=false&radius=" + radius);
    res = await res.json();
    //console.log(res);
    let accomodations = [];
    res.Items.forEach(e => {
        let distance = (e.GpsPoints.position.Longitude - longitude) * (e.GpsPoints.position.Longitude - longitude) + (e.GpsPoints.position.Latitude - latitude) * (e.GpsPoints.position.Latitude - latitude);
        accomodations.push({
            Id: e.Id,
            Distance: distance,
            AccoType: e.AccoType,
            Altitude: e.Altitude,
            AltitudeTo: e.AltitudeTo,
            AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
            Detail: e.Detail,
            GpsPoints: {
                position: {
                    Gpstype: e.GpsPoints.position.Gpstype,
                    Latitude: e.GpsPoints.position.Longitude, //Inverted
                    Longitude: e.GpsPoints.position.Latitude,
                    AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
                }
            },
            IsCamping: e.IsCamping,
            AccoDetail: e.AccoDetail,
            AccoTypeId: e.AccoTypeId,
            ImageGallery: e.ImageGallery,
            LocationInfo: e.LocationInfo,
        });
    });
    accomodations.sort((a, b) => a.Distance - b.Distance);
    accomodations = accomodations.slice(0, number);
    return accomodations
}

