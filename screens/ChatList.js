import { StyleSheet, Text, View, TouchableOpacity,
    Linking} from 'react-native'
import React from 'react'
import {useWindowDimensions} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';


const ChatList = () => {
    const windowDimensions = useWindowDimensions()

    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent:'center',
            height: windowDimensions.height, 
            width: windowDimensions.width 
        
          },
    })
    onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
          console.error('An error occured', err)
        );
      };
  return (
    <View style={styles.container}>
      <Text style={{color:'#9747FF', fontWeight:'bold'}}>Add Friends</Text>
    
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </View>
  )
}

export default ChatList

