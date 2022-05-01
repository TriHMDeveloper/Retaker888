import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import MatchScreen from '../screens/MatchScreen';
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="DateMatchesScreen">
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Matches Date' }} />
            <Stack.Screen name="MatchScreen" component={MatchScreen} options={{ title: 'Match' }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;