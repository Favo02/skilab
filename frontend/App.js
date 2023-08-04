import React from 'react';
import MapView from 'react-native-maps';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Map from './components/Map'
// import * as DataAccess from './DataAccess.js'


export default function App() {
  //DataAccess.getSkiAreas().then((res) => console.log(res));
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        title="Press me"
        onPress={() => console.log('Simple Button pressed')}
      >
        <Text>My button</Text>
      </TouchableOpacity>
      <Map style={styles.btn}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  btn: {
    height: 200,
    marginTop: 100,
    backgroundColor: 'red'
  }
})
