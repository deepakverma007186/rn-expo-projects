import { Ionicons } from "@expo/vector-icons";

export const tabIcons: Record<
  string,
  (props: { color: string }) => JSX.Element
> = {
  index: (props) => <Ionicons name="home" size={24} {...props} />,
  settings: (props) => <Ionicons name="settings" size={24} {...props} />,
  rules: (props) => <Ionicons name="help-buoy" size={24} {...props} />,
  share: (props) => <Ionicons name="share" size={24} {...props} />,
};
