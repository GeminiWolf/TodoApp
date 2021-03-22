import React, { useContext, useState } from 'react';
import { FlatList, StatusBar, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { day, Month } from '../Components/Dates';
import TaskModal from '../Components/TaskModal';
import { AuthContext } from '../Providers/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import { guidGenerator } from '../Components/KeyGen';
import moment from 'moment'
import { color1, color2 } from '../Styles/StyleValues';

const TodoScreen = () => {

    const [visible, setVisible] = useState(false)
    const [date, setDate] = useState(new Date())

    const { tasks, fetchTasks, loadItems } = useContext(AuthContext)

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
            console.log(itemsArray[i].completed)

            itemsArray[i].completed = true

            await AsyncStorage.setItem(
                'Tasks',
                JSON.stringify([...itemsArray])
            ).catch((err) => {
                console.log(err);
            });


            loadItems()
        }
        catch (err) {
            alert(err)
        }
    }

    const incomplete = async (i) => {

        try {
            const storedItems = JSON.parse(await AsyncStorage.getItem('Tasks'));
            const itemsArray = storedItems || [];
            console.log(itemsArray[i].completed)

            itemsArray[i].completed = false

            await AsyncStorage.setItem(
                'Tasks',
                JSON.stringify([...itemsArray])
            ).catch((err) => {
                console.log(err);
            });


            loadItems()
        }
        catch (err) {
            alert(err)
        }
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: color1 }} >
            <StatusBar barStyle='dark-content' />
            <Text style={{ fontSize: 30, marginTop: 20, color: color2 }}>Tasks</Text>
            <Text style={{ marginBottom: 20, color: color2 }}>{moment().format('ddd, D MMM YYYY')}</Text>
            <FlatList
                data={tasks}
                keyExtractor={task => task.id}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: color2, borderWidth: 0, height: 60, width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }}>
                        <View style={{ height: 20, width: 20, borderWidth: 1, borderRadius: 10, marginHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                            {item.completed ? <Icon name='check' type='ionicons' size={15} /> : null}
                        </View>
                        <View>
                            <Text style={{ fontSize: 18 }}>{item.task}</Text>
                            <Text style={{ fontSize: 12 }}>{moment(item.completionDate).format('ddd, D MMM YYYY')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', position: 'absolute', right: 20, justifyContent: 'space-between', width: 65 }}>
                            {
                                item.completed ?
                                    <Icon onPress={() => incomplete(index)} name='check' type='ionicons' size={24} />
                                    :
                                    <Icon onPress={() => complete(index)} name='check' type='ionicons' size={24} />
                            }

                            <Icon onPress={() => deleteTodo(index)} name='close' type='ionicons' size={24} />
                        </View>
                    </View>
                )}
            />
            <Icon containerStyle={{ paddingBottom: 20 }} onPress={() => setVisible(true)} name='add' type='ionicons' color={color2} size={50} />
            <TaskModal visible={visible} addTask={addTask} setVisible={setVisible} />
        </View>
    );
}

export default TodoScreen;
