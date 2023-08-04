import React from 'react';
import MapView from 'react-native-maps';
import { Button, StyleSheet, View } from 'react-native';
import * as DataAccess from './DataAccess.js'


export default function App() {
  //DataAccess.getSkiAreas().then((res) => console.log(res));
  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: '100px',
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
