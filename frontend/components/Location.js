import * as React from "react"
import { useState, useEffect } from "react"
import { View, Text, Image } from "react-native"
import { getRealtimeWeatherByGPS, getWeatherHistoryByGPS } from "../services/MeteoAccess.js"

export default function Location({ route, navigation }) {
  const [weather, setWeather] = useState()
  useEffect(() => {}, [])
  const {location} = route.params
  console.log(location);

  // fetch skyAreas
  useEffect(() => {
    const getData = async () => {
      setWeather(await getRealtimeWeatherByGPS(location.position.latitude, location.position.longitude))
    }

    getData()
  }, [])
  return (
      <View>
        
        <Text style={{ fontSize: 20, fontWeight: 900, textAlign: "center", marginTop: 40}}>
          {location.details.Title}
        </Text>
        <Text style={{ fontSize: 16, textAlign: "center" }}>
          {location.details.SubHeader}
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          {`The temperature is ${weather?.temperature??0}\nThe wind direction is: ${weather?.windDirection??0}\nWind speed: ${weather?.windSpeed??0}`}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 900, textAlign: "center", marginTop: 300}}>
          {"Imagine a beautiful graph"}
        </Text>
        <Image
              source={location.logoURL}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
      </View>
  )
}
