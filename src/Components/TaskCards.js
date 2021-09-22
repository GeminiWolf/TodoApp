import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { color2, color3, color4 } from '../Styles/StyleValues';
import { getDate, setTimeFormat } from '../Utils/Dates';
import { deleteTodo } from '../Utils/TaskActions';

const screenWidth = Dimensions.get('window').width;

const TaskCards = ({ item, index, load, tasks }) => {
    const [opts, setOpts] = useState(false)

    const rmTask = async (i) => {
        const foundID =  await tasks.findIndex((f)=> f.id === i)
        foundID != -1 && await deleteTodo(foundID)

        load()
    }

    return (
    <View style={styles.taskCard}>
        <View style={{display: 'flex', height: '80%', marginRight: 10}}>
            <Text style={{fontSize: 10, color: color4,}} >{setTimeFormat(item.startDate)}</Text>
            <View style={[styles.dot, {alignSelf: 'center'}]}/>
            <View style={{flex: 1, backgroundColor: color4, width: 1, alignSelf: 'center' }} />
            <View style={[styles.dot, {alignSelf: 'center'}]}/>
            <Text style={{fontSize: 10, color: color4,}} >{setTimeFormat(item.endDate)}</Text>
        </View>
        <View>
            <Text style={{ fontSize: 18, color: color4 }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: color2 }}>{getDate(item.startDate)}</Text>
        </View>
        <TouchableOpacity  style={styles.optBtn} onPress={() => setOpts(!opts)} >
            <View style={styles.dot}/>
            <View style={styles.dot}/>
            <View style={styles.dot}/>
        </TouchableOpacity>
        {
            opts &&
            <View style={styles.optsContainer}>
                <Text style={styles.optSelect}>Edit</Text>
                <Text onPress={() => rmTask(item.id)} style={styles.optSelect}>Delete</Text>
                <Text style={styles.optSelect}>Completed</Text>
            </View>
        }
    </View>
)}

const styles = StyleSheet.create({
    taskCard: { 
        backgroundColor: color3,
        borderWidth: 0, 
        height: 100, 
        width: (screenWidth-40),
        marginBottom: 20, 
        flexDirection: 'row',
        alignSelf: 'center', 
        alignItems: 'center', 
        borderRadius: 10,
        paddingHorizontal: 20,
        position: 'relative',
        shadowColor: '#000',
        shadowRadius: 15,
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.25,
        elevation: 5
    },
    optBtn: {
        position: 'absolute', 
        height: 20, 
        top: '50%', 
        right: '10%', 
        transform: [{translateY: -10}], 
        display: 'flex', 
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    optsContainer: {
        position: 'absolute', 
        right: '25%', 
        height: '100%', 
        justifyContent: 'center',
    },
    optSelect: {
        paddingVertical: 5,
        color: color4,
    },
    dot: {
        borderRadius: 2, 
        padding: 2, 
        backgroundColor: color4
    },
})

export default TaskCards;
