import * as React from "react"
import { View, Button } from "react-native"

function Home({navigation}) {
  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Piste"
        onPress={() =>
          navigation.navigate('Map')
        }
      />
    </View>
  )
}

export default Home
