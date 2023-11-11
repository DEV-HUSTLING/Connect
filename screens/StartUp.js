import { StyleSheet, Text, View, Image } from 'react-native'
import {useWindowDimensions} from 'react-native';

import React from 'react'

const StartUp = ({navigation}) => {
    const windowDimensions = useWindowDimensions()
const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: windowDimensions.height, 
        width: windowDimensions.width 
      },
    Title:{
        textAlign:'center',
        fontSize: 32,
        // fontFamily:'Handjet'
    }
})
  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/Logo.png')}
      />
      <Text 
              onPress={() => navigation.navigate('Login')}
      style={styles.Title}>CONNECT</Text>
    </View>
  )
}

export default StartUp

