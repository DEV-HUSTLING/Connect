import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Corrected import

import StartUp from './screens/StartUp';
import Login from './screens/Login';
import QrCode from './screens/QrCode';
import ChatList from './screens/ChatList';
import Register from './screens/Register';
import MessageText from './screens/MessageText';
import Menu from './screens/Menu';
import ChatBot from './screens/ChatBot';
const Stack = createStackNavigator(); // Corrected function name

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{  cardStyle: { backgroundColor: 'transparent' } }}>
        <Stack.Screen options={{headerShown: false}} name="StartUp" component={StartUp} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="MessageText" component={MessageText} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="ChatBot" component={ChatBot} />

        {/* <Stack.Screen name="Profile" component={QrCode} /> */}
        <Stack.Screen name="ChatList" 
      options={{headerShown: false}}
        component={ChatList} />
      </Stack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    // <StartUp />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
