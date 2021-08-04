import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { getWeek } from '../Utils/Dates';
import TaskModal from '../Components/TaskModal';
import { AuthContext } from '../Providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { guidGenerator } from '../Utils/KeyGen';
import { color1, color2 } from '../Styles/StyleValues';
import { TouchableOpacity } from 'react-native';
import {getDate, getMonth, getYear} from '../Utils/Dates';

const TodoScreen = () => {

    const [visible, setVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('today')
    let [count, setCount] = useState(0)
    
    const { tasks, fetchTasks, loadItems } = useContext(AuthContext)
    
    const [loadedTasks, setLoadedTasks] = useState([])

    useEffect(() => {
        if(tasks && tasks != undefined){
            load();       
        }
    }, [tasks])

    function load(){
            switchFilter(selectedFilter)
    }

    const deleteTodo = async (i) => {
        try {
            const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
            const itemsArray = storedItems || [];

            itemsArray.splice(i, 1)

            await AsyncStorage.setItem(
                'Tasks',
                JSON.stringify([...itemsArray])
            ).catch((err) => {
                console.log(err);
            });

            loadItems()
            switchFilter(selectedFilter)
        }
        catch (err) {
            alert(err)
        }
    }

    const addTask = async (newEntry, newDate) => {
        let genId = guidGenerator();
        if (newEntry !== '') {
            const newTask = { id: genId, task: newEntry, completionDate: newDate, dateCreated: Date.now(), completed: false }

            try {
                const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
                const itemsArray = storedItems || [];
                await AsyncStorage.setItem(
                    'Tasks',
                    JSON.stringify([...itemsArray, newTask])
                ).catch((err) => {
                    console.log(err);
                });

                loadItems()
                switchFilter(selectedFilter)
            }
            catch (err) {
                alert(err)
            }
        }
        else {
            alert('No task set')
        }

        setVisible(false)
    }

    const complete = async (i) => {
        try {
            const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
            const itemsArray = storedItems || [];

            itemsArray[i].completed = true

            await AsyncStorage.setItem(
                'Tasks',
                JSON.stringify([...itemsArray])
            ).catch((err) => {
                console.log(err);
            });

            loadItems()
            switchFilter(selectedFilter)
        }
        catch (err) {
            alert(err)
        }
    }

    const incomplete = async (i) => {

        try {
            const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
            const itemsArray = storedItems || [];

            itemsArray[i].completed = false

            await AsyncStorage.setItem(
                'Tasks',
                JSON.stringify([...itemsArray])
            ).catch((err) => {
                console.log(err);
            });

            // loadItems()
            switchFilter(selectedFilter)
        }
        catch (err) {
            alert(err)
        }
    }
    
    const switchFilter = (e) => {

        switch (e) {
            case 'today':
                setSelectedFilter(e)
                
                setLoadedTasks(
                    tasks.filter(t => getDate(t.completionDate) == getDate())
                )                
                break;
            case 'week':
                setSelectedFilter(e)
                

                setLoadedTasks(
                    tasks.filter(t => getYear(t.completionDate) == getYear() && getWeek(t.completionDate) == getWeek() )
                )                
                break;
            case 'month':
                setSelectedFilter(e)
                
                setLoadedTasks(
                    tasks.filter(t => getYear(t.completionDate) == getYear() && getMonth(t.completionDate) == getMonth())
                )                
                break;
            case 'all':
                setSelectedFilter(e)
                
                setLoadedTasks(tasks)
                break;
            default:
                break;
        }
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }} >
            <StatusBar barStyle='dark-content' />
            <View 
                style={styles.filter}>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter == 'today' && {backgroundColor: '#fff'}]}
                        onPress={() => switchFilter('today')}
                >Today</Text>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter == 'week' && {backgroundColor: '#fff'}]}
                        onPress={() => switchFilter('week')}
                >Week</Text>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter == 'month' && {backgroundColor: '#fff'}]}
                        onPress={() => switchFilter('month')}
                >Month</Text>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter == 'all' && {backgroundColor: '#fff'}]}
                        onPress={() => switchFilter('all')}
                >All</Text>
            </View>
            <Text style={{ fontSize: 30, marginTop: 10, color: '#000' }}>Tasks</Text>
            <Text style={{ marginBottom: 20, color: '#000' }}>{getDate()}</Text>
            <FlatList
                data={loadedTasks}
                showsVerticalScrollIndicator={false}
                keyExtractor={task => task.id}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: color2, borderWidth: 0, height: 60, width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
                        <TouchableOpacity onPress={item.completed ? () => incomplete(index) : () => complete(index)} style={{ height: 20, width: 20, borderWidth: 1, borderRadius: 10, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                            {item.completed ? <Icon name='check' type='ionicons' size={15} /> : null}
                        </TouchableOpacity>
                        <View>
                            <Text style={{ fontSize: 18 }}>{item.task}</Text>
                            <Text style={{ fontSize: 12 }}>{getDate(item.completionDate)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', position: 'absolute', right: 20, justifyContent: 'flex-end', width: 65 }}>
                            <Icon onPress={() => deleteTodo(index)} name='close' type='ionicons' size={24} />
                        </View>
                    </View>
                )}
            />
            <Icon containerStyle={{ paddingBottom: 20 }} onPress={() => setVisible(true)} name='add' type='ionicons' size={50} />
            <TaskModal visible={visible} addTask={addTask} setVisible={setVisible} />
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        width: '100%', 
        backgroundColor: 'grey', 
        flexDirection: 'row', 
        borderRadius: 15, 
        height: 30, 
        alignItems: 'center', 
        justifyContent: 'space-around' ,
        marginTop: 10,
        overflow: 'hidden',
    },
    filterTitle: { 
        fontSize: 18, 
        flex: 1, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        height: '100%', 
    },
    filsterStylesSelected: {
        backgroundColor: '#fff',
    }
})

export default TodoScreen;
