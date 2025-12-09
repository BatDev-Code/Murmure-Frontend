import { View, 
         Text, 
         StyleSheet, 
         TouchableOpacity, 
         ImageBackground,
         Image } from "react-native";

import Label from "../../components/Label";

export default function HomeScreen({ navigation }) {
  return (
    <ImageBackground style={styles.background}
        source={require('../../assets/homescreen.png')}
        resizeMode="cover"
        >

        <Image source={require('../../assets/perroquet.png')} 
               style={styles.perroquet}
        />




      <View style={styles.container}>
        {/* <Image source={require('../../assets/perroquet.png')} 
               style={styles.perroquet}
        /> */}

        <Text style={styles.title}>Bienvenue dans Murmure</Text>
        {/* <Text style={styles.subtitle}>Ecran Home (placeholder)</Text> */}


          <View style={styles.labelContainer}>
            {/* Lien vers l'étagère */}
            <Label onPress={() => navigation.navigate("Shelves")} 
                  children="Etagère" 
                  style={styles.etagere}
                  />

            {/* Lien vers la map */}
            <Label onPress={() => navigation.navigate("Map")} 
                  children="Carte" 
                  style={styles.carte}
                  />

          </View>

        {/* Ici ajouter lien vers mon compte */}
      </View>
    </ImageBackground>  
  );
}

const styles = StyleSheet.create({
   background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',  // 'flex-start' pour en haut, 'center' pour centre
    alignItems: 'center', 
  },

  perroquet: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 100,
    height: 100,
  },




  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

    labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
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

  etagere: {
    marginRight: 80,
    marginBottom: 50,
  },

  carte: {
    marginRight: 40,
    marginBottom: 50,
  },











});
