import React from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
} from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome'
export default function NotificationComponent({ title, datetime, description, is_read, type, onPress }) {

    const addIcon = (iconName) => {
        switch (iconName) {
            case 'bet':
                return <Icon name='dollar'
                    size={50} style={styles.iconStyle} color='#E9AD03' />
                break;
            case 'message':
            default:
                return <Icon name='comment'
                    size={50} style={styles.iconStyle} color='#C4C4C4' />
                break;
        }
    }

    const checkRead = (is_read) => {
        if(!is_read){
            return styles.unreadText;
        }else return;
    }

    return (
        <View>
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
                <View style={styles.buttonStyle}>
                    <View style={styles.iconContainer}>
                        {addIcon(type)}
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={[styles.titleText, checkRead(is_read)]}>{title}</Text>
                        <Text style={[styles.descriptionText, checkRead(is_read)]}>{description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    iconStyle: {
        marginHorizontal: 10,
    },
    titleText: {
        textAlign: 'left',
        fontSize: 28,
        fontWeight: "bold",
    },
    unreadText: {
        color: 'black'
    },
    descriptionText: {
        textAlign: 'left',
        fontSize: 20,
    },
    iconContainer: {
        width: '20%',
        justifyContent: "center",
        alignItems: "center"
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 10,
    }
});