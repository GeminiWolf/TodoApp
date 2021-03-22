import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { User, Object, Query } from "parse/react-native.js";
import { AuthContext } from '../Providers/AuthProvider';
import AsyncStorage from '@react-native-community/async-storage';
import { guidGenerator } from '../Components/KeyGen';
import { color1, color2 } from '../Styles/StyleValues';

AsyncStorage

const AddNoteScreen = ({ navigation, route }) => {

    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    const [updateNote, setUpdateNote] = useState(false)

    const { notes, fetchNotes, loadItems } = useContext(AuthContext)

    useEffect(() => {
        if (route.params !== undefined) {
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
                const storedItems = JSON.parse(await AsyncStorage.getItem('Notes'));
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

            loadItems()
            navigation.goBack()
        }
        else {
            alert('Missing inputs!')
        }
    }

    const update = () => {
        const AddNote = Object.extend('Notes')
        const addNote = new Query(AddNote)

        addNote.get(route.params.note.objectId)
            .then(obj => {
                obj.set('title', title)
                obj.set('note', note)
                obj.save()
                    .then(res => {
                        fetchNotes()
                        alert('Updated!')
                    })
                    .catch(err => {
                        alert(err)
                    })
            })
            .catch(err => {
                alert(err)
            })


        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, margin: 20, backgroundColor: color1 }}>
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
                    <Button onPress={() => update()} title='Update' type='solid' />
                    :
                    <Button onPress={() => add()} title='Add' type='solid' />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    textTitles: {
        fontSize: 20,
        color: color2
    }
})

export default AddNoteScreen;
