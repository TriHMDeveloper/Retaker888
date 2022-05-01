import { parse } from "@babel/core";
import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
import dateFormat, { masks } from "dateformat";
export default function MatchesButtonComponent({date, onPress}) {
    
    const convertDate = (date) => {   
        return dateFormat(Date.parse(date),"dd/mm/yyyy");
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.dateText}>
                        {convertDate(date)}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: "flex-start",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    dateText: {
        textAlign: 'left',
        color: 'blue',
        fontSize: 30,
        fontWeight: "bold",
    },
});