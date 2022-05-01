import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,

}
    from 'react-native'
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../const/color";
import styles from "../styles";


function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const signup = async () => {


        if (!email) {
            alert('Please fill Email')
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        if (confirmPass != password) {
            alert('Password does not match')
            return;
        }
        if (password.length <= 4) {
            alert('Password must be between 4 and 20 characters')
            return;
        }
        await fetch('http://10.0.2.2:3000/api/users/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        }).then(res => {
            if (res.ok) {
                navigation.navigate('SignIn')
                return res.json()
            } else {
                throw Error(res.status)

            }
        }).then(resData => {
            console.log(resData);
        }).catch((error) => {
            console.log("error: " + error);
            alert('Wrong Email or Password')
        })
    }
    return (
        <SafeAreaView style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: "row", marginTop: 40 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 22, color: COLORS.dark }}>Team</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 22, color: COLORS.secondary }}>5+0 </Text>
                </View>
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: "bold", color: COLORS.dark }}>Mock Project</Text>
                    <Text style={{ fontSize: 19, fontWeight: "bold", color: COLORS.light }}>Sign up to continue</Text>
                </View>
                <View style={{ marginTop: 20 }}>

                    <View style={styles.inputContainer}>
                        <Icon name="mail-outline"
                            size={20}
                            color={COLORS.light}
                            style={styles.inputIcon}
                        />
                        <TextInput placeholder="Email"
                            style={styles.input}
                            value={email}
                            onChangeText={(value) => setEmail(value)}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="lock-outline"
                            size={20}
                            color={COLORS.light}
                            style={styles.inputIcon}
                        />
                        <TextInput placeholder="Password"
                            style={styles.input}
                            secureTextEntry
                            value={password}
                            onChangeText={(value) => setPassword(value)}
                        />

                    </View>
                    <View style={styles.inputContainer}>
                        <Icon name="lock-outline"
                            size={20}
                            color={COLORS.light}
                            style={styles.inputIcon}
                        />
                        <TextInput placeholder="Confirm Password"
                            style={styles.input}
                            secureTextEntry
                            value={confirmPass}
                            onChangeText={(value) => setConfirmPass(value)}
                        />

                    </View>

                    <View >
                        <TouchableOpacity style={styles.btnLogin} onPress={signup}>
                            <Text style={styles.title}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            marginVertical: 20,
                            flexDirection: 'row',
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <View style={styles.line} />
                        <Text style={{ fontWeight: 'bold', marginHorizontal: 5 }}>OR</Text>
                        <View style={styles.line}></View>

                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",

                    }}>
                        <View style={styles.btnSecondary}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Sign in with</Text>
                            <Image
                                style={styles.btnImage}
                                source={require("../assets/fb.png")} />
                        </View>
                        <View style={{ width: 10 }} />
                        <View style={styles.btnSecondary}>
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>Sign in with</Text>
                            <Image
                                style={styles.btnImage}
                                source={require("../assets/google.png")} />
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginTop: 40,
                    marginBottom: 20,
                }}>

                    <Text style={{ color: COLORS.light, fontWeight: 'bold' }}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{ color: COLORS.pink, fontWeight: 'bold' }}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default SignUpScreen;