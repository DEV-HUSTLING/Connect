import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  useWindowDimensions,
  SafeAreaView
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import React, { useEffect, useState, useContext } from 'react'
import { addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../FirebaseConfig';
import { async } from '@firebase/util';
const MessageText = ({ route, navigation }) => {
  const windowDimensions = useWindowDimensions()
  const [userName, setUserName] = useState('')
  const [texting, setTexting] = useState([]);
  const { uId, userE ,LgnuId} = route.params;
  const [messList, setMessList] = useState([])
  const [dpfile,setDpfile] =useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getDoc(doc(FIREBASE_DB, 'users', uId));
        setUserName(userData.data().username);
        setDpfile(userData.data().profileImage)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData(); // Call the async function
  }, [uId]);
    useEffect(() => {
      if (userName) {
        navigation.setOptions({
          headerTitle: userName,
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              {dpfile ? (
                <Image
                  source={{ uri: dpfile }}
                  style={{ width: 30, height: 30, borderRadius: 15 }}
                />
              ) : null}
            </View>
          ),
          headerTitleAlign: 'center', // Align title to the center
          headerTitleStyle: {
            alignSelf: 'center', // Center title within the header
          },
        });
      }
    }, [userName]);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      justifyContent: 'center',
      height: windowDimensions.height,
      width: windowDimensions.width,

    },
    input: {
      height: 40,
      width: 280,
      margin: 12,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: '#C2C2C2',
      padding: 10,
      backgroundColor: 'white'
    },
    bottomBar: {
      // position: 'fixed',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // backgroundColor: '#fff',
      // padding: 10,
      // bottom:0,
      flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    },
    chat: {
      backgroundColor: '#101018',
      marginBottom: 20,
      maxWidth: '85%',
      borderRadius: 10,
      padding: 10,
      alignSelf: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft: 10,
    },
    chatsender: {
      backgroundColor: '#AF7AD5',
      marginBottom: 20,
      maxWidth: '85%',
      borderRadius: 10,
      padding: 10,
      alignSelf: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginLeft: 10
    },
    messageText: {
      color: 'white',
      fontWeight: '600',
      flexWrap: 'wrap', // Allow text wrapping
    },
    shadowProp: {
      shadowColor: '#9747FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 3,
    },
    // scrollViewContainer: {
    //   flex: 1, // Adjust the value as needed
    //   marginBottom:50,
    // },
  })


  const onSend = async () => {
    const senderId = LgnuId; 
    const receiverId = uId;
    const chatId = `${senderId}_${receiverId}`;

    const chatDocRef = doc(FIREBASE_DB, 'chats', chatId);

    const messageRef = collection(chatDocRef, 'messages');

    try {
      await addDoc(messageRef, {
        message: texting,
        timeStamp: Timestamp.now(),
        userName: userE,
      });
      
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setTexting([])

  }
  
  const [mess2List, setMess2List] = useState([])
   const fetchMessages = async () => {
    const senderId = LgnuId; 
    const receiverId = uId;
    const chatId = `${senderId}_${receiverId}`;
    const fetchID = `${receiverId}_${senderId}`
    const docRef = doc(FIREBASE_DB, 'chats', chatId)
    const fetchdocRef = doc(FIREBASE_DB, 'chats', fetchID)
    const dbMessages = await getDocs(collection(docRef, 'messages'))
    setMessList([])

    dbMessages.docs.forEach((doc) => {
      setMessList(prevNames => [...prevNames, doc.data()].sort((a, b) => b.timestamp - a.timestamp))
    })
    setMess2List([])

    const dbMessages2 = await getDocs(collection(fetchdocRef, 'messages'))
    dbMessages2.docs.forEach((doc) => {
      setMess2List(prevNames => [...prevNames, doc.data()].sort((a, b) => b.timestamp - a.timestamp))
    })

  }

  useEffect(() => {
    fetchMessages()
  }, [userE])
  return (
    <KeyboardAwareScrollView
    
    >
      <View style={styles.container}>

        <SafeAreaView style={{
                marginTop: 100,
                padding:10
        }}>
          <ScrollView
            ref={(scrollView) => {
              this.scrollView = scrollView;
            }}
            onContentSizeChange={() => {
              this.scrollView.scrollToEnd({ animated: true });
            }}
            style={styles.scrollViewContainer} // Updated style here

          >
            {mess2List
              ? mess2List.map((it, index) => (
                <View
                  key={index}
                  style={
                      [styles.chatsender, styles.shadowProp]
                  }
                >
                  <Text style={styles.messageText}>{it.message}</Text>
                  <Text style={{ color: 'yellow' }}>
                    {it.userName?.split('@')?.[0] ?? null}
                  </Text>
                </View>
              ))
              : null}
              {messList
              ? messList.map((it, index) => (
                <View
                  key={index}
                  style={
                      [styles.chat, styles.shadowProp]
                  }
                >
                  <Text style={styles.messageText}>{it.message}</Text>
                  <Text style={{ color: 'yellow' }}>
                    {it.userName?.split('@')?.[0] ?? null}
                  </Text>
                </View>
              ))
              : null}
          </ScrollView>
        </SafeAreaView>
        <View
          style={styles.bottomBar}
        >
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTexting(text)}
            value={texting}
            placeholder="Chat"
          />
          <TouchableOpacity onPress={onSend}>
            <Image
              style={{
                height: 40,
                width: 40,
                marginLeft: 20,
              }}
              source={require('../assets/send.png')}
            />
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}

export default MessageText