import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const InfoBubbleSimple = ({ message, visible, onClose }) => {
  console.log('[InfoBubbleSimple] Props reçues:', { message, visible });

  if (!visible) {
    console.log('[InfoBubbleSimple] visible=false, composant masqué');
    return null;
  }

  console.log('[InfoBubbleSimple] visible=true, affichage du composant');

  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        <Text style={styles.text}>{message || "Message de test"}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    zIndex: 9999,
  },
  bubble: {
    backgroundColor: '#81be83ff',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  closeBtn: {
    marginLeft: 10,
  },
  closeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default InfoBubbleSimple;