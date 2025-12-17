import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useState } from 'react';
import Button from '../../components/Button';
import ConfirmModal from '../../components/ConfirmModal';
import { BACKEND_ADDRESS } from '../../config';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSignUp = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    fetch(`${BACKEND_ADDRESS}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          setShowSuccessModal(true);
        } else {
          alert(data.error || 'Une erreur est survenue');
        }
      })
      .catch((error) => {
        console.error('Erreur signup:', error);
        alert('Impossible de créer le compte');
      });
  };

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigation.navigate('Compte');
  };

  return (
    <ImageBackground
      source={require('../../assets/paysage-bienvenue.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Text style={styles.title}>Création de compte</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre nom"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="words"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="votre@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <Button label="Créer mon compte" type="primary" onPress={handleSignUp} style={styles.submitButton} />
            </View>

            {/* Bouton retour */}
            <View style={styles.navigationContainer}>
              <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={20} color="#224c4aff" />
                <Text style={styles.backButtonText}>Retour</Text>
              </Pressable>
            </View>

            <ConfirmModal
              visible={showSuccessModal}
              message="Compte créé avec succès ! Maintenant, connectez-vous sur l'écran suivant"
              onConfirm={handleSuccessConfirm}
              singleButton={true}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#224C4A',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#224C4A',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#507C79',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#224C4A',
  },
  submitButton: {
    marginTop: 40,
  },
  // Retour
  navigationContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    zIndex: 10,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#224c4aae',
    backgroundColor: '#fbf3ed9e',
  },

  backButtonText: {
    color: '#224c4aff',
    fontSize: 16,
    fontWeight: '600',
  },
});
