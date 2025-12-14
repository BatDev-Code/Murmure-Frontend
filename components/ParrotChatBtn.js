import { Pressable, Image, StyleSheet, View } from "react-native";

export default function ParrotChatBtn({
  onPress,
  style,
  size = 100,
}) {
  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Image
        source={require("../assets/chat/perroquet.png")}
        style={{ width: size, height: size }}
        // resizeMode="contain"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 100,
  },
});