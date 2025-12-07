import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import screens
// import LoadingScreen from "../screens/loading/LoadingScreen";
import HomeScreen from "../screens/home/HomeScreen";

// Meditations
// import AccueilMeditationsScreen from "../screens/meditations/AccueilMeditationsScreen";
// import MeditationsPlayerScreen from "../screens/meditations/MeditationsPlayerScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >
      {/* Ici que chacun déplace en premier l'écran qu'il est en train de coder!! */}
     
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* Auth */}
      {/* <Stack.Screen name="AuthChoice" component={AuthChoiceScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Account" component={AccountScreen} /> */}



    </Stack.Navigator>
  );
}