import React from "react";
import { ScrollView, StatusBar, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface BoxColorProps {
  color: string;
  title: string;
}

export default function BoxColor({ color, title }: BoxColorProps) {
  const scale = useSharedValue(1); // Initial scale value is 1

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Start the animation with delay and timing
  React.useEffect(() => {
    scale.value = withDelay(
      500, // 500ms delay before the animation starts
      withRepeat(
        withTiming(1.1, {
          duration: 2000, // Slows down the bounce effect (duration of 1 second)
        }),
        -1, // Infinite repeat
        true // Reverse the animation
      )
    );
  }, [scale]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <StatusBar translucent barStyle={"light-content"} />
      {/* <Text style={styles.textStyle}>{title}</Text> */}
      {[1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1].map(
        (opacity, index) => (
          <Animated.View
            key={index}
            style={[
              styles.colorBlock,
              animatedStyle,
              { backgroundColor: color, opacity },
            ]}
          />
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 24,
    paddingBottom: 100,
    backgroundColor: "#00000030",
  },
  colorBlock: {
    borderRadius: 20,
    borderCurve: "continuous",
    width: "100%",
    height: 100,
  },
  textStyle: {
    fontSize: 20,
    color: "gray",
    textAlign: "center",
    fontWeight: "bold",
  },
});
