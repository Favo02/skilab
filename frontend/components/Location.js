import * as React from "react"
import { useState, useEffect } from "react"
import { View, Text } from "react-native"

export default function Location({ route, navigation }) {
  const [weather, setWeather] = useState()
  useEffect(() => {}, [])
  const {location} = route.params
  console.log(location);

  return (
    <View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 900, textAlign: "center" }}>
          {location.details.Title}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {location.details.SubHeader}
        </Text>
      </View>
    </View>
  )
}
