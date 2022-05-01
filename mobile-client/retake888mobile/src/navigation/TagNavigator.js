import React from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackNavigator from '../navigation/StackNavigator';

import HelpScreen from '../screens/HelpScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();
const TagNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="StackScreen" 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'StackScreen') {
                iconName = 'home';
              } else if (route.name === 'ProfileScreen') {
                iconName = 'user';
              } else if (route.name === 'NotificationScreen') {
                iconName = 'bell';
              } else if (route.name === 'HelpScreen') {
                iconName = 'question';
              } 
  
              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            header: () => null,
            tabBarActiveTintColor: '#0066FF',
            tabBarInactiveTintColor: 'gray',
            tabBarHideOnKeyboard: true
          })}>
            <Tab.Screen name="StackScreen" component={StackNavigator} options={{ title: 'Home' }}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }}/>
            <Tab.Screen name="NotificationScreen" component={NotificationScreen} options={{ title: 'Notification' }}/>
            <Tab.Screen name="HelpScreen" component={HelpScreen} options={{ title: 'Help' }}/>
        </Tab.Navigator>
    );
};

export default TagNavigator;