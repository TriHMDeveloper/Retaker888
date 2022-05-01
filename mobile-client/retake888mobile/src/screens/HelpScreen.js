
import React, { useState, useReducer } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

import { useForm, useController } from "react-hook-form";


const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.helpTitle}>
        How To Play
      </Text>
      <Text style={styles.helpContent}>
      To be able to place a bet, you must click on a match then select a team and place a bet.
       After the match has the results, the application will send a notification to you.
       If you win you will get your bet back and have more money equal to the bet amount.
       If you lose you lose your bet amount.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  helpTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10
  },
  helpContent: {
    fontSize: 25,
    textAlign: 'justify'
  },
});

export default HelpScreen;
