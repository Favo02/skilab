import React, { useState, useEffect, useRef } from "react"
import MapView, { Marker, Callout } from "react-native-maps"
import { StyleSheet, View, Text } from "react-native"
import {
  getSkiAreas,
  getAccomodationNearPoint,
} from "../services/DataAccess.js"

const INITIAL_REGION = {
  latitude: 46.6561,
  longitude: 11.1919,
  latitudeDelta: 2,
  longitudeDelta: 2,
}

export default function Map() {

  const mapRef = useRef(null)

  const [skyAreas, setSkyAreas] = useState([])
  const [accomodations, setAccomodations] = useState([])

  // fetch skyAreas
  useEffect(() => {
    const getData = async () => {
      setSkyAreas(await getSkiAreas())
    }

    getData()
  }, [])

  // getch accomodations around close to something
  const getNewData = async (lat, lon) => {
    setAccomodations([])
    setAccomodations(await getAccomodationNearPoint(lat, lon))
  }

  const handleClick = async (lat, lon) => {
    if (mapRef.current) {
      const newRegion = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }

      mapRef.current.animateToRegion(newRegion, 1000)
    }

    getNewData(lat, lon)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={INITIAL_REGION}
        ref={mapRef}
      >
        {/* Sky areas markers */}
        {skyAreas.map((p, i) => (
          <Marker
            title={p.ShortName}
            key={i}
            coordinate={p.GpsPoints.position}
            pinColor="#f00"
            onPress={() =>
              handleClick(
                p.GpsPoints.position.latitude,
                p.GpsPoints.position.longitude
              )
            }
          >
            <Callout>
              <View>
                <Text>{JSON.stringify(p.GpsPoints.position)}</Text>
                <Text>{JSON.stringify(p.Detail)}</Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* Accomodation markers */}
        {accomodations.map((p, i) => (
          <Marker
            title={p.ShortName}
            key={i}
            coordinate={p.GpsPoints.position}
            pinColor="#00f"
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
})
