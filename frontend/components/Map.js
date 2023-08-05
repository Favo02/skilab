import React, { useState, useEffect, useRef } from "react"
import MapView, { Marker, Callout } from "react-native-maps"
import { StyleSheet, View, Text, Dimensions, Image, TouchableHighlight } from "react-native"
import {
  getSkiAreas,
  getAccomodationNearPoint,
  getParkingNearPoint,
} from "../services/DataAccess.js"

const INITIAL_REGION = {
  latitude: 46.6561,
  longitude: 11.1919,
  latitudeDelta: 2,
  longitudeDelta: 2,
}

const SCREEN_WIDTH = Dimensions.get("window").width

export default function Map({ navigation }) {
  const mapRef = useRef(null)

  const [skiAreas, setSkiAreas] = useState([])
  const [accomodations, setAccomodations] = useState([])
  const [parkings, setParkings] = useState([])

  // fetch skyAreas
  useEffect(() => {
    const getData = async () => {
      setSkiAreas(await getSkiAreas())
    }

    getData()
  }, [])

  // getch accomodations and parkings around close to something
  const getNewData = async (lat, lon) => {
    //setAccomodations([])
    //setSkiAreas([])
    //setParkings([])

    navigation.setOptions({ title: 'Ski area details' })

    setAccomodations(await getAccomodationNearPoint(lat, lon))
    setParkings(await getParkingNearPoint(lat, lon))
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
      <MapView style={styles.map} initialRegion={INITIAL_REGION} ref={mapRef}>

        {/* Sky areas markers */}
        {skiAreas.map((p, i) => (
          <Marker
            title={p.title}
            key={i}
            coordinate={p.position}
            pinColor="#f00"
            onPress={() =>
              handleClick(
                p.position.latitude,
                p.position.longitude
              )
            }
          >
            <Image
              source={require("../assets/ski.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
            <Callout onPress={() => {
                  navigation.navigate("Location", { location: p });
                }}>
                <View
                  style={{
                    width: SCREEN_WIDTH * 0.7,
                  }}
                >
                  <Text
                    style={{ fontSize: 20, fontWeight: 900, textAlign: 'center' }}
                  >{p.details.Title}</Text>
                  <Text
                    style={{ fontSize: 16, textAlign: 'center' }}
                  >{p.details.SubHeader}</Text>
                  <Text
                    style={{ fontSize: 16, textAlign: 'center' }}
                  >{p.AltitudeFrom != null && p.AltitudeTo != null ? "Altitude: " + p.AltitudeFrom + " - " + p.AltitudeTo : ""}</Text>
                </View>
            </Callout>
          </Marker>
        ))}

        {/* Accomodation markers */}
        {accomodations.map((p, i) => {
          return (
            <Marker
              title={p.ShortName}
              key={i}
              coordinate={p.GpsPoints.position}
              pinColor="#00f"
              tracksViewChanges={true}
            >
              <Image
              source={require('../assets/bed.png')}
              style={{ width: 22, height: 26 }}
              resizeMode="contain"
            />
              <Callout>
                <View
                  style={{
                    width: SCREEN_WIDTH * 0.7,
                  }}
                >
                  <Text style={{ fontSize: 20, fontWeight: 900, textAlign: 'center' }}>{p.Type}</Text>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>{p.AccoDetail.Name}</Text>
                  <Text style={{ fontSize: 16, textAlign: 'center' }}>{p.AccoDetail.Street}</Text>
                </View>
              </Callout>
            </Marker>
          )
        })}

        {/* Parkings markers */}
        {parkings.map((p, i) => (
          <Marker
            title={p.address}
            key={i}
            coordinate={p.GpsInfo}
            pinColor="#00f"
            tracksViewChanges={true}
          >
            <Image
              source={require('../assets/parking.png')}
              style={{ width: 26, height: 28 }}
              resizeMode="contain"
            />
            <Callout>
              <View
                style={{
                  width: SCREEN_WIDTH * 0.7,
                }}
              >
                {<Text style={{ fontSize: 20, fontWeight: 900, textAlign: 'center' }}>{p.location != null ? p.location : ""}</Text>}
                <Text style={{ fontSize: 16, textAlign: 'center' }}>{p.address != null ? p.address : ""}</Text>
                {<Text style={{ fontSize: 16, textAlign: 'center' }}>{p.capacity != null ? "capacity: " + p.capacity : ""}</Text>}
              </View>
            </Callout>
          </Marker>
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
