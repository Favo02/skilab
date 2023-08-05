import * as React from "react"
import { useState, useEffect } from "react"
import { View, Text } from "react-native"

export default function Location({ location }) {
  const [weather, setWeather] = useState()

  useEffect(() => {}, [])

  return (
    <View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 900, textAlign: "center" }}>
          {p.details.Title}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {p.details.SubHeader}
        </Text>
      </View>
    </View>
  )
}
