import { View, Text, StyleSheet, Pressable } from "react-native";

export default function ConfirmModal({
  visible, //true ou false
  message,
  onConfirm,
  onCancel,
  singleButton = false, //par défaut, 2 boutons
}) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.message}>{message}</Text>

        {/* Mode 1 ou 2 buttons */}
        {singleButton ? (
          <Pressable
            style={[styles.singleButton, styles.cancel]}
            onPress={onConfirm}
          >
            <Text style={styles.btnText}>OK</Text>
          </Pressable>
        ) : (
          <View style={styles.buttons}>
            <Pressable style={[styles.btn, styles.cancel]} onPress={onCancel}>
              <Text style={styles.btnText}>Continuer</Text>
            </Pressable>

            <Pressable style={[styles.btn, styles.confirm]} onPress={onConfirm}>
              <Text style={styles.btnText}>Arrêter</Text>
            </Pressable>
          </View>
        )}
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
    zIndex: 10, // Needed for the modal to be shown in front of anything else
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
  // 1 single button
  singleButton: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignSelf: "center",
    minWidth: 120,
    alignItems: "center",
  },
  // 2 buttons
  buttons: {
    flexDirection: "row",
    gap: 15,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 22,
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
