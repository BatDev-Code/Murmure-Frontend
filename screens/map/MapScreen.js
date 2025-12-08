import { View, Text, StyleSheet } from "react-native";

import Button from "../../components/Button";
import Label from "../../components/Label";

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur la Carte</Text>
      <Text style={styles.subtitle}>Ecran Map</Text>

      {/* Labels vers Meditations, respirations, chat */}
      <Label onPress={() => navigation.navigate("lesson")}>Chapitre 1</Label>

      {/* Bouton Précédent */}
      <Button onPress={() => navigation.goBack()} type="back" />
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
