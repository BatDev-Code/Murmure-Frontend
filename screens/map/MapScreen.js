import { BACKEND_ADDRESS } from '../../config';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

import Button from '../../components/Button';
import ChapterButton from '../../components/ChapterButton';
import ParrotChatBtn from '../../components/ParrotChatBtn';
import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setAllChapters } from '../../reducers/chapters';

export default function MapScreen({ navigation }) {
  const [progress, setProgress] = useState(1); // valeur initiale 1
  const TOTAL_LESSONS = 6;

  const dispatch = useDispatch();

  // Récupérer le progressNb de l'utilisateur depuis Redux
  const userProgressNb = useSelector(
    (state) => state.userConnection?.progressNb || 0
  );

  useEffect(() => {
    fetch(`${BACKEND_ADDRESS}/chapters/`)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.chapters);
        dispatch(setAllChapters(data.chapters));
        console.log('dispatched chapters');
      });
  }, []);

  // --> Au démarrage dans un use Effect on récupérer la valeur du progress et on fait setProgress(nbreçu)

  return (
    <ImageBackground
      style={styles.background}
      source={require('../../assets/map.png')}
      resizeMode="cover"
    >
      {/* Chat modale */}
      <ParrotChatBtn
        onPress={() => navigation.navigate('Chat')}
        style={styles.perroquet}
      />

      {/* Barre de progres */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${(progress / TOTAL_LESSONS) * 100}%` },
            ]}
          />
        </View>

        <Text style={styles.progressText}>
          Étape {progress} / {TOTAL_LESSONS}
        </Text>
      </View>

      <View style={styles.container}>
        {/* <Text style={styles.title}>Bienvenue sur la Carte</Text>
          <Text style={styles.subtitle}>Ecran Map</Text> */}

        {/* Labels vers Meditations, respirations, chat */}
        {/* Chapitre 3 */}
        <ChapterButton
          chapterNumber={3}
          progressNb={userProgressNb}
          onPress={() => navigation.navigate('Lesson', { lessonNumber: 2 })}
          style={styles.chapitre3}
        />

        {/* Chapitre 2 */}
        <ChapterButton
          chapterNumber={2}
          progressNb={userProgressNb}
          onPress={() => navigation.navigate('Lesson', { lessonNumber: 1 })}
          style={styles.chapitre2}
        />

        {/* Chapitre 1 */}
        <ChapterButton
          chapterNumber={1}
          progressNb={userProgressNb}
          onPress={() => navigation.navigate('Lesson', { lessonNumber: 0 })}
          style={styles.chapitre1}
        />

        {/* Bouton Précédent */}
        <Button
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
          type="back"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    // alignItems: "center",
    // justifyContent: "center",
  },

  perroquet: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 100,
    height: 100,
    transform: [{ scaleX: -1 }], // Inverse l'image horizontalement
  },

  container: {
    flex: 1,
    // backgroundColor: "#fff", //
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  // Progressbar
  progressContainer: {
    position: 'absolute',
    top: 160,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 18,
  },

  progressBackground: {
    height: 10,
    backgroundColor: '#E2E2E2',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#507C79',
    borderRadius: 10,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 13,
    color: '#433C35',
    fontWeight: '600',
    letterSpacing: 0.4,
  },

  chapitre1: {
    top: 767,
    left: 236,
  },

  chapitre2: {
    top: 642,
    left: 313,
  },

  chapitre3: {
    top: 604,
    left: 30,
  },

  btnBack: {
    position: 'absolute',
    bottom: 40,
    left: 20,
  },
});
