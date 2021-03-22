import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Button, Input, Overlay } from 'react-native-elements';

const NoteModal = ({ visible, addTask }) => {

    const [inputTask, setInputTask] = useState('');

    return (
        <Overlay
            isVisible={visible}
        >
            <View
                style={{
                    width: Dimensions.get('window').width - 100,
                }}>
                <Button
                    title='Add Task'
                    type='outline'
                    containerStyle={{ marginVertical: 1 }}
                    onPress={() => addTask(inputTask)}
                />
                <Button
                    title='Add Task'
                    type='outline'
                    containerStyle={{ marginVertical: 1 }}
                    onPress={() => addTask(inputTask)}
                />
                <Button
                    title='Add Task'
                    type='outline'
                    containerStyle={{ marginVertical: 1 }}
                    onPress={() => addTask(inputTask)}
                />
            </View>
        </Overlay>
    );
}

export default NoteModal;
