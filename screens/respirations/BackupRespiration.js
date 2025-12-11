import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import Button from "../../components/Button";

import ConfirmModal from "../../components/ConfirmModal";
import { useState, useEffect } from "react";
import { Animated } from "react-native";
import * as Haptics from "expo-haptics";

const COLORS = {
  dark: "#433c35ff",
};

export default function RespirationCountdownScreen({ route, navigation }) {
  const { duration } = route.params;
  const [isPlaying, setIsPlaying] = useState(false);
  const [ecoule, setEcoule] = useState(0); //valeur incrémentée par le setInterval
  const totalDuration = duration * 60; //secondes totales (car en min)
  const [showExitPopup, setShowExitPopup] = useState(false); // popup sortie
  const [phase, setPhase] = useState("inspire"); //phases inspire/expire

  // state de congrats
  const [showCongrats, setShowCongrats] = useState(false);

  //   Animation cercle= définition du cercleAnim
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // VIBRATIONS-----------------------------------

  // useRef stocke les timeouts des haptics, stocke valeur sans re-render
  const timeoutsVibrations = useRef([]);

  // Fonction pour nettoyer les haptics
  const cleanVibrations = () => {
    // on annule chaque timeout
    timeoutsVibrations.current.forEach((id) => clearTimeout(id));

    // puis on vide
    timeoutsVibrations.current = [];
  };

  // TIMER-----------------------------------

  // Timer global (idem méditation solo)
  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        setEcoule((prev) => {
          if (prev >= totalDuration) {
            clearInterval(interval);
            setIsPlaying(false);
            setShowCongrats(true); //Affichera la modal congratulations
            return totalDuration; //ecoule à la valeur max
          }
          return prev + 1;
        });
      }, 1000); //tts les 1 sec
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  // ANIMATION RESPIRE-----------------------------------
  // Alternance phases inspire/expire
  useEffect(() => {
    if (!isPlaying) return;

    let cycle = setInterval(() => {
      setPhase((prev) => (prev === "inspire" ? "expire" : "inspire"));
    }, 5000); //ttes les 5 secs : Inspire 5 secondes / Expire 5 secondes
    // console.log(phase);
    return () => clearInterval(cycle);
  }, [isPlaying]);

  // UseEffect qui lance l'animation au changement de la phase + isPlaying
  useEffect(() => {
    if (!isPlaying) return;

    animateBreathing(phase);
  }, [phase, isPlaying]);

  // Animation https://reactnative.dev/docs/animated
  const animateBreathing = (phase) => {
    Animated.timing(scaleAnim, {
      toValue: phase === "inspire" ? 1.8 : 0.8, //valeur renvoyée
      duration: 5000, //ttes les 5 secs
      useNativeDriver: true,
    }).start();
  };

  // VIBRATIONS-----------------------------------
  // Haptics - Vibrations inspire/expire

  useEffect(() => {
    if (!isPlaying) return;

    cleanVibrations(); // on nettoie avant de relancer

    // Rythme et intensité
    const pattern = [
      //  Inspiration
      { delay: 0, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 100, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 200, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 300, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 400, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 600, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 800, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 900, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 1200, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 1500, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 1800, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 2200, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 2600, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 2900, style: Haptics.ImpactFeedbackStyle.Heavy },

      //Expiration
      { delay: 5000 + 0, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 5000 + 100, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 5000 + 200, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 5000 + 300, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 5000 + 400, style: Haptics.ImpactFeedbackStyle.Heavy },
      { delay: 5000 + 600, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 5000 + 800, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 5000 + 900, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 5000 + 1200, style: Haptics.ImpactFeedbackStyle.Medium },
      { delay: 5000 + 1500, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 5000 + 1800, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 5000 + 2200, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 5000 + 2600, style: Haptics.ImpactFeedbackStyle.Light },
      { delay: 5000 + 2900, style: Haptics.ImpactFeedbackStyle.Light },
    ];

    pattern.forEach((step) => {
      const id = setTimeout(() => {
        // si on a fait pause on arrête
        if (isPlaying) {
          Haptics.impactAsync(step.style);
        }
      }, step.delay);

      // chaque timeout doit être stocké
      timeoutsVibrations.current.push(id);
    });
    return () => cleanVibrations();
  }, [phase, isPlaying]);

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  function stopRespiration() {
   
    setIsPlaying(false);
    cleanVibrations();
  }

  return (
    <ImageBackground
      source={require("../../assets/respiration/respirationBkg.png")}
      style={styles.container}
    >
      <View style={styles.innerGlobal}>
        <Text style={styles.title}>Respiration</Text>
        <Text style={styles.subtitle}>{duration} minutes</Text>

        {/* Timer */}
        <Text style={styles.timer}>{formatTime(totalDuration - ecoule)}</Text>

        {/* animation*/}
        <Animated.View
          style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}
        >
          <Text style={styles.phaseText}>
            {phase === "inspire" ? "Inspire" : "Expire"}
          </Text>
        </Animated.View>

        {/* Progress bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${(ecoule / totalDuration) * 100}%` },
            ]}
          />
        </View>

        {/* Bouton Play/pause */}
        {!isPlaying ? (
          <Pressable style={styles.playBtn} onPress={() => setIsPlaying(true)}>
            <Text style={styles.playText}>Commencer</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.playBtn} onPress={() => stopRespiration()}>
            <Text style={styles.playText}>Stop</Text>
          </Pressable>
        )}

        {/* Bouton retour */}
        <Button
          type="back"
          style={styles.backBtn}
          onPress={() => {
            if (isPlaying) {
             return setShowExitPopup(true);
            }
            navigation.goBack();
          }}
        />

        {/* Modale sortie avant la fin*/}
        <ConfirmModal
          visible={showExitPopup}
          message="Arrêter la respiration ?"
          onCancel={() => setShowExitPopup(false)}
          onConfirm={() => {
            stopRespiration();
            setShowExitPopup(false);
            navigation.goBack();
          }}
        />

        {/* Modale congrats à la fin*/}
        <ConfirmModal
          visible={showCongrats}
          singleButton
          message="Bravo ! Respiration terminée"
          onConfirm={() => {
            setShowCongrats(false);
            navigation.navigate("Shelves");
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },

  innerGlobal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: COLORS.dark,
  },

  subtitle: {
    fontSize: 18,
    color: COLORS.dark,
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },

  phaseText: {
    color: COLORS.dark,
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  timer: {
    color: COLORS.dark,
    fontSize: 48,
    fontWeight: "700",
    marginTop: 20,
  },

  progressBarBackground: {
    width: "80%",
    height: 8,
    backgroundColor: "#ffffff55",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 10,
    marginBottom: 30,
  },

  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.dark,
  },

  playBtn: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },

  playText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#224C4A",
  },

  backBtn: {
    position: "absolute",
    bottom: 60,
    left: 40,
    zIndex: 20,
  },
});
