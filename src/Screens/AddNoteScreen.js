import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { User, Object, Query } from "parse/react-native.js";
import { AuthContext } from '../Providers/AuthProvider';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { guidGenerator } from '../Utils/KeyGen';
import { color1, color2, color3, color4 } from '../Styles/StyleValues';

const screenWidth = Dimensions.get('window').width;

const AddNoteScreen = ({ navigation, route }) => {

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [updateNote, setUpdateNote] = useState(false)

    const { notes, fetchNotes, load } = useContext(AuthContext)

    useEffect(() => {
        if (route.params.use == 'edit') {
            setTitle(route.params.note.title)
            setNote(route.params.note.note)
            setUpdateNote(true)
        }
    }, [])

    const add = async () => {

        const genId = guidGenerator();

        if (title !== '' || note !== '') {
            const newNote = { id: genId, title: title, note: note, createdAt: Date.now() };

            try {
                const getItemAdd = await AsyncStorage.getItem('Notes');
                const storedItems = await JSON.parse(getItemAdd);
                const itemsArray = storedItems || [];
                await AsyncStorage.setItem(
                    'Notes',
                    JSON.stringify([...itemsArray, newNote])
                ).catch((err) => {
                    console.log(err);
                });
            }
            catch (err) {
                console.log(err);
            }

            load()
            navigation.goBack()
        }
        else {
            alert('Missing inputs!')
        }
    }

    const update = async () => {
        const idPassed = route.params.note.id;

        try {            
            const getItems = await AsyncStorage.getItem('Notes')
            const storedItems = await JSON.parse(getItems);
            const itemsArray = storedItems || [];
            
            const el = await itemsArray.findIndex(({id}) => id === idPassed)
            console.log(new Date(), el)
            itemsArray[el].title = title 
            itemsArray[el].note = note 

            await AsyncStorage.setItem(
                'Notes',
                JSON.stringify([...itemsArray])
            ).catch((err) => {
                console.log(err);
            });

            load()
        }
        catch (err) {
            console.log('Err ', err)
        }

        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : "height"} style={{ flex: 1, margin: 20, }}>
            <Text style={styles.textTitles}>Title</Text>
            <Divider />
            <TextInput
                placeholder='Type...'
                value={title}
                onChangeText={(title) => setTitle(title)}
            />
            <Text style={styles.textTitles}>Note</Text>
            <Divider />
            <TextInput
                placeholder='Type...'
                value={note}
                multiline={true}
                style={{
                    flex: 1,
                    textAlignVertical: 'top'
                }}
                onChangeText={(note) => setNote(note)}
            />
            {
                updateNote ?
                    <Button 
                        onPress={() => update()} 
                        title='Update' 
                        type='outline' 
                        buttonStyle={{ 
                            borderColor: '#000', 
                            height: 50, 
                            backgroundColor: color3,
                            borderRadius: 30, 
                        }} 
                        titleStyle={{ color: color4 }} />
                    :
                    <Button 
                        onPress={() => add()} 
                        title='Add' 
                        type='outline' 
                        buttonStyle={{ 
                            borderColor: '#000', 
                            height: 50, 
                            backgroundColor: color3,
                            borderRadius: 30, 
                        }} 
                        titleStyle={{ color: color4 }} />
            }
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    textTitles: {
        fontSize: 20,
        color: '#000'
    }
})

export default AddNoteScreen;