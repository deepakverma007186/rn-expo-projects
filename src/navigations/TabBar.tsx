import TabButton from "@/components/TabButton";
import { StyleSheet, View } from "react-native";
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs";
import { NavigationHelpers, ParamListBase } from "@react-navigation/native";
import { BottomTabDescriptorMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { BlurView } from "expo-blur";
import { useStore } from "@/store";

type TabBarProps = BottomTabBarProps & {
  state: {
    index: number;
    routes: Array<{ key: string; name: string; params?: object }>;
  };
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

export default function TabBar({
  state,
  descriptors,
  navigation,
}: TabBarProps) {
  const primary = "#fff";
  const { secondaryColors } = useStore((state) => ({
    secondaryColors: state.secondaryColors,
  }));

  return (
    <BlurView
      intensity={40}
      experimentalBlurMethod="dimezisBlurView"
      style={styles.container}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        // remove the extra navigation
        if (["_sitemap", "+not-found"].includes(route.name)) return;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            routeName={route.name}
            label={options.title}
            isFocused={isFocused}
            // color={isFocused ? primary : secondary}
            color={
              isFocused
                ? primary
                : secondaryColors[route.name as keyof typeof secondaryColors]
            }
          />
        );
      })}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flexDirection: "row",
    position: "absolute",
    bottom: 16,
    // backgroundColor: "#eee",
    alignItems: "center",
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 16,
    borderCurve: "continuous",
    shadowColor: "#00000099",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
