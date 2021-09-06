import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color1, color2 } from '../Styles/StyleValues';
import { addTask } from '../Utils/TaskActions';

const TaskModal = ({ visible, setVisible, load, switchFilter, selectedFilter }) => {

    const [inputTask, setInputTask] = useState('');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateTask, setDateTask] = useState(date.getMilliseconds());

    useEffect(() => {
        return () => setDateTask(date.getMilliseconds())
    }, [])

    const addProcess = async () => {
        await addTask(inputTask, dateTask)
        await load()
        switchFilter(selectedFilter)
        setVisible(false)
    }

    const setDateTime = (event) => {
        const currentDate = date(event.nativeEvent.timestamp);
        setDateTask(currentDate);
        setShow(false)
        // setShow(Platform.OS === 'ios');
    }

    return (
        <Overlay
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
        >
            <View
                style={{
                    width: Dimensions.get('window').width - 100,
                    height: Dimensions.get('window').width
                }}>
                <Icon onPress={() => setVisible(false)} name='cancel' type='ionicons' containerStyle={{ alignSelf: 'flex-end' }} />
                <Input
                    placeholder='Enter task...'
                    inputStyle={{
                        padding: 0,
                    }}
                    onChangeText={(text) => setInputTask(text)}
                />
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        justifyContent: 'space-around',
                        width: '100%',
                        borderWidth: 1,
                        borderColor: color1
                    }}
                    onPress={() => setShow(true)}
                >
                    <Text
                        style={{
                            width: '50%',
                            padding: 10,
                            textAlign: 'center',
                            borderRightWidth: 1,
                            borderColor: color1
                        }}
                    >{date.toLocaleDateString()}</Text>
                    <Text
                        style={{
                            width: '50%',
                            padding: 10,
                            textAlign: 'center'
                        }}
                    >{date.toLocaleTimeString().substr(0, 5)}</Text>
                </TouchableOpacity>
                {
                    show &&
                    <DateTimePicker
                        mode='datetime'
                        display='default'
                        is24Hour={true}
                        value={dateTask}
                        onChange={(dt) => setDateTime(dt)}
                    />
                }
                <Button
                    title='Add Task'
                    type='outline'
                    buttonStyle={{ borderColor: color1 }}
                    titleStyle={{ color: color1 }}
                    containerStyle={{ position: 'absolute', bottom: 20, width: '100%', }}
                    onPress={() => addProcess()}
                />
            </View>
        </Overlay>
    );
}

export default TaskModal;
