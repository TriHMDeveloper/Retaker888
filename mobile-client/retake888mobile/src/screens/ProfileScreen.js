import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Alert,

}
    from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwsome from "react-native-vector-icons/FontAwesome";
import COLORS from "../const/color";
import styles from "../styles";
function Profile({ navigation, props }) {
    const [account, setAccount] = useState([]);

    useEffect(() => {
        navigation.addListener('focus', () => {
            getProfile();
        });
        return () => {

        }
    }, [navigation])
    const getProfile = () => {
        const apiURL = 'http://10.0.2.2:3000/api/users/currentuser';
        fetch(apiURL)
            .then((res) => res.json())
            .then((resJson) => {
                console.log(resJson);
                setAccount(resJson.account)
            }).catch((error) => {
                console.log('Error:', error);
            })
    }

    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={{ marginTop: 70 }} >
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Information
                    </Text>
                    <View style={styles.inputContainer}>

                        <AntDesign name="user"
                            size={20}
                            color={COLORS.light}
                            style={styles.inputIcon}
                        />
                        <TextInput placeholder="Email"
                            style={styles.input}
                            value={account.email}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="attach-money"
                            size={20}
                            color={COLORS.light}
                            style={styles.inputIcon}
                        />
                        <TextInput placeholder="Money"
                            style={styles.input}
                            value={account.money + ""}
                            editable={false}
                            selectTextOnFocus={false}
                        />
                    </View>

                    <View >
                        <TouchableOpacity style={styles.btnLogout}
                            onPress={() => {

                                Alert.alert(
                                    'Logout',
                                    'Are you sure? you want to logout?',
                                    [
                                        {
                                            text: 'Cancel',
                                            onPress: () => {
                                                return null;
                                            },
                                        },
                                        {
                                            text: 'Confirm',
                                            onPress: () => {

                                                navigation.replace('SignIn');
                                            },
                                        },
                                    ],
                                    { cancelable: false }
                                )
                            }}>

                            <Text style={styles.title}>Logout</Text>

                        </TouchableOpacity>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Profile;
