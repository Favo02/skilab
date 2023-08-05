// get ski areas

export const defaultRadius = 10000; //meters
export const defaultMaxNum = 20;

export async function getSkiAreas() {
  let res = await fetch("https://tourism.opendatahub.com/v1/SkiArea")
  res = await res.json()

  return res.map(e => ({
    title: e.ShortName,
    details: e.Detail.en,
    AltitudeFrom: e.AltitudeFrom,
    AltitudeTo: e.AltitudeTo,
    position: {
      longitude: e.GpsPoints.position.Longitude,
      latitude: e.GpsPoints.position.Latitude,
    }
  }))
}

// get accomodations near something (maxNum: max number of accomodations to return)
export async function getAccomodationNearPoint(latitude, longitude, maxNum = defaultMaxNum, radius = defaultRadius) {
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
  accomodations = accomodations.slice(0, maxNum);
  console.log("accomodations after slicing: " + accomodations.length);
  return accomodations
}


//get parking spots in a radius (maxNum: max number of accomodations to return)
export async function old_getParkingNearPoint(latitude, longitude, maxNum = defaultMaxNum, radius = defaultRadius) {
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
    if (e.Detail?.en?.ParkingInfo) {
      parkings.push({
        Title: e.Detail.Title,
        Distance: distance,
        GpsInfo: e.GpsInfo[0],
      });
    }
  });
  console.log("final number of parkings:", parkings.length);
  parkings.sort((a, b) => a.Distance - b.Distance)
  console.log("done sorting parkings");
  console.log("maxNum: " + maxNum)
  console.log(parkings)
  let parkings2 = parkings.slice(0, maxNum);
  console.log("parkings after slicing: " + parkings2.length);
  console.log("parkings2: " + parkings2);
  return parkings2
}

export async function getParkingNearPoint(latitude, longitude, maxNum = 5) {
  let res = await fetch(
    "https://mobility.api.opendatahub.com/v2/flat,node/ParkingStation"
  )
  res = await res.json()

  console.log("got parkings");
  console.log("number of parkings:", res.data.length)
  let parkings = []
  res.data.forEach(e => {
    let distance = computeDistanceFromLongLat(e.scoordinate.x, longitude, e.scoordinate.y, latitude);
    parkings.push({
      location: e.smetadata.municipality != null ? e.smetadata.municipality : e.smetadata.autostrada,
      address: e.smetadata.mainaddress != null ? e.smetadata.mainaddress : e.smetadata.iddirezione,
      municipality: e.smetadata.municipality,
      mainaddress: e.smetadata.mainaddress,
      Distance: distance,
      capacity: e.smetadata.capacity,
      autostrada: e.smetadata.autostrada,
      iddirezione: e.smetadata.iddirezione,
      GpsInfo: {
        Gpstype: "position",
        Altitude: null,
        latitude: e.scoordinate.y,
        longitude: e.scoordinate.x,
        AltitudeUnitofMeasure: null
      },
    });
    console.log("capacity: " + e.smetadata.capacity);
  });
  console.log("final number of parkings:", parkings.length);
  parkings.sort((a, b) => a.Distance - b.Distance)
  console.log("done sorting parkings");
  console.log("maxNum: " + maxNum)
  let parkings2 = parkings.slice(0, maxNum);
  console.log("parkings after slicing: " + parkings2.length);
  console.log("parkings2: " + JSON.stringify(parkings2));
  return parkings2
}


function computeDistanceFromLongLat(lon0, lon1, lat0, lat1) {
  return (lon1 - lon0) * (lon1 - lon0) + (lat1 - lat0) * (lat1 - lat0);
}
