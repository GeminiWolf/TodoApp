import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, StatusBar, Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { AuthContext } from '../Providers/AuthProvider';
import localStorage from 'react-native-sync-localstorage';
import { color1, color2 } from '../Styles/StyleValues';
import { getDate } from '../Utils/Dates';

const sw = Dimensions.get('window').width

const NotesScreen = ({ navigation }) => {
    const [filter, setFilter] = useState('')

    const { notes, load } = useContext(AuthContext)

    const deleteNote = async (i) => {
        try {
            const getItemDel = await localStorage.getItem('Notes')
            const storedItems = await JSON.parse(getItemDel);
            const itemsArray = storedItems || [];

            itemsArray.splice(i, 1)

            await localStorage.setItem(
                'Notes',
                JSON.stringify([...itemsArray])
            ).catch((err) => {
                console.log(err);
            });

            await load()
        }
        catch (err) {
            alert(err)
        }
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }} >
            <StatusBar barStyle='dark-content' />
            <Text style={{ fontSize: 30, marginVertical: 20, color: '#000' }}>Notes</Text>
            <FlatList
                data={notes}
                keyExtractor={note => note.id}
                renderItem={({ item, index }) => (
                    <Card containerStyle={{ width: '100%', marginHorizontal: 0, borderRadius: 20, backgroundColor: color2, borderWidth: 0 }}>
                        <Card.Title style={{ alignSelf: 'flex-start' }}>{item.title}</Card.Title>
                        <Card.FeaturedSubtitle style={{ color: 'grey', width: '90%' }} numberOfLines={1}>
                            <Text>{item.note}</Text>
                        </Card.FeaturedSubtitle>
                        <Text style={{ fontSize: 12 }}>Created: {getDate(item.createdAt)}</Text>
                        <Icon onPress={() => navigation.navigate('New Note', { note: item, use: 'edit' })} name='pen' type='font-awesome-5' size={18} containerStyle={{ position: 'absolute', top: 5, right: 5 }} />
                        <Icon onPress={() => deleteNote(index)} name='trash' type='font-awesome-5' size={18} containerStyle={{ position: 'absolute', bottom: 5, right: 5 }} />
                    </Card>
                )} />
            <Icon containerStyle={{ paddingBottom: 20 }} onPress={() => navigation.navigate('New Note', {use: 'add'})} name='add' type='ionicons' size={50} />
        </View>
    );
}

export default NotesScreen;
