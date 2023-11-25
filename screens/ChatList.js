import { StyleSheet, Text, View,useWindowDimensions, TouchableOpacity,Image,ScrollView
    } from 'react-native'
import React,{useEffect, useState,useContext} from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import {FIREBASE_DB} from '../FirebaseConfig';
import { AuthContext, AuthProvider } from '../AuthContext';

const ChatList = ({navigation,route}) => {

    const windowDimensions = useWindowDimensions()
    const { user} = useContext(AuthContext); // Corrected typo
    const [profilenames, setProfileNames] = useState([{
      'data':'',
      'id':''
    }]);
    const { userE } = route.params;
    

  
    const styles = StyleSheet.create({
        container: {
                    //  flex:1, 
            backgroundColor: '#fff',
            paddingHorizontal:4,
            // alignItems: 'center',
            // justifyContent:'center',
            height: windowDimensions.height, 
            width: windowDimensions.width 
        
          },
          card: {
            borderRadius: 8,
            borderWidth:1,
            marginBottom:10,
            backgroundColor:'#fff',
            borderColor:'#DCDCDC',
            height:80,
            alignItems:'center',
            display:'flex',
            padding:15,
            flexDirection:'row',
            justifyContent:'space-between'
          },
          shadowProp: {
            shadowColor: '#9747FF',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.5,
            shadowRadius: 2,
          },
    })
    useEffect(()=>{
      const fetchData = async()=>{
    const dbProfiles =  await getDocs(collection(FIREBASE_DB,'users'))
    dbProfiles.docs.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data())
      setProfileNames(prevNames => [...prevNames, {'data': doc.data(), 'id':doc.id}])
    });
  }
  fetchData()
  setProfileNames([])

  },[user])
  return (
    <View style={styles.container}>
      <View style={{top:50,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'fixed'}}>
        <View></View>
        <Text style={{fontSize:'32',fontFamily:'Avenir',fontWeight:'bold'}}>Chat</Text>
        <Image style={{width:40,height:40}} source={require('../assets/menu.png')} />
      </View>
      <ScrollView style={{marginTop:80}} >

      {profilenames ? profilenames.map((items)=>
        <TouchableOpacity onPress={()=>navigation.navigate('MessageText',{uId:items.id,userE})} style={[styles.card, styles.shadowProp]}>
                  <Image source={require('../assets/prf.png')} />

            <Text  style={{fontWeight:'500',shadowOpacity: 0,fontSize:18,fontFamily:'Avenir',color:'green'}}>{items.data.username}</Text>
            </TouchableOpacity>

      )
      :null}
                </ScrollView>

      
    </View>
  )
}

export default ChatList

