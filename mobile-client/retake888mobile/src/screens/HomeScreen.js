
import React, { useState, useReducer, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ImageBackground
} from 'react-native';
import MatchesDateButtonComponent from '../components/MatchesDateButtonComponent';
import backGround from '../assets/lol-background.png'


const HomeScreen = ({ navigation, route }) => {
    const [matchesDate, setMatchesDate] = useState([])

    // const matchesDate = route.params.match;

    useEffect(() => {
        navigation.addListener('focus', () => {
            getMatchesDateAPI();
        });  
        return () => {

        }
    }, [navigation])

    const getMatchesDateAPI = async () => {
        const APIurl = 'http://10.0.2.2:3000/api/matches/date';
        await fetch(APIurl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((resJson) => {
                const days = resJson;
                setMatchesDate(days);
                console.log(days)
            })
            .catch((error) => {
                console.log("error: " + error);
            })
    }

    const renderItem = ({ item }) => {
        return (
            <MatchesDateButtonComponent
                onPress={() => navigation.navigate('MatchScreen', { date: item.date })}
                date={item.date}
            />
        );
    }

    return (
        <ImageBackground source={backGround} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <FlatList
                    keyExtractor={item => item.date}
                    showsVerticalScrollIndicator={false}
                    data={matchesDate}
                    renderItem={renderItem}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
});

export default HomeScreen;
