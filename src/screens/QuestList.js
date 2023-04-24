import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import Quest from '../components/Quest';
import 'moment/locale/pt-br'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowQuestInfo from './ShowQuestInfo';

const initialQuests = [
    {
        id: 1,
        title: "Estudar react native",
        desc: "A prática cotidiana prova que o início da atividade geral de formação de atitudes garante a contribuição de um grupo importante na determinação da gestão inovadora da qual fazemos parte.",
        xp: 16,
        doneAt: null,
        estimateAt: new Date(2023, 3, 15, 12, 30, 0),
    },
    {
        id: 2,
        title: "Treinar costas e bíceps",
        desc: "O cuidado em identificar pontos críticos na hegemonia do ambiente político estende o alcance e a importância do retorno esperado a longo prazo.",
        xp: 20,
        doneAt: null,
        estimateAt: new Date(2023, 3, 12, 21, 30, 0),
    },
    {
        id: 3,
        title: "Baby don't U",
        desc: "O cuidado em identificar pontos críticos na hegemonia do ambiente político estende o alcance e a importância do retorno esperado a longo prazo.",
        xp: 20,
        doneAt: null,
        estimateAt: new Date(),
    }
]

const QuestList = () => {
    const userName = 'Thiago'

    const [quests, setQuests] = useState(initialQuests)
    const [questinfo, setQuestInfo] = useState({})
    const [visible, setVisible] = useState(false)
    const [tickDate, setTickDate] = useState(new Date())

    useEffect(() => {
        ticker()
    }, [])

    async function loadQuests() {
        const stateString = await AsyncStorage.getItem('quests')
        const state = JSON.parse(stateString) || initialQuests
        setQuests(state)
    }

    function ticker() {
        setInterval(() => {
            setTickDate(new Date())
        }, 60000)
    }

    function toggleQuest(id) {
        const questscopy = [...quests]
        questscopy.forEach(task => {
            if (task.id === id) {
                task.doneAt = task.doneAt ? task.doneAt : new Date()
            }
        })
        setQuests(questscopy)
        AsyncStorage.setItem('quests', JSON.stringify(quests))
    }

    function showQuestInfos(id) {
        const copyQuests = [...quests]
        copyQuests.forEach(quest=>{
            if (quest.id === id) {
                setQuestInfo(quest)
            }
        })
        setVisible(true)
    }

    return (
        <View style={styles.container}>
            <ShowQuestInfo isVisible={visible} onCancel={()=>setVisible(false)} questInfo={questinfo}/>
            <View style={styles.header}>
                <Text style={styles.title}>Olá, {<Text children={userName} style={{ color: '#08cd4e', fontWeight: '500' }} />}!</Text>
                <Text style={styles.subtitle}>Verifique suas quests</Text>
            </View>
            <View style={styles.datePicker}>
                <Feather name="chevron-left" size={50} color="white" />
                <Text style={styles.day}>Hoje</Text>
                <Feather name="chevron-right" size={50} color="white" />
            </View>
            <View style={styles.questsContainer}>
                <FlatList data={quests} keyExtactor={item => `${item.id}`}
                    renderItem={({ item }) => <Quest tick={tickDate} toggleQuest={toggleQuest} showModal={showQuestInfos} {...item} />}
                />
            </View>
        </View>
    )
}

export default QuestList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',

    },
    header: {
        borderWidth: 3,
        borderColor: 'white',
        margin: 10
    },
    title: {
        fontSize: 35,
        color: 'white',

    },
    subtitle: {
        fontSize: 22,
        color: 'white'
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 3,
        borderColor: 'white',
    },
    day: {
        color: 'white',
        fontSize: 32,
        marginHorizontal: '20%'
    },
    questsContainer: {
        borderWidth: 2,
        backgroundColor: 'rgba(38,38,38,255)',
        flex: 0.8,
        width: '85%',
        borderRadius: 20,
        padding: 7
    }
})