import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ConfirmModal({
  visible,//true ou false
  message,
  onConfirm,
  onCancel,
}) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.message}>{message}</Text>

        <View style={styles.buttons}>
          <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}>
            <Text style={styles.btnText}>Continuer</Text>
          </Pressable>

          <Pressable style={[styles.btn, styles.confirm]} onPress={onConfirm}>
            <Text style={styles.btnText}>Arrêter</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  message: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  buttons: {
    flexDirection: "row",
    gap: 15,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#D8F0E4",
  },
  confirm: {
    backgroundColor: "#F28C8C",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#224C4A",
  },
});
