
import React, { useState, useReducer, useEffect } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput
} from 'react-native';
import NotificationComponent from '../components/NotificationComponent';
import { useForm, useController } from "react-hook-form";

const NotificationScreen = ({ navigation }) => {

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    navigation.addListener('blur', () => {
      setSeenNotices();
    });
    navigation.addListener('focus', () => {
      getNoticesAPI();
    });
    // return unsubscribe;
  }, [navigation]);

  const getNoticesAPI = async () => {
    const APIurl = 'http://10.0.2.2:3000/api/users/notifications';
    await fetch(APIurl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((resJson) => {
        const notices = resJson.list_notice;
        setNotices(notices);
        console.log(notices)
      })
      .catch((error) => {
        console.log("error: " + error);
      })
  }

  const setSeenNotices = async () => {
    const APIurl = 'http://10.0.2.2:3000/api/users/notifications';
    await fetch(APIurl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json())
      .then((resJson) => {
        // const notices = resJson.list_notice;
        // setNotices(notices);
        getNoticesAPI();
        console.log("noti seen: ")
      })
      .catch((error) => {
        console.log("error: " + error);
      })
  }

  const renderItem = ({ item }) => {
    return (
      <NotificationComponent
        // onPress={() => navigation.navigate('MatchScreen')}
        title={item.title}
        description={item.decription}
        datetime={item.datetime}
        is_read={item.is_read}
        type={item.type}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        data={notices}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default NotificationScreen;
