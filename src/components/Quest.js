import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment/moment'
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';

const Quest = ({ id, title, desc, xp, doneAt, estimateAt, tick, showModal, toggleQuest }) => {

    const date = doneAt ? doneAt : estimateAt
    const [formatedDate,setFormatedDate] = useState(moment(date).fromNow())
    const [color, setColor] = useState('')
    const [statuss, setStatuss] = useState('')

    useEffect(() => {
        handleStatus()
    }, [])

    useEffect(()=>{
        setFormatedDate(moment(date).fromNow())
        handleStatus()
    },[tick])

    useEffect(()=>{
        colorStatus()
    },[statuss])

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

    function colorStatus() {
        switch (statuss) {
            case 'Ativa':
                setColor('#49be25')
                break;
            case 'Expirada':
                setColor('red')
                break;
            case 'Concluida':
                setColor('cyan')
                break;
            default:
                setColor('white')
                break;
        }
    }

    function handleStatus() {
        if (doneAt) {
            setStatuss('Concluida')
        } else {
            if (estimateAt && estimateAt > new Date()) {
                setStatuss('Ativa')
            } else {
                setStatuss('Expirada')
            }
        }

    }

    return (
        <TouchableOpacity onPress={showModal}>
            <View style={styles.container}>
                <View style={styles.questInfo}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.expireIn}>{moment() > moment(estimateAt) ? 'Expirou' : 'Expira'} {formatedDate}</Text>
                    <View style={styles.questStatusContainer}>
                        <View style={[styles.questStatusCircle, { backgroundColor: color }]}></View>
                        <Text style={styles.questStatus}>{statuss}</Text>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => toggleQuest(id)}>
                    <View style={styles.checkContainer}>
                        {handleQuest()}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </TouchableOpacity>
    )
}

export default Quest

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'black',
        marginVertical: 5
    },
    questInfo: {
        marginLeft: 10
    },
    title: {
        color: 'white',
        fontSize: 20,

    },
    expireIn: {
        color: 'white',
        fontSize: 12
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    checkBox: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    questStatusContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    questStatusCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    questStatus: {
        color: 'white',
        marginLeft: 5,
        fontSize: 12
    },
    shadowProp: {
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})