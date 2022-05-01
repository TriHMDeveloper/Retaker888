import React from "react";
import { Component } from "react";
import{
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Animated,  
}
from 'react-native';
import COLORS from "../const/color";
import styles from "../styles";
export default class Splash extends Component{
    state={
        logoOpacity: new Animated.Value(0),
    }
    async componentDidMount(){
      Animated.sequence([
        Animated.timing(this.state.logoOpacity,{
            toValue:1,
            duration:4000,
            useNativeDriver: true
        }),
      ]).start(()=>{
        // navigation.navigate('SignUp')
      })
    }
    render() {
        return(
            <View style={styles.container}>
                <Animated.Image 
                source={require('../assets/1.jpg')}
               style={{...styles.logo,opacity:this.state.logoOpacity}}
                />
                
            </View>
        )
    }
}