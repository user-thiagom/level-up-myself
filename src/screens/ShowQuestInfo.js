import { View, Text } from 'react-native'
import React from 'react'
import { Modal } from 'react-native'
import { StyleSheet } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'

const ShowQuestInfo = ({ isVisible, onCancel, questInfo }) => {
    return (
        <Modal transparent={true} visible={isVisible} onRequestClose={onCancel} animationType='fade'>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>

            <View style={styles.container}>
                <Text style={styles.header}>{questInfo.title}</Text>
            </View>

            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    container: {
        backgroundColor: 'white'
    },
    header: {
        backgroundColor: 'whitesmoke',
        color: 'black',
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
})

export default ShowQuestInfo