import React, { useState, useEffect } from "react"
import MapView, { Marker, Callout } from "react-native-maps"
import { StyleSheet, View, Text } from "react-native"
import { getSkiAreas } from "../services/DataAccess.js"

export default function Map() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = async () => {
      setData(await getSkiAreas())
    }

    getData()
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          longitude: 11.5,
          latitude: 46.5,
          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      >
        {data.map((p, i) => (
          <Marker
            title={p.ShortName}
            key={i}
            coordinate={p.GpsPoints.position}
            strokeWidth={2}
            strokeColor="#f00"
          >
            <Callout>
              <View>
                <Text>{JSON.stringify(p.Detail)}</Text>
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
