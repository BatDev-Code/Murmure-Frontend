import { View, Text, StyleSheet } from "react-native";

import Button from "../../components/Button";
import Label from "../../components/Label";

export default function FlashcardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finalement ta flashcard !</Text>
      <Text style={styles.subtitle}>Ecran flashcard</Text>

      {/* Labels vers Meditations, respirations, chat */}
      <Label onPress={() => navigation.navigate("Home")}>Home</Label>

      {/* Bouton Précédent */}
      <Button onPress={() => navigation.goBack()} type="back" />
      {/* <Button onPress={() => navigation.navigate("Home")} type="home" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
});
