import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { useWindowDimensions } from 'react-native';
import QrCode from './QrCode';

const Login = ({navigation}) => {
    const windowDimensions = useWindowDimensions()

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
            <Image
                style={styles.logo}
                source={require('../assets/googleIcon.png')}
            />
            <Button
                title="Google"
                onPress={() => Alert.alert('Simple Button pressed')}
            />

            <Text style={{marginTop:30}}>or</Text>
            <SafeAreaView style={{flex:1, alignItems:'center',marginTop:30}}>
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeText}
                    // value={text}
                    placeholder="Email"
                />
                <TextInput
                    style={styles.input}
                    // onChangeText={onChangeText}
                    // value={text}
                    placeholder="Password"
                />
                <View 
                style={{backgroundColor:'#006ED6', width:80,borderRadius:'5',marginTop:50}}
                >
                <Button
                title="Login"
                color={'#FFFFFF'}
                onPress={() => navigation.navigate('Profile')}
            />
            </View>
            <View style={styles.register}>
                <Text>No Account?</Text>
                <Button
                    title='Register'
                />
            </View>
            </SafeAreaView>
            
            </View>
        </View>
    )
}

export default Login

