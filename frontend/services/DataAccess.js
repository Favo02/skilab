// get ski areas
export async function getSkiAreas() {
  let res = await fetch("https://tourism.opendatahub.com/v1/SkiArea")
  res = await res.json()

  let areas = []
  res.forEach((e) => {
    areas.push({
      Active: e.Active,
      ShortName: e.ShortName,
      AltitudeFrom: e.AltitudeFrom,
      AltitudeTo: e.AltitudeTo,
      AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
      Detail: e.Detail.en,
      GpsPoints: {
        position: {
          Gpstype: e.GpsPoints.position.Gpstype,
          longitude: e.GpsPoints.position.Longitude,
          latitude: e.GpsPoints.position.Latitude,
          AltitudeUnitofMeasure: e.AltitudeUnitofMeasure,
        },
      },
    })
  })
  return areas
}

// get accomodations near something
export async function getAccomodationNearPoint(latitude, longitude, radius = 10000) {
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

  let accomodations = []
  res.Items.forEach((e) => {
    let distance =
      (e.GpsPoints.position.Longitude - longitude) *
        (e.GpsPoints.position.Longitude - longitude) +
      (e.GpsPoints.position.Latitude - latitude) *
        (e.GpsPoints.position.Latitude - latitude)
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
      AccoDetail: e.AccoDetail,
      AccoTypeId: e.AccoTypeId,
      ImageGallery: e.ImageGallery,
      LocationInfo: e.LocationInfo,
    })
  })
  accomodations.sort((a, b) => a.Distance - b.Distance)
  return accomodations
}
