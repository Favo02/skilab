import * as React from "react"
import { View, Button, Text, FlatList, Animated } from "react-native"

export default function Carousel({ dataList }) {
    const [scrollViewWidth, setScrollViewWidth] = React.useState(0);
    const boxWidth = scrollViewWidth * 0.6;
    const boxDistance = scrollViewWidth - boxWidth;
    const halfBoxDistance = boxDistance / 2;
    const pan = React.useRef(new Animated.ValueXY()).current;
    const renderItem = ({ item, index }) => (
        <Animated.View
            style={{
                transform: [
                    {
                        scale: pan.x.interpolate({
                            inputRange: [
                                (index - 1) * boxWidth - halfBoxDistance,
                                index * boxWidth - halfBoxDistance,
                                (index + 1) * boxWidth - halfBoxDistance, // adjust positioning
                            ],
                            outputRange: [0.8, 1, 0.8], // scale down when out of scope
                            extrapolate: 'clamp',
                        }),
                    },
                ],
            }}>
            <View
                style={
                    {
                //         height: '100%',
                         width: boxWidth
                //         borderRadius: 24,
                //         backgroundColor: `rgba(${(index * 13) % 255}, ${(index * 35) % 255
                //             }, ${(index * 4) % 255}, .5)`,
                    }
                }
                >
                {item}
            </View>
        </Animated.View >
    );

    return (<FlatList
        horizontal
        style={{ }}
        contentContainerStyle={{ }}
        data={dataList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${item}`}
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
          setScrollViewWidth(e.nativeEvent.layout.width);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: pan.x } } }],
          {
            useNativeDriver: false,
          },
        )}
      />)
}