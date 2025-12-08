import { View, Text, StyleSheet } from "react-native";

import Button from "../../components/Button";
import Label from "../../components/Label";

const chapterTitle = "Qu'est ce que l'instant present ?"
const chapterContent =
  "L’instant présent désigne le moment que tu vis ici et maintenant, sans te perdre dans le passé ni anticiper l’avenir. C’est ce que tu ressens, vois, entends et vis à cet instant précis. Se concentrer sur l’instant présent aide à réduire le stress et l’anxiété, car tu ne rumines plus ce qui a été ou ce qui pourrait arriver. Vivre l’instant présent, c’est être pleinement conscient de soi et du monde autour de soi, ici et maintenant. Es-tu vraiment dans l’instant présent ?";


export default function LessonScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{chapterTitle}</Text>
      <Text style={styles.subtitle}>{chapterContent}</Text>

      {/* Bouton Précédent/suivants */}
      <Button onPress={() => navigation.goBack()} type="back" />
      <Button onPress={() => navigation.navigate("quizz")} type="next" />
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
