import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
// import QRCode from 'react-native-qrcode-svg';
import {useWindowDimensions} from 'react-native';

const QrCode = ({navigation}) => {
    const windowDimensions = useWindowDimensions()
    const styles = StyleSheet.create({
        container: {
            flexDirection:'column',
            backgroundColor: '#fff',
            alignItems: 'center',
            height: windowDimensions.height, 
            width: windowDimensions.width 
          },
        Qr:{
            marginTop: 150,
        },
        QrContent:{
            margin:50,
            
        }
    })
  return (
    <View style={styles.container}>
        <View style={styles.Qr}>
      {/* <QRCode
      size={200}
      color={'#9747FF'}
      value="http://awesome.link.qr"
    /> */}
    </View>
    <View style={styles.QrContent}>
        <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
        <Text style={{
            fontWeight:'700',
            fontSize:20
        }}>Share Your Profile</Text>
        <Image
        style={{width:40,height:40}}
        source={require('../assets/copyIcon.png')}
        />
        </View>
        <View style={{marginTop:150, backgroundColor:'#50C878',fontWeight:'bold'}}>
        <Button
        title='Next'
        color={'#FFFFFF'}
        onPress={()=>{
            navigation.navigate('ChatList')
        }}
        />
        </View>
    </View>
    </View>
  )
}

export default QrCode

const styles = StyleSheet.create({})