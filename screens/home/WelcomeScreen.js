

import { View, 
         Text, 
         StyleSheet, 
         ImageBackground } from "react-native";
import { useEffect, useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

// Empêche le splash screen de se cacher automatiquement
SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Précharge les images de l'application, 
        await Asset.loadAsync([

          // --->  Ajoutez toutes vos autres images ici pour le prechargement <---
          require('../../assets/paysage-bienvenue.png'),
          require('../../assets/homescreen.png'),

        ]);
        
        // Garde le splash visible 2 secondes supplémentaires
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // Cache le splash screen natif
      SplashScreen.hideAsync();
      
      // Navigue vers Home après 3 secondes
      const timer = setTimeout(() => {
        navigation.navigate("Home");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [appIsReady, navigation]);

  if (!appIsReady) {
    return null; // Le splash screen natif reste visible
  }

  return (
    <ImageBackground 
      style={styles.background}
      source={require('../../assets/paysage-bienvenue.png')}
      resizeMode="cover"
    >
      <View style={styles.texte}>
        <Text style={styles.title}>Bienvenue dans Murmure</Text>
      </View> 
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  texte: {
    position: 'absolute',
    top: 370,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', 
    alignItems: 'center', 
  },

   title: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#d99174",
    textAlign: "center",
  },







});












