import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import CustomButton from '../components/CustomButton';

export default function HomeScreen() {
  const [selectedImage, setSelectedImage] = React.useState<string | undefined>(
    undefined
  );

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
    backgroundColor: '#999',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
