import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Image, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { useWindowDimensions } from 'react-native';
import QrCode from './QrCode';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import {FIREBASE_DB} from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { updateProfile,UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const Register = ({navigation}) => {
    const windowDimensions = useWindowDimensions()
    const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
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

            creatDBuserProfile(response);
            navigation.navigate('Login')

        }
        catch(error){
            alert(error.message);
        }
    }
    const creatDBuserProfile = async(response)=>{
        try{
            const dbDoc = await setDoc(doc(FIREBASE_DB,`users/${response.user.uid}`),{
                username,
                email: response.user.email,
            });
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{
            flexDirection: 'column',
            backgroundColor: '#fff',
            alignItems: 'center',
            marginTop:150,
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
        </View>
    )
}

export default Register