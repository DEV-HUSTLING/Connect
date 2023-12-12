import { ScrollView,
    Platform,StyleSheet, Text, View, Button, TextInput, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { useWindowDimensions } from 'react-native';
import QrCode from './QrCode';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import {FIREBASE_DB} from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile,UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import ImageUpload from './ImageUpload'
import { getStorage, ref, uploadString, getDownloadURL, } from 'firebase/storage';

import * as FileSystem from 'expo-file-system';

const Register = ({navigation}) => {
    const windowDimensions = useWindowDimensions()
    const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [file, setFile] = useState(null);
const [error, setError] = useState(null);
const storage = getStorage(); // Initialize the storage object

const auth = FIREBASE_AUTH;
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            alignItems: 'center',
            alignContent: 'center',
            height: windowDimensions.height,
            width: windowDimensions.width
        },
        Title: {
            textAlign: 'center',
            fontSize: 32,
            // fontFamily:'Handjet'
        },
        input: {
            height: 40,
            width: 200,
            margin: 12,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#C2C2C2',
            padding: 10,
        },
        logo: {
            width: 45,
            height: 45
        },
        register: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
        }
    })

    const signIn = async()=>{
        try{
            const response = await createUserWithEmailAndPassword(auth,email,password);
            await updateProfile(response.user, { displayName: username });

            creatDBuserProfile(response, file);
           
            navigation.navigate('Login')

        }
        catch(error){
            alert(error.message);
        }
    }
    const creatDBuserProfile = async(response,uri)=>{
        try{
            const dbDoc = await setDoc(doc(FIREBASE_DB,`users/${response.user.uid}`),{
                username,
                email: response.user.email,
                profileImage: uri,
            });
        }
        catch(error){
            console.log(error);
        }
    }
        
  const uploadImageToStorage = async (userId) => {
    const base64 = await FileSystem.readAsStringAsync(file, {
        encoding: FileSystem.EncodingType.Base64,
      });

    try {
        const storageRef = ref(storage, `profile_images/${userId}`);
        await uploadString(storageRef, `data:image/jpg;base64,${base64}`, 'base64');
    
      // Get the download URL for the image
      const imageUrl = await getDownloadURL(storageRef);

      // Update user profile with the image URL
      await updateProfile(auth.currentUser, { photoURL: imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
 


      
    return (
        <View style={styles.container}>
            <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      
    >
            <View style={{
            flexDirection: 'column',
            backgroundColor: '#fff',
            alignItems: 'center',
            marginTop:10,
            height: windowDimensions.height,
            width: windowDimensions.width

            }}>

            <Text style={{marginTop:30, fontSize:30,backgroundColor:'yellow',padding:10,borderWidth:1,borderColor:'yellow',borderRadius:10}}>Sign Up</Text>
            
            <SafeAreaView style={{flex:1, alignItems:'center',marginTop:30}}>
            
            <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setUsername(text)}
                    value={username}
                    placeholder="username"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>setEmail(text)}
                    value={email}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(text)=>setPassword(text)}
                    value={password}
                    placeholder="Password"
                />
      <ImageUpload file={file} setFile={setFile} setError={setError} error={error} storage={storage} />
                <View 
                style={{backgroundColor:'#006ED6', width:80,borderRadius:'5',marginTop:50}}
                >
                
                <Button
                title="Submit"
                color={'#FFFFFF'}
                onPress={
                    () =>signIn()
                }
            />
            </View>

            </SafeAreaView>
            </View>
            </ScrollView>

        </View>
    )
}

export default Register