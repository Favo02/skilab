import * as React from "react"
import { useState } from "react"
import { View, Text, FlatList, Animated, TouchableOpacity } from "react-native"

function Home({ navigation }) {

  const dataList = [
    {
      name : "Ski Area Map",
      target : "Map"
    }
  ]

  const [scrollViewWidth, setScrollViewWidth] = useState(0)

  const boxWidth = scrollViewWidth * 0.8
  const boxDistance = scrollViewWidth - boxWidth
  const halfBoxDistance = boxDistance / 2
  const pan = React.useRef(new Animated.ValueXY()).current

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.target)}>
      <Animated.View
        style={{
          transform: [
            {
              scale: pan.x.interpolate({
                inputRange: [
                  (index - 1) * boxWidth - halfBoxDistance,
                  index * boxWidth - halfBoxDistance,
                  (index + 1) * boxWidth - halfBoxDistance,
                ],
                outputRange: [0.8, 1, 0.8], // scale down when out of scope
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <View
          style={{
            height: '100%',
            width: boxWidth,
            borderRadius: 24,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: `rgba(${(index * 13) % 255}, ${
              (index * 35) % 255
            }, ${(index * 4) % 255}, .5)`,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              position: 'absolute',
              top:85,
              fontSize: 25,
              fontWeight: 900,
              color: '#fff'
            }}
          >{item.name}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  )

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        horizontal
        style={{ backgroundColor: "#6b6b6b", height: 10 }}
        contentContainerStyle={{ paddingVertical: 250 }}
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item, index) => item}
        contentInsetAdjustmentBehavior="never"
        snapToAlignment="center"
        decelerationRate="fast"
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        snapToInterval={boxWidth}
        contentInset={{
          left: halfBoxDistance,
          right: halfBoxDistance,
        }}
        contentOffset={{ x: halfBoxDistance * -1, y: 0 }}
        onLayout={(e) => {
          setScrollViewWidth(e.nativeEvent.layout.width)
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: pan.x } } }],
          {
            useNativeDriver: false,
          }
        )}
      />
    </View>
  )
}

export default Home
