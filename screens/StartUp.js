import { StyleSheet, Text, View, Image } from 'react-native';
import { useWindowDimensions } from 'react-native';
import React, { useEffect, useContext } from 'react'; // Correct import
import { AuthContext, AuthProvider } from '../AuthContext';

const InitialLayout = ({ navigation }) => {
  const windowDimensions = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: windowDimensions.height,
      width: windowDimensions.width,
    },
    Title: {
      textAlign: 'center',
      fontSize: 32,
      // fontFamily:'Handjet'
    },
  });
  
  const { user, initialized } = useContext(AuthContext); // Corrected typo
  useEffect(() => {
    console.log('start page');
    if (!initialized) {
      return;
    }
    if (user) {
      console.log('user exists, forward to chat');
      navigation.navigate('ChatList');
    } else {
      console.log('user does not exist, forward to login');
      navigation.navigate('Login');
    }
  }, [initialized]);

  return (
    <>
      {initialized && user ? (
                <Text>loading....</Text>

      ) : (
        <View style={styles.container}>
          <Image source={require('../assets/Logo.png')} />
          <Text onPress={() => navigation.navigate('Login')} style={styles.Title}>
            CONNECT
          </Text>
        </View>
      )}
    </>
  );
};

const StartUp = ({ navigation }) => {

  return (
    <AuthProvider>
      <InitialLayout navigation={navigation} />
    </AuthProvider>
  );
};

export default StartUp;
