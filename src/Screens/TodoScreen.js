import React, { useContext, useState, useEffect, useRef } from 'react';
import { FlatList, StatusBar, Text, View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';
import { getWeek } from '../Utils/Dates';
import TaskModal from '../Components/TaskModal';
import { AuthContext } from '../Providers/AuthProvider';
import { color3, color4 } from '../Styles/StyleValues';
import {getDate, getMonth, getYear} from '../Utils/Dates';
import { complete, deleteTodo, incomplete } from '../Utils/TaskActions';
import TaskCards from '../Components/TaskCards';

const screenWidth = Dimensions.get('window').width;

const TodoScreen = ({navigation}) => {
    const { tasks, categories, load } = useContext(AuthContext)

    const [visible, setVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('today')
    
    const [loadedTasks, setLoadedTasks] = useState([])

    useEffect(() => {
        return () => switchFilter(selectedFilter)
    }, [load])

    const switchFilter = async (e) => {
        const temp = await tasks.sort((a, b) => a.startDate - b.startDate);

        setSelectedFilter(e)

        switch (e) {
            case 'today': 
                    setLoadedTasks(temp.filter(t => getDate(t.startDate) === getDate()))
                    // await filtSelector[e]
                break;
            case 'week':  
                    setLoadedTasks(temp.filter(t => getYear(t.startDate) === getYear() && getWeek(t.startDate) === getWeek()))
                    // await filtSelector[e]
                break;
            case 'month': 
                    setLoadedTasks(temp.filter(t => getYear(t.startDate) === getYear() && getMonth(t.startDate) === getMonth()))
                    // await filtSelector[e]
                break;
            case 'all': setLoadedTasks(temp)
                    // await filtSelector[e]
                break;
        
            default:
                break;
        }

        // const filtSelector = {
        //     ,
        //     ,
        //     ,
        //     ,
        // }
        
    }

    const selectProcess = async (opt, i) => {
        switch (opt) {
            case 'delete':
                await deleteTodo(i);
                break;
            case 'complete':
                await complete(i);
                break;
            case 'incomplete':
                await incomplete(i);
                break;
            default:
                break;
        }
        load()
        await switchFilter(selectedFilter)
    }
    
    const rightSwipe = (item, index) => {
        return(
            <View style={{
                justifyContent: 'space-around',
                alignItems: 'center',
                alignSelf: 'center', 
                flexDirection: 'row',
                width: 90,
                height: 60,
            }}>
                <Icon 
                    name='trash' 
                    type='ionicon' 
                    size={20} 
                    color='white'
                    onPress={() => selectProcess('delete', index)}
                    containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                        width: 60*0.6,
                        height: '60%',
                        borderRadius: 50,
                    }} 
                />
                <Icon 
                    name='checkmark' 
                    type='ionicon' 
                    size={20} 
                    color='white'
                    onPress={
                        item.completed ? 
                        () => selectProcess('incomplete', index) 
                        :
                        () => selectProcess('complete', index)
                    }
                    containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'green',
                        width: 60*0.6,
                        height: '60%',
                        borderRadius: 30,
                    }} 
                />
            </View>
        )    
    }

    const leftSwipe = (item, index) => {
        return(
            <View style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                height: 60,
                width: 60,
            }}>
                <Icon 
                    name='pencil' 
                    type='ionicon' 
                    size={20} color='#000' 
                    containerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'yellow',
                        width: '60%',
                        height: '60%',
                        borderRadius: 30,
                    }} 
                />
            </View>
        )    
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }} >
            <StatusBar barStyle='dark-content' />
            <View 
                style={styles.filter}>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter === 'today' && {backgroundColor: color3}]}
                        onPress={() => switchFilter('today')}
                >Today</Text>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter === 'week' && {backgroundColor: color3}]}
                        onPress={() => switchFilter('week')}
                >Week</Text>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter === 'month' && {backgroundColor: color3}]}
                        onPress={() => switchFilter('month')}
                >Month</Text>
                <Text 
                    style={[
                        styles.filterTitle, 
                        selectedFilter === 'all' && {backgroundColor: color3}]}
                        onPress={() => switchFilter('all')}
                >All</Text>
            </View>
            <Text style={{ width: (screenWidth-40), fontSize: 30, marginTop: 10, color: '#000' }}>Tasks</Text>
            <Text style={{ width: (screenWidth-40), marginBottom: 20, color: '#000' }}>{getDate()}</Text>
            <FlatList
                data={loadedTasks}
                showsVerticalScrollIndicator={false}
                keyExtractor={task => task.id}
                style={{width: '100%'}}
                renderItem={({item, index}) => <TaskCards item={item} index={index} load={load} tasks={tasks}/>}
            />
            <View style={{ paddingBottom: 20, width: '100%', alignItems: 'flex-end', right: 20, bottom: 10 }} >
                <Icon.PlusCircle 
                    stroke='#000' 
                    strokeWidth={1} 
                    onPress={() => navigation.navigate('New Task')} 
                    width={60} 
                    height={60} 
                />
            </View>
            <TaskModal 
                visible={visible} 
                setVisible={setVisible} 
                load={load} 
                switchFilter={switchFilter} 
                selectedFilter={selectedFilter} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    filter: {
        width: (screenWidth-40), 
        backgroundColor: 'grey', 
        flexDirection: 'row', 
        borderRadius: 15, 
        height: 30, 
        alignItems: 'center', 
        justifyContent: 'space-around' ,
        marginTop: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.6,
        shadowOffset: {
            width: 2,
            height: 10,
        }
    },
    filterTitle: { 
        fontSize: 18, 
        flex: 1, 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        height: '100%', 
        color: color4,
    },
    filsterStylesSelected: {
        backgroundColor: '#fff',
    },
    
})

export default TodoScreen;
