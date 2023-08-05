import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Map from "./components/Map"
import Home from "./components/Home"
import Location from "./components/Location"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home" }}
        />

        <Stack.Screen
          name="Map"
          component={Map}
          options={{ title: "Skiing locations map" }}
        />

        <Stack.Screen
          name="Location"
          component={Location}
          options={{ title: "Skiing location details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
