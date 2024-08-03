import TabBar from "@/navigations/TabBar";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <Ionicons name="happy" size={14} color={focused ? "red" : "gray"} />
        ),
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: "Red" }} />
      <Tabs.Screen name="settings" options={{ title: "Purple" }} />
      <Tabs.Screen name="rules" options={{ title: "Coral" }} />
      <Tabs.Screen name="share" options={{ title: "Teal" }} />
    </Tabs>
  );
}
