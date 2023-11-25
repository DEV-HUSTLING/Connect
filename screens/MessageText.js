import { StyleSheet, Button,Text, View,useWindowDimensions, SafeAreaView, TextInput,ScrollView
} from 'react-native'
import React,{useEffect, useState,useContext} from 'react'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import {FIREBASE_DB} from '../FirebaseConfig';
import { async } from '@firebase/util';
const MessageText = ({route, navigation}) => {
    const windowDimensions = useWindowDimensions()
    const[userName, setUserName] = useState('')
    const [texting, setTexting] = useState([]);
    const { uId,userE } = route.params;
    const[messList,setMessList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getDoc(doc(FIREBASE_DB, 'users', uId));
                setUserName(userData.data().username);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchData(); // Call the async function
    }, [uId]);
    
    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#fff',
            // alignItems: 'center',
            justifyContent:'center',
            height: windowDimensions.height, 
            width: windowDimensions.width,
        
          },
          input: {
            height: 50,
            width: 280,
            margin: 12,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#C2C2C2',
            padding: 10,
            backgroundColor:'white'
        },
        chat: {
            backgroundColor: '#00000099',
            marginBottom: 20,
            width: 250,
            maxWidth: '100%',
            height: 50,
            borderRadius: 20,
            padding: 10,
            alignSelf: 'flex-start',

          },
          messageText: {
            flexWrap: 'wrap', // Allow text wrapping
            color:'white',
            fontWeight:'600'
          },
    })
    
    const onSend =async()=>{


        // Getting the primary ref
        const docRef = doc(FIREBASE_DB,'users',uId)
        // Creating the secondary ref from the primary ref.
        const messageRef = collection(docRef, 'messages');

  addDoc(messageRef,{
            message: texting,
            timeStamp: Timestamp.now(),
            userName: userE,
        },{ mergeFields: true }).catch(err=>{
            console.log(err)
        })
        fetchMessages()
        setMessList([])
    }
    const fetchMessages = async()=>{
        const docRef = doc(FIREBASE_DB,'users',uId)
        const dbMessages =  await getDocs(collection(docRef,'messages'))
        dbMessages.docs.forEach((doc) => {
            setMessList(prevNames => [...prevNames, doc.data()])
        });
    }
    useEffect(()=>{
        
        fetchMessages()
    },[userE])
  return (
    <View style={styles.container}>
         <View>
      {userName?
      <Text>{userName}</Text>
        
      :null}
      </View>
        <SafeAreaView>
            <ScrollView>
            {messList?messList.map((it)=>
                <View style={styles.chat}>
                    <Text style={styles.messageText}>
                    {it.message}
                    </Text>
                    </View>
                )
            :null}
            </ScrollView>
        </SafeAreaView>
       
      <View style={{paddingRight:20,paddingLeft:5,position:'absolute',bottom:0, display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor: '#00000009'}} >
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setTexting(text)}
        value={texting}
        placeholder="Chat"
        />
        <Button onPress={()=>onSend()} title='Send'/>
      </View>
    </View>
  )
}

export default MessageText