import React, { useContext, useEffect, useState } from 'react';
import {View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
import { AuthContext } from '../Providers/AuthProvider';
import { color3, color4 } from '../Styles/StyleValues';
import { getDate } from '../Utils/Dates';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
    const {tasks, notes, load} = useContext(AuthContext)
    
    const [tasksToday, setTasksToday] = useState([])
    const [recentNotes, setRecentNotes] = useState([])

    const homeRenders = async() => {
        load()

        const tsk = await tasks.sort((a, b) => b.startDate - a.startDate);
        // const todayTsk = await tsk.filter(t => getDate(t.startDate) === getDate());
        
        const nts = await notes.sort((a, b) => b.createdAt - a.createdAt);
        
        setTasksToday(await tsk.filter(t => getDate(t.startDate) === getDate()))
        setRecentNotes(await nts.slice(0, 4))
    }
    
    useEffect(() => {
        return () => homeRenders()
    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }} >
            <Text style={styles.homeTitles} >Tasks Today</Text>
            {!tasksToday && <Text style={styles.addNew}>Add New Task</Text>}
            <FlatList
                horizontal={true}
                data={tasksToday}
                showsHorizontalScrollIndicator={false}
                style={{flex: 1, maxHeight: 150}}
                renderItem={({item}) => {
                        return (
                            <View style={[styles.homeCards, {marginRight: 10}]}>
                                <Text style={styles.contentTexts} >{item.title}</Text>
                                <Text style={styles.contentTexts} >{getDate(item.startDate)}</Text>
                            </View>
                        )
                    }
                }
            />
            <Text style={styles.homeTitles} >Recent Notes</Text>
            <View style={styles.noteGrid}>
                {!recentNotes && <Text style={styles.addNew}>Add New Note</Text>}
                {
                    recentNotes.map((n, i) => {
                        return (
                            <View key={i.toString()} style={styles.homeCards}>
                                <Text style={styles.contentTexts} >{n.title}</Text>
                                <Text style={styles.contentTexts} >{n.note}</Text>
                                <Text style={[styles.contentTexts, {flex: 1, textAlignVertical: 'bottom'}]} >{getDate(n.createdAt)}</Text>
                            </View>
                        )
                    })
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    homeTitles: {
        fontSize: 18,
        marginBottom: 10,
    },
    contentTexts: {
        color: color4,
        marginBottom: 10,
    },
    noteGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        flex: 1,
    },
    homeCards: {
        width: screenWidth/2 - 40,
        backgroundColor: color3,
        height: 150,
        borderRadius: 20,
        padding: 10,
    },
    addNew: {
        borderWidth: 2,
        borderColor: '#aaaaaa',
        borderStyle: 'dashed',
        width: '100%',
        height: 150,
        color: '#aaaaaa'
    }
})

export default HomeScreen;
