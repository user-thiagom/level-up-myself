import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import moment from 'moment/moment'
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const Quest = ({ id, title, desc, xp, doneAt, estimateAt, status, showModal, toggleQuest }) => {

    const date = doneAt ? doneAt : estimateAt
    const formatedDate = moment(date).fromNow()
    let colorStatus = ''

    switch (status) {
        case 'Ativa': colorStatus='green'
        case 'Expirada': colorStatus='red'
        case 'Concluida': colorStatus='cyan'
        default:
            colorStatus='white'
    }
    console.log(colorStatus)
    function handleQuest() {
        if (!doneAt) {
            return <View style={styles.checkBox}></View>
        } else {
            return (
                <View style={styles.checkBox}>
                    <Feather name="check" size={48} color="black" />
                </View>
            )
        }
    }

    return (
        <TouchableOpacity onPress={showModal}>
            <View style={[styles.container,styles.shadowProp,{shadowColor:colorStatus},]}>
                <View style={styles.questInfo}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.expireIn}>{moment() > moment(estimateAt) ? 'Expirou': 'Expira'} {formatedDate}</Text>
                    <View style={styles.questStatusContainer}>
                        <View style={styles.questStatusCircle}></View>
                        <Text style={styles.questStatus}>{status}</Text>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => toggleQuest(id)}>
                    {handleQuest()}
                </TouchableWithoutFeedback>
            </View>
        </TouchableOpacity>
    )
}

export default Quest

const styles = StyleSheet.create({
    container: {
        borderWidth:0.4,
        borderRadius: 25,
        borderColor: 'white',
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'black'
    },
    questInfo: {
        marginHorizontal: 10
    },
    title: {
        color: 'white',
        fontSize: 20,

    },
    expireIn: {
        color: 'white',
        fontSize: 13
    },
    checkBox: {
        
        width: 50,
        height: 50,
        backgroundColor: 'white',

        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginLeft: 30
    },
    questStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    questStatusCircle: {
        width: 10,
        height: 10,
        backgroundColor: 'green',
        borderRadius: 50,
    },
    questStatus: {
        color: 'white',
        marginLeft: 5,
        fontSize: 13
    },
    shadowProp: {
        
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 15,
    },
})