import React, { useContext, useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import {Swipeable} from 'react-native-gesture-handler';
import { getWeek } from '../Utils/Dates';
import TaskModal from '../Components/TaskModal';
import { AuthContext } from '../Providers/AuthProvider';
import { color1, color2 } from '../Styles/StyleValues';
import {getDate, getMonth, getYear} from '../Utils/Dates';
import BottomSheet from '../Components/BottomSheet';
import { complete, deleteTodo, incomplete } from '../Utils/TaskActions';

const TodoScreen = () => {
    const [visible, setVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('today')
    
    const { tasks, categories, load } = useContext(AuthContext)
    
    const [loadedTasks, setLoadedTasks] = useState([])

    useEffect(() => {
        if(tasks && tasks !== undefined){
            switchFilter(selectedFilter)
        }
    }, [tasks])

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
        switchFilter(selectedFilter)
    }
    
    const rightSwipe = (item, index) => {
        return(
            <View style={{
                justifyContent: 'space-around',
                alignItems: 'center',
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
                        borderRadius: 30,
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
            {console.log(loadedTasks)}
            <FlatList
                data={loadedTasks}
                showsVerticalScrollIndicator={false}
                keyExtractor={task => task.id}
                renderItem={({ item, index }) => (
                    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe} >
                        <View style={{ backgroundColor: color2, borderWidth: 0, height: 60, width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
                            <View>
                                <Text style={{ fontSize: 18 }}>{item.task}</Text>
                                <Text style={{ fontSize: 12 }}>{getDate(item.completionDate)}</Text>
                            </View>
                        </View>
                    </Swipeable>
                )}
            />
            <Icon containerStyle={{ paddingBottom: 20 }} onPress={() => setVisible(true)} name='add' type='ionicons' size={50} />
            {/* <BottomSheet visible={visible} setVisible={setVisible} /> */}
            <TaskModal visible={visible} setVisible={setVisible} load={load} switchFilter={switchFilter} selectedFilter={selectedFilter} />
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
