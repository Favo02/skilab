// get ski areas
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
      AccoDetail: e.AccoDetail.en,
      Type: e.AccoType.Id,
      ImageGallery: e.ImageGallery,
      LocationInfo: e.LocationInfo,
    })
  })
  accomodations.sort((a, b) => a.Distance - b.Distance)
  return accomodations
}
