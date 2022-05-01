import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TagNavigator from './src/navigation/TagNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from "../retake888mobile/src/screens/SignInScreen";
import SignUpScreen from "../retake888mobile/src/screens/SignUpScreen";
import {Image,Animated,View} from "react-native";
import styles from './src/styles';
 const Stack = createStackNavigator();

 function Splash ({navigation}) {
  setTimeout(()=>{
      navigation.navigate('SignIn')
  },3000)
  return(
   <View style={styles.container}>
       <Animated.Image
           source ={require('../retake888mobile/src/assets/1.jpg')}
           style={{width:'80%',resizeMode:'contain',margin:30}}
       />
   </View>
)
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions ={{header:()=> null}}
       
      >
        <Stack.Screen name="Splash" component={Splash}/>
        <Stack.Screen name="SignIn" component={SignInScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>  
        <Stack.Screen name="Main" component={TagNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
