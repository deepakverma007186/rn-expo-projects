import { tabIcons } from "@/assets/tabIcons";
import { useStore } from "@/store";
import { useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface TabButtonProps {
  onPress: () => void;
  onLongPress?: () => void;
  routeName: keyof typeof tabIcons;
  label: string | undefined;
  isFocused: boolean;
  color: string;
}

export default function TabButton({
  onPress,
  onLongPress,
  routeName,
  label,
  isFocused,
  color,
}: TabButtonProps) {
  const { secondaryColors, setSecondaryColor } = useStore((state) => ({
    setSecondaryColor: state.setSecondaryColor,
    secondaryColors: state.secondaryColors,
  }));
  // scale tabicon
  const scale = useSharedValue<number>(1);
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused,
      { duration: 250 }
    );
  }, [isFocused, scale]);

  const animatedIconScaleStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.4]);
    return {
      transform: [{ scale: scaleValue }],
    };
  });

  const handlePress = () => {
    onPress();
    setSecondaryColor(routeName);
  };
  return (
    <Pressable
      onPress={handlePress}
      onLongPress={onLongPress}
      style={styles.btnContainer}
    >
      <Animated.View style={animatedIconScaleStyle}>
        {tabIcons[routeName]({ color })}
      </Animated.View>
      {!isFocused && <Text style={{ color, fontSize: 12 }}>{label}</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
});
