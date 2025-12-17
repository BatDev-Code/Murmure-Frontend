import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import DurationSelector from '../../components/DurationSelector';
import { useState } from 'react';
import ParrotChatBtn from '../../components/ParrotChatBtn';
import { Ionicons } from '@expo/vector-icons';

export default function RespirationHomeScreen({ navigation }) {
  const [duration, setDuration] = useState(5);

  const startBreathing = () => {
    navigation.navigate('RespirationCountdown', {
      duration,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Bulle message */}
        <View style={styles.header}>
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>
              Choisis la durée de ta séance de respiration. Tu pourras ensuite
              suivre un rythme doux d'inspiration et d'expiration guidées.
            </Text>
            <View style={styles.bubblePic} />

            {/* Perroquet : ouvre modale Chat */}
            <ParrotChatBtn
              onPress={() => navigation.navigate('Chat')}
              style={styles.perroquet}
            />
          </View>
        </View>

        {/* Body: choix de la durée */}
        <View style={styles.body}>
          <Text style={styles.label}>Durée de la séance de respiration</Text>
          {/* Choix de la durée avec composant de type Slider */}
          <DurationSelector
            mode="respiration"
            value={duration}
            onChange={(value) => setDuration(value)}
          />
        </View>
        
        {/* Footer */}
        <View style={styles.navigationContainer}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={20} color="#224c4aff" />
            <Text style={styles.backButtonText}>Retour</Text>
          </Pressable>

          <Pressable onPress={startBreathing} style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Suivant</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },

  // header perroquet
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    positon: 'relative',
    alignSelf: 'flex-start',
  },

  messageBubble: {
    backgroundColor: '#D8F0E4',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    width: '100%',
    position: 'relative',
    marginVertical: 20,
  },

  messageText: {
    fontSize: 15.5,
    lineHeight: 21,
    fontWeight: '500',
    color: '#224C4A',
  },
  bubblePic: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: '#D8F0E4',
    bottom: -6,
    right: 80,
    transform: [{ rotate: '45deg' }],
  },
  perroquet: {
    position: 'absolute',
    right: -10,
    bottom: -100,
    transform: [{ scaleX: -1 }], //perroquet retourné miroir
  },
  // body
  body: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#224C4A',
    marginBottom: 10,
  },
  // footer
  footer: {
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 20,
    justifyContent: 'flex-end',
  },
  // footer
  navigationContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
    zIndex: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#D8F0E4',
  },
  backButtonText: {
    color: '#224c4aff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#507C79',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
