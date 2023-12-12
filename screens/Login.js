import {  KeyboardAvoidingView,
    Platform,
    StyleSheet, Text, View, Button, TextInput, SafeAreaView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { useWindowDimensions } from 'react-native';
import QrCode from './QrCode';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { updateProfile } from 'firebase/auth';

const Login = ({navigation}) => {
   
    const windowDimensions = useWindowDimensions()
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
// const [loading,setLoading] = useState(false);
const auth = FIREBASE_AUTH;
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            backgroundColor: '#9701FF',
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
            backgroundColor:'#fff'
        },
        logo: {
            width: 45,
            height: 45
        },
        register: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            // backgroundColor:'#fff',
            paddingHorizontal:15,
            marginTop:20,
            fontWeight:'bold',
            fontSize: 32
        }
    })
 
    const signIn = async()=>{
        try{
            const response = await signInWithEmailAndPassword(auth,email,password);

            navigation.navigate('ChatList',{userE:response.user.email,LgnuId:response.user.uid})
        }
        catch(error){
            alert(error.message);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{
            flexDirection: 'column',
            backgroundColor: '#9701FF',
            alignItems: 'center',
            marginTop:150,
            height: windowDimensions.height,
            width: windowDimensions.width

            }}>
            {/* <Image
                style={styles.logo}
                source={require('../assets/googleIcon.png')}
            />
            <Button
                title="Google"
                onPress={() => Alert.alert('Simple Button pressed')}
            /> */}

            <Text style={{marginTop:30, fontSize:30,fontWeight:'bold',color:'lightgreen',padding:10}}>Log In</Text>
            <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
            <SafeAreaView style={{flex:1, alignItems:'center',marginTop:30}}>
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
                style={{backgroundColor:'#fff', width:80,borderRadius:'50',marginTop:50}}
                >
                
                <Button
                title="Login"
                color={'green'}
                onPress={
                    () =>signIn()
                }
            />
            </View>
            <View style={styles.register}>
                <Text>No Account?</Text>
                <TouchableOpacity
                    onPress={()=>            
                    navigation.navigate('Register')
                }
                >
                    <Text style={{color:'#fff',fontWeight:'bold'}} >Register</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
            </KeyboardAvoidingView>
            </View>
        </View>
    )
}

export default Login

