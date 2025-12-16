import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

// Necessary here ? better on app.js ?
import { BACKEND_ADDRESS } from '../../config';

import ConfirmModal from '../../components/ConfirmModal';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';

const chaptersSafe = [
  {
    index: 1,
    logo: '🌏',
    title: "Chapitre 1: pourquoi tu n'as pas fetch les data ?",
    content:
      "Est ce que tu as oublié d'allumer ton back ?\nOu bien tu n'as pas lancé le script pour ajouter les datas à mongo ?\n\nℹ️ Regarde le readme sur le back 😉\n\nPour te punir voila un lorem ipsum\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam scelerisque nunc ac malesuada sollicitudin. Mauris sit amet condimentum tortor. Aliquam volutpat ornare ipsum, ac congue ligula tempus sit amet. Vestibulum pretium nunc lobortis condimentum finibus. Cras in arcu accumsan, fermentum tellus in, volutpat enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a consectetur lectus. Cras purus arcu, varius vel massa eu, eleifend lobortis tortor. Donec vel maximus diam, sed lacinia arcu. Sed quis nulla tempor, condimentum risus eu, varius lacus. Morbi ac iaculis lorem, at mollis ipsum. Nam in leo ante.",
    quiz: {
      questions: [
        {
          question: 'Quand tu marches dehors, tu…',
          answers: [
            "Oublie t'es chaussures",
            'Oublie la poele allumée sur le feu',
            "Oublie de tirer la chasse d'eau",
          ],
        },
        {
          question: 'Pendant les repas, tu…',
          answers: [
            "Oublie t'es chaussures",
            'Oublie la poele allumée sur le feu',
            "Oublie de tirer la chasse d'eau",
          ],
        },
        {
          question: 'Quand une émotion forte arrive, tu…',
          answers: [
            "Oublie t'es chaussures",
            'Oublie la poele allumée sur le feu',
            "Oublie de tirer la chasse d'eau",
          ],
        },
      ],
      results: [
        'Tu devrai marcher pieds nu',
        'Tu devrai souscrire à une assurance !',
        'Va plutot aux toilettes au bureau',
      ],
    },
    flashcard: {
      title: "Qu'est ce qu'on as retenu ?",
      definition: '🔍 bah pas grand chose\n',
      why: '🎯 Que tu est globalement plutot douée en quiz \n',
      keyConcept: "🧩 Et que t'oublie parfois des choses\n",
      exemple: '⚡️ Comme le backend par exemple\n',
      exercice: "📝 Ce message s'autodetruira dans 1312 jours !",
    },
  },
];

