import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Pressable,
    TextInput
} from "react-native"
import dateFormat, { masks } from "dateformat";
import Icon from 'react-native-vector-icons/FontAwesome'
export default function MatchButtonComponent({ time, shortName1, team1Logo, shortName2, team2Logo, status,
    teamBet, moneyBet, result, betStatus, id, idBet, loadAfterBet }) {
    const [betId, setbetId] = useState(idBet);
    const [statusBet, setStatusBet] = useState(betStatus);
    const [modalVisible, setModalVisible] = useState(false);
    const [chooseTeam, setChooseTeam] = useState(teamBet);
    const [chooseTeamModal, setChooseTeamModal] = useState(teamBet);
    const [moneyToBet, setMoneyToBet] = useState(moneyBet);
    const [moneyToBetModal, setMoneyToBetModal] = useState(moneyBet);

    const styleStatus = (status) => {
        switch (status) {
            case 'Close': return styles.buttonLockStyle;
                break;
            case 'Done':
                if (statusBet === "Win") {
                    return styles.buttonWinStyle;
                }
                if (statusBet === "Lose") {
                    return styles.buttonLoseStyle;
                }

                break;
            default: return;
        }
    }

    const addOrUpdateBet = () => {
        if (statusBet === "NoBet") {
            betMatch();
            setStatusBet("Waitting");
        }
        if (statusBet === "Waitting") {
            updateBet();
        }
    }

    const betMatch = async () => {
        const APIurl = 'http://10.0.2.2:3000/api/matches/bet/' + id;
        await fetch(APIurl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'moneyBet': moneyToBetModal,
                'teamBet': chooseTeamModal
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error(res.status)
            }
        })
            .then(resData => {
                console.log(resData);
                let betId = resData.id;
                setbetId(betId);
                // loadAfterBet?.();
            }).catch((error) => {
                console.log("error: " + error);
            })
    }

    const updateBet = async () => {
        const APIurl = 'http://10.0.2.2:3000/api/matches/bet/' + betId;
        await fetch(APIurl, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'moneyBet': moneyToBetModal,
                'teamBet': chooseTeamModal
            })
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw Error(res.status)
            }
        })
            .then(resData => {
                // loadAfterBet?.()
                console.log(resData);
            }).catch((error) => {
                console.log("errorUpdate: " + error);
            })
    }

    return (
        <View>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitleText}>Choose team you want to bet</Text>
                        <View style={styles.chooseTeamContainer}>
                            <Pressable style={chooseTeamModal == shortName1 ? styles.choose : {}}
                                onPress={() => setChooseTeamModal(shortName1)}>
                                <Image source={{ uri: team1Logo }} style={styles.image} resizeMode='contain'></Image>
                            </Pressable>
                            <Pressable style={chooseTeamModal == shortName2 ? styles.choose : {}}
                                onPress={() => setChooseTeamModal(shortName2)}>
                                <Image source={{ uri: team2Logo }} style={styles.image} resizeMode='contain'></Image>
                            </Pressable>
                        </View>
                        <View style={styles.betMoneyContainer}>
                            <Text style={styles.dollarText}>$</Text>
                            <TextInput keyboardType='numeric' style={styles.betInput} maxLength={4}
                                onChangeText={(value) => setMoneyToBetModal(value)}>
                                {moneyToBet}
                            </TextInput>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <Pressable
                                style={[styles.modalButton, chooseTeamModal !== "" && moneyToBetModal != 0 ? styles.activeButton : {}]}
                                onPress={() => {
                                    setModalVisible(!modalVisible); addOrUpdateBet();
                                    setChooseTeam(chooseTeamModal); setMoneyToBet(moneyToBetModal);
                                }}
                                // onPress={() => { setModalVisible(!modalVisible); addOrUpdateBet();}}
                                // onPress={loadAfterBet}
                                disabled={chooseTeamModal === "" || moneyToBetModal == 0}
                            >
                                <Text style={styles.modalBetButtonText}>Bet</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.modalButton]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.modalCloseButtonText}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity activeOpacity={0.7}
                onPress={() => setModalVisible(true)}
                disabled={status !== 'Open'}>
                <View style={[styles.buttonStyle, styleStatus(status)]}>
                    <Text style={styles.infoText}>
                        {time}
                    </Text>
                    <View style={chooseTeam == shortName1 ? styles.choose : {}}>
                        <Image source={{ uri: team1Logo }} style={[styles.image]} resizeMode='contain'></Image>
                    </View>
                    <Text style={styles.infoText}>
                        VS
                    </Text>
                    <View style={chooseTeam == shortName2 ? styles.choose : {}}>
                        <Image source={{ uri: team2Logo }} style={[styles.image]} resizeMode='contain'></Image>
                    </View>
                    <Text style={styles.betText}>
                        {moneyToBet != 0 ? "$" + moneyToBet : ""}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonStyle: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 1)',
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    buttonLockStyle: {
        backgroundColor: 'rgba(52, 52, 52, 0.7)',
        borderRadius: 10,
    },
    buttonLoseStyle: {
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        borderRadius: 10,
    },
    buttonWinStyle: {
        backgroundColor: 'rgba(0, 204, 0, 0.7)',
        borderRadius: 10,
    },
    infoText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: "bold",
    },
    betText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
        fontWeight: "bold",
        width: 75
    },
    image: {
        width: 60,
        height: 60,
        margin: 2
    },
    choose: {
        borderColor: "#0066FF",
        borderWidth: 3,
    },

    //modal css
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        width: '80%',
        backgroundColor: "white",
        borderRadius: 10,
        // paddingVertical: 20
    },
    modalTitleText: {
        color: 'black',
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 10
    },
    chooseTeamContainer: {
        width: '60%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
    },
    betMoneyContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
    },
    dollarText: {
        fontSize: 20,
        marginRight: 5
    },
    betInput: {
        width: 100,
        borderWidth: 1,
        fontSize: 20,
        padding: 5
    },
    modalButtonContainer: {
        width: '80%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10
    },
    modalButton: {
        borderRadius: 8,
        padding: 8,
        borderWidth: 2,
        width: 100,
        alignItems: "center"
    },
    modalCloseButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalBetButtonText: {
        fontSize: 16,

    },
    activeButton: {
        backgroundColor: "#0066FF",
        color: 'black',
        fontWeight: 'bold'
    }
});