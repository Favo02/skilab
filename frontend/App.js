import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Map from "./components/Map"
import Home from "./components/Home"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as DataAccess from './services/DataAccess.js';

const Stack = createNativeStackNavigator();

export default function App() {
  DataAccess.getAccomodationNearPoint(46.685657, 11.725011, 5).then((res) => res.forEach(e => {
    console.log(e.Distance)
  }));
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name="Map"
          component={Map}
          options={{ title: 'map' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}
