import { View, Text, StyleSheet } from "react-native";

import Button from "../../components/Button";
import Label from "../../components/Label";

const quizzQuestion = "Quand tu marches dehors, tu…";
const quizzAnswers = [
  "Regarde ton téléphone et pense à ta to-do list",
  "Observe un peu autour de toi, mais ton esprit vagabonde",
  "Sens le vent, entends les sons et profites de chaque pas",
];
export default function QuizzScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Et maintenant le quizz !</Text>
      <Text style={styles.subtitle}>{quizzQuestion}</Text>
      {quizzAnswers.map((e, i) => {
        return (
          <Text key={i}>
            - {e}
          </Text>
        );
      })}
      {/* Bouton Précédent */}
      <Button onPress={() => navigation.goBack()} type="back" />
      <Button onPress={() => navigation.navigate("flashcard")} type="next" />
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
