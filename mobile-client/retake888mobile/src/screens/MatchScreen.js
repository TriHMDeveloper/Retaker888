
import React, { useState, useReducer, useEffect } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    FlatList,
    ImageBackground
} from 'react-native';
import MatchButtonComponent from '../components/MatchButtonComponent';
import backGround from '../assets/lol-background.png'

const FlatListDemoScreen = ({ route, navigation }) => {
    // const [matches, dispatch] = useReducer(reducer, DATA)
    // const [isRender, setIsRender] = useState(false)
    const [matches, setMatches] = useState([]);
    const [isRender, setIsRender] = useState(false);
    const mockData = [
        {
            match: {
                datetime: "18:00", shortName1: "SKT", name1: "SK Telecom T1", ava1: require("../assets/T1.png"), shortName2: "HLE", name2: "Hana lele", ava2: require("../assets/HLE.png"), status: "open", result: "", id: "1"
            },
            moneyBet: 500, teamBet: "SKT", status: "waiting", id: "123"
        },
        {
            match: {
                datetime: "18:00", shortName1: "SKT", name1: "SK Telecom T1", ava1: require("../assets/T1.png"), shortName2: "HLE", name2: "Hana lele", ava2: require("../assets/HLE.png"), status: "open", result: "", id: "1"
            },
            moneyBet: 0, teamBet: "", status: "NoBet", idBet: ""
        }
    ]

    const { date } = route.params;

    useEffect(() => {
        getMatchesByDate(date);
        return () => {

        }
    }, [navigation]);

    const getMatchesByDate = async (date) => {
        const APIurl = 'http://10.0.2.2:3000/api/matches/date/' + date;
        await fetch(APIurl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json())
            .then((resJson) => {
                const matchesData = resJson;
                setMatches(matchesData);
                setIsRender(false);
                console.log(matchesData);
                console.log("okok: " + isRender)
            })
            .catch((error) => {
                console.log("error: " + error);
                setIsRender(false);
            })
    }

    const renderItem = ({ item }) => {
        return (
            <MatchButtonComponent
                id={item.match.id}
                time={item.match.time}
                shortName1={item.match.shortname1}
                team1Logo={item.match.ava1}
                shortName2={item.match.shortname2}
                team2Logo={item.match.ava2}
                status={item.match.status}
                result={item.result}
                betStatus={item.status}
                teamBet={item.teamBet}
                moneyBet={item.moneyBet}
                idBet={item.idBet}
                // loadAfterBet={() => { setIsRender(true); console.log("hoho") }}
            />
        );
    }

    return (
        <ImageBackground source={backGround} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <FlatList
                    keyExtractor={item => item.match.id}
                    showsVerticalScrollIndicator={false}
                    data={matches}
                    renderItem={renderItem}
                    removeClippedSubviews={false}
                    // extraData={isRender}
                    // refreshing={isRender}
                    // onRefresh={() => getMatchesByDate(date)}
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

export default FlatListDemoScreen;