export default function LessonScreen({ navigation, route }) {
  const insets = useSafeAreaInsets(); //used to get screen SafeArea dimensions

  const { userToken } = useSelector((state) => state.userConnection || {});

  const [chapters, setChapters] = useState([]);

  const [contentToDisplay, setContentToDisplay] = useState('lesson');
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizQuestionChoice, setQuizQuestionChoice] = useState([]);

  const [showExitPopup, setShowExitPopup] = useState(false); // popup sortie
  const [exitBehavior, setExitBehavior] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND_ADDRESS}/chapters/`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.chapters && data.chapters.length > 0) {
          console.log('✅ Data received from backend');
          setChapters(data.chapters);
        } else {
          console.log('⚠️ Backend empty, loading chaptersSafe');
          setChapters(chaptersSafe);
        }
      })
      .catch((err) => {
        console.log('❌ Fetch error, loading chaptersSafe', err);
        setChapters(chaptersSafe);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Use React navigation parameters. Default to 0 if route parameter not specified
  const chapterIndex = route?.params?.lessonNumber ?? 0;
  const chapter = chapters[chapterIndex] ? chapters[chapterIndex] : chapters[0];

  function DisplayLesson() {
    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleText}>{chapter.title}</Text>
          <Text style={styles.titleLogo}>{chapter.logo}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.contentText}>{chapter.content}</Text>
        </ScrollView>
      </>
    );
  }

  function DisplayQuiz() {
    function handleQuestionChoice(qIndex, choice) {
      const updatedChoices = [...quizQuestionChoice];
      updatedChoices[qIndex] = choice;
      setQuizQuestionChoice(updatedChoices);
      console.log('quiz choices:', updatedChoices);
      updatedChoices.length >= chapter.quiz.questions.length
        ? setContentToDisplay('quizResult')
        : setQuizQuestionIndex(quizQuestionIndex + 1);
    }

    const quizButtons = chapter.quiz.questions[quizQuestionIndex].answers.map(
      (e, i) => {
        return (
          <Button
            key={i}
            onPress={() => handleQuestionChoice(quizQuestionIndex, i)}
            type="question"
            label={e}
          />
        );
      }
    );

    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleQuestion}>
            {chapter.quiz.questions[quizQuestionIndex].question}
          </Text>
        </View>
        <View style={styles.questionContainer}>{quizButtons}</View>
      </>
    );
  }

  function DisplayQuizResult() {
    function findMode(arr) {
      const counts = {};
      for (const element of arr) {
        counts[element] = (counts[element] || 0) + 1;
      }

      // create an object with frequency of answer selection
      const counts2 = arr.reduce(
        (acc, val) => ((acc[val] = (acc[val] || 0) + 1), acc),
        {}
      );
      console.log(counts2);

      // get the most frequent value of each key
      const maxFrequency = Math.max(...Object.values(counts));

      // return the objects with the most frequency
      const modes = Object.keys(counts)
        .filter((element) => counts[element] === maxFrequency)
        .map((element) => parseInt(element));

      // Return 1 if there is no clear mode (aka a tie)
      return modes.length === 1 ? modes[0] : 1;
    }

    const result = chapter.quiz.results[findMode(quizQuestionChoice)];

    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleText}>Resultat du quiz</Text>
        </View>
        <Text style={styles.contentText}>{result}</Text>
      </>
    );
  }

  function DisplayFlashcard() {
    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleText}>{chapter.flashcard.title}</Text>
          <Text style={styles.titleLogo}>{chapter.logo}</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.contentText}>{chapter.flashcard.definition}</Text>
          <Text style={styles.contentText}>{chapter.flashcard.why}</Text>
          <Text style={styles.contentText}>{chapter.flashcard.keyConcept}</Text>
          <Text style={styles.contentText}>{chapter.flashcard.exemple}</Text>
          <Text style={styles.contentText}>{chapter.flashcard.exercice}</Text>
        </ScrollView>
      </>
    );
  }

  async function handleNextButton() {
    switch (contentToDisplay) {
      case 'lesson':
        console.log(chapterIndex);
        // chapterIndex === 0 ? navigation.navigate("Map") : setContentToDisplay("quiz");
        setContentToDisplay('quiz');
        break;
      case 'quizResult':
        setContentToDisplay('flashcard');
        break;
      case 'flashcard':
        // Mettre à jour progressNb
        if (userToken) {
          try {
            const response = await fetch(`${BACKEND_ADDRESS}/users/progress`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                progressNb: chapter.index,
                token: userToken,
              }),
            });
            const data = await response.json();
            if (data.result) {
              console.log('progressNb updated to:', chapter.index);
            } else {
              console.log('Error updating progressNb:', data.error);
            }
          } catch (error) {
            console.log('Fetch error updating progressNb:', error);
          }
        }
        navigation.navigate('Map');
        break;
    }
  }

  return (
    <View style={styles.mainContainer}>
      {/* Top + marginTop dynamic en fonction de l'inset.top */}
      <TouchableOpacity
        onPress={() => {
          setExitBehavior(() => () => navigation.pop(2));
          setShowExitPopup(true);
        }}
        style={[styles.coco, { top: Math.max(insets.top, 20) }]}
      >
        <Image
          source={require('../../assets/coco.png')}
          style={{ width: 130, height: 130, transform: [{ scaleX: -1 }] }}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.contentContainer,
          { marginTop: Math.max(insets.top + 120, 20) },
        ]}
      >
        {(() => {
          switch (contentToDisplay) {
            case 'lesson':
              return DisplayLesson();
            case 'quiz':
              return DisplayQuiz();
            case 'quizResult':
              return DisplayQuizResult();
            case 'flashcard':
              return DisplayFlashcard();
          }
        })()}
      </View>

      {/* marginBottom dynamic en fonction de l'inset.bottom */}
      <View
        style={[styles.buttonContainer, { marginBottom: 20 + insets.bottom }]}
      >
        <Button
          style={{ width: 110 }}
          onPress={() => {
            setExitBehavior(() => () => navigation.goBack());
            setShowExitPopup(true);
          }}
          type="primary"
          label="Quitter"
        />
        {contentToDisplay !== 'quiz' ? (
          <Button
            style={{ width: 110 }}
            onPress={() => handleNextButton()}
            type="primary"
            label="Suivant"
          />
        ) : (
          <Button style={{ backgroundColor: '', width: 110 }} />
        )}
      </View>

      <ConfirmModal
        visible={showExitPopup}
        message="Voulez-vous arrêter la leçon ?"
        onCancel={() => setShowExitPopup(false)}
        onConfirm={() => exitBehavior()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // style for the global screen, coco positioning, contentContainer, buttons
  mainContainer: {
    flex: 1,
    backgroundColor: '#95BE96',
    position: 'relative', //needed for "coco position:absolute" to work
  },
  coco: {
    position: 'absolute', //needed to put coco where we want in the main container. Defaut position behavior top: 0
    right: '10%', //place it 10% to the right of the screen
    width: 130,
    height: 130,
    zIndex: 2, // This define the priority of the image (2 > 1 so image is in front of contentContainer)
  },
  contentContainer: {
    flex: 1, // Donne tout la hauteur restante au contenu (apres le marginTop ici et le margin du buttonContainer )
    marginTop: 140,
    marginBottom: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    padding: 20,
    zIndex: 1,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  // style for Lesson/Result/Flashcard inside of contentContainer
  title: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '600',
  },
  titleLogo: {
    fontSize: 34,
  },
  contentText: {
    fontSize: 18,
    color: '#666',
    lineHeight: 28,
  },
  // style for Quiz inside of contentContainer
  titleQuestion: {
    fontSize: 18,
    fontWeight: '600',
  },
  questionContainer: {
    fontSize: 14,
    lineHeight: 28,
  },
});
