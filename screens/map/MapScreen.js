import { View, 
         Text, 
         StyleSheet,
         ImageBackground,
         Image,
         Pressable, } from "react-native";

import Button from "../../components/Button";
import Label from "../../components/Label";

export default function MapScreen({ navigation }) {
  return (
    <ImageBackground style={styles.background}
            source={require('../../assets/map.png')}
            resizeMode="cover"
            
    >
      <Image source={require('../../assets/perroquet.png')} 
                     style={styles.perroquet}
      />

        <View style={styles.container}>
          {/* <Text style={styles.title}>Bienvenue sur la Carte</Text>
          <Text style={styles.subtitle}>Ecran Map</Text> */}

          {/* Labels vers Meditations, respirations, chat */}
          <Label style={styles.chapitre1} onPress={() => navigation.navigate("lesson")}>Chapitre 1</Label>

          {/* Bouton Précédent */}
          <Button style={styles.btnBack} onPress={() => navigation.goBack()} type="back" />
        </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  perroquet: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 100,
    height: 100,
    transform: [{ scaleX: -1 }], // Inverse l'image horizontalement
  },
  
  container: {
    flex: 1,
    // backgroundColor: "#fff", // 
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




  chapitre1: {
    position: 'absolute',
    top: 375,  // Plus la valeur est élevée, plus le texte descend depuis le bas
    left: 25,
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
    // textDecorationLine: "underline",
  },

  btnBack: {
    position: 'absolute',
    bottom: 40,
    left: -150,
  },



});
