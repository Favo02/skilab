// get ski areas

export const defaultRadius = 10000; //meters

export async function getSkiAreas() {
  let res = await fetch("https://tourism.opendatahub.com/v1/SkiArea")
  res = await res.json()

  return res.map(e => ({
    title: e.ShortName,
    details: e.Detail.en,
    position: {
      longitude: e.GpsPoints.position.Longitude,
      latitude: e.GpsPoints.position.Latitude,
    }
  }))
}

// get accomodations near something
export async function getAccomodationNearPoint(latitude, longitude, radius = defaultRadius) {
  const pageSize = 1000
  const pageNumber = 1

  let res = await fetch(
    "https://tourism.opendatahub.com/v1/Accommodation?pagenumber=" +
    pageNumber +
    "&pagesize=" +
    pageSize +
    "&roominfo=1-18,18&bokfilter=hgv&msssource=sinfo&availabilitychecklanguage=en&detail=0&latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&removenullvalues=false&radius=" +
    radius
  )
  res = await res.json()

  console.log("got accomodations");
  console.log("number of accomodations:", res.Items.length)
  let accomodations = []
  res.Items.forEach((e) => {
    let distance = computeDistanceFromLongLat(e.GpsPoints.position.Longitude, longitude, e.GpsPoints.position.Latitude, latitude);
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
          longitude: e.GpsPoints.position.Longitude,
          latitude: e.GpsPoints.position.Latitude,
          AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
        },
      },
      IsCamping: e.IsCamping,
      AccoDetail: e.AccoDetail.en,
      Type: e.AccoType.Id,
      ImageGallery: e.ImageGallery,
      LocationInfo: e.LocationInfo,
    })
  })
  accomodations.sort((a, b) => a.Distance - b.Distance)
  console.log("done sorting accomodations");
  return accomodations
}


//get parking spots in a radius
export async function getParkingNearPoint(latitude, longitude, radius = defaultRadius) {
  const pageSize = 10000
  const pageNumber = 1
  let res = await fetch(
    "https://tourism.opendatahub.com/v1/ODHActivityPoi?" +
    "pagenumber=" + pageNumber +
    "&pagesize=" + pageSize +
    "&type=255&latitude=" + latitude +
    "&longitude=" + longitude +
    "&radius=" + radius +
    "&removenullvalues=false"
  )
  res = await res.json()

  console.log("got parkings");
  console.log("number of parkings:", res.Items.length)
  let parkings = []
  res.Items.forEach(e => {
    let distance = computeDistanceFromLongLat(e.GpsPoints.position.Longitude, longitude, e.GpsPoints.position.Latitude, latitude);
    if (e.Details?.en?.ParkingInfo) {
      parkings.push({
        Title: e.Detail.Title,
        Distance: distance,
        GpsInfo: e.GpsInfo[0],
      });
    }
  });
  console.log("final number of parkings:", res.Items.length);
  parkings.sort((a, b) => a.Distance - b.Distance)
  console.log("done sorting parkings");
  return parkings
}

function computeDistanceFromLongLat(lon0, lon1, lat0, lat1) {
  return (lon1 - lon0) * (lon1 - lon0) + (lat1 - lat0) * (lat1 - lat0);
}
