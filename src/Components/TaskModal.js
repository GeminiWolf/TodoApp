import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { color1, color2 } from '../Styles/StyleValues';

const TaskModal = ({ visible, addTask, setVisible }) => {

    const [inputTask, setInputTask] = useState('');
    const [show, setShow] = useState(false);
    const [dateTask, setDateTask] = useState(new Date());

    useEffect(() => {
        return setDateTask(new Date)
    }, [])

    const setDateTime = (event, selectedDate) => {
        const currentDate = selectedDate || dateTask;
        console.log(event)
        setDateTask(new Date(event.nativeEvent.timestamp));
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
                    >{dateTask.toLocaleDateString()}</Text>
                    <Text
                        style={{
                            width: '50%',
                            padding: 10,
                            textAlign: 'center'
                        }}
                    >{dateTask.toLocaleTimeString().substr(0, 5)}</Text>
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
                    onPress={() => addTask(inputTask, dateTask)}
                />
            </View>
        </Overlay>
    );
}

export default TaskModal;
