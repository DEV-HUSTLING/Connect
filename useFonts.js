import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    JetBrainsMono: require('./assets/fonts/JetBrainsMono-VariableFont_wght.ttf'),
  });