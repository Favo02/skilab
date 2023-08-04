import React from "react"
import MapView, { Polygon } from "react-native-maps"
import { StyleSheet, View } from "react-native"

export default function Map() {
  const fakePoly = [
    {
      longitude: 11.480712890625,
      latitude: 46.2976109898811,
    },
    {
      longitude: 11.4697265625,
      latitude: 46.5021734835407,
    },
    {
      longitude: 11.6015625,
      latitude: 46.7059691792867,
    },
    {
      longitude: 11.5850830078125,
      latitude: 46.8752133967227,
    },
    {
      longitude: 12.19482421875,
      latitude: 46.9014924473408,
    },
    {
      longitude: 12.381591796875,
      latitude: 46.7360959377012,
    },
    {
      longitude: 12.3870849609375,
      latitude: 46.4113515028992,
    },
    {
      longitude: 11.8817138671875,
      latitude: 46.3431356026019,
    },
    {
      longitude: 11.832275390625,
      latitude: 46.157004962908,
    },
  ]

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
        <Polygon
          coordinates={fakePoly}
          strokeWidth={2}
          strokeColor="#f00"
        />
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
