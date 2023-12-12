import { StyleSheet, useWindowDimensions,View, Text,Image, TouchableOpacity,Button } from 'react-native'
import React,{useEffect,useState} from 'react'
import {signOut,getAuth} from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, updateDoc,arrayRemove } from 'firebase/firestore';
import {FIREBASE_DB} from '../FirebaseConfig';
import { async } from '@firebase/util';

const Menu = ({route, navigation,LgnuId}) => {
  const windowDimensions = useWindowDimensions()
  const auth = getAuth();

const[reqName, setReqName] = useState([])
// const containerHeight = reqName.length -windowDimensions; // Assuming 20 as line height, adjust as needed

const[reqStatus, setReqStatus] = useState(0)

  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      right: 2,
      top:85,
      backgroundColor:'#fff',
      width: windowDimensions.width-100,
      // height:containerHeight,
      padding:15,
      borderBottomLeftRadius:15,
      borderTopLeftRadius:15,
      
    },
    shadowProp: {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity:0.5,
      shadowRadius: 1.5,
    },
    })
    signOutUser = async () => {
      try {
          await signOut(auth);
          navigation.navigate('Login')
        } catch (e) {
          console.log(e);
      }
  }
  useEffect(() => {
    let userRequestsData =[]
    const fetchdata = async()=>{
      const reqdocref = await getDoc(doc(FIREBASE_DB, 'users', LgnuId));  
      const currentFriendRequests = await reqdocref.data().Pending;
      await Promise.all(
        currentFriendRequests.map(async (userId) => {
          try {
            const userData = await getDoc(doc(FIREBASE_DB, 'users', userId));
            userRequestsData.push({ id: userId, data: userData.data() });
          } catch (error) {
            console.error(`Error fetching user data for user ID ${userId}:`, error);
          }
        })
      );
      setReqName(userRequestsData);
      
      

    }
    fetchdata()
    
  }, [LgnuId])
  // if(reqName.length!==0){
  //   console.log(reqName)
  //   reqName.map((it)=>{
  //     console.log(it.data())
  //     console.log(it.id)
    
  //    })
  // }
const acceptReq = async(reqID)=>{
  setReqStatus(1)
  const currentUserDocRef = doc(FIREBASE_DB, 'users', LgnuId);
  const requestUserDocRef = doc(FIREBASE_DB, 'users', reqID);
  const currentUserDoc = await getDoc(currentUserDocRef);
  const requestUserDoc = await getDoc(requestUserDocRef);

    const currentaccept = currentUserDoc.data().acceptList || [];
    const pendingList = currentUserDoc.data().Pending;
    const sentReqList = requestUserDoc.data().sentReqList;
    const sentReqAcceptList = requestUserDoc.data().acceptList||[];

console.log(pendingList);
console.log(reqID)

    if (pendingList.includes(reqID)) {
      await updateDoc(currentUserDocRef, {
        acceptList: [...currentaccept, reqID],
      });
      console.log('added to accept')
    }
    if (currentaccept.includes(reqID)) {
      const updatedPending = pendingList.filter(id => id !== reqID);

  await updateDoc(currentUserDocRef, {
    Pending: updatedPending,
  });

  console.log('removed from Pending');
    }
    if(sentReqList.includes(LgnuId)){
      await updateDoc(requestUserDocRef, {
        acceptList: [...sentReqAcceptList, LgnuId],
      });
      console.log('added to accept from pending')
    }
}  

  return (
    <View style={[styles.container,styles.shadowProp]}>
      <TouchableOpacity style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:25
      }}
      onPress={()=>{
        signOutUser()

      }}
      >
      <Text
      style={{
        fontSize:20,
        fontFamily:'Avenir',
        fontWeight:'bold'
      }}
      >LogOut</Text>
      <Image source={require('../assets/logOut.png')}/>
      </TouchableOpacity>
      {reqStatus==0&& reqName.length > 0 ? (
  reqName.map((item, index) => (
    <View
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
     
         <Text key={index}>{item.data.username}</Text>
        
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Button onPress={() => acceptReq(item.id)} title='Accept' />
        <Button onPress={()=> setReqStatus(2)}title='Reject' />
      </View>
    </View>
  ))
)

:null}
      
    </View>
  )
}

export default Menu