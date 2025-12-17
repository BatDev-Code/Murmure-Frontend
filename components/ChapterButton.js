import { View, Text, StyleSheet, Pressable, Image } from 'react-native';

export default function ChapterButton({
  chapterNumber,
  progressNb,
  onPress,
  style
}) {
  // Choix de l'image selon le progressNb
  const imageSource = chapterNumber <= progressNb
    ? require('../assets/feudebois.png')
    : require('../assets/feusansfeu.png');

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && styles.pressed
      ]}
    >
      <Image
        source={imageSource}
        style={styles.image}
      />
      <Text style={styles.label}>
        Chapitre {chapterNumber}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 70,
    height: 70,
  },
  label: {
    position: 'absolute',
    bottom: -25,
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});