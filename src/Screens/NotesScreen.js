import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, StatusBar, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import * as Icon from 'react-native-feather';
import { AuthContext } from '../Providers/AuthProvider';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { color1, color2, color3, color4 } from '../Styles/StyleValues';
import { getDate } from '../Utils/Dates';

const sw = Dimensions.get('window').width

const NotesScreen = ({ navigation }) => {
    const [filter, setFilter] = useState('')

    const { notes, load } = useContext(AuthContext)

    const deleteNote = async (i) => {
        try {
            const getItemDel = await AsyncStorage.getItem('Notes')
            const storedItems = await JSON.parse(getItemDel);
            const itemsArray = storedItems || [];

            itemsArray.splice(i, 1)

            await AsyncStorage.setItem(
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
                    <Card containerStyle={{ width: '100%', marginHorizontal: 0, borderRadius: 20, backgroundColor: color3, borderWidth: 0 }}>
                        <Card.Title style={{ alignSelf: 'flex-start', color: color4 }}>{item.title}</Card.Title>
                        <Card.FeaturedSubtitle style={{ color: 'grey', width: '90%' }} numberOfLines={1}>
                            <Text>{item.note}</Text>
                        </Card.FeaturedSubtitle>
                        <Text style={{ fontSize: 12, color: color4 }}>Created: {getDate(item.createdAt)}</Text>
                        <Icon.Edit3 
                            onPress={() => navigation.navigate('New Note', { note: item, use: 'edit' })} 
                            stroke={color4} 
                            strokeWidth={1} 
                            height={18} 
                            width={18} 
                            style={{ position: 'absolute', top: 5, right: 5 }} 
                        />
                        <Icon.Trash2 
                            onPress={() => deleteNote(index)} 
                            stroke={color4} 
                            strokeWidth={1} 
                            height={18} 
                            width={18} 
                            style={{ position: 'absolute', bottom: 5, right: 5 }} 
                        />
                    </Card>
                )} />
            <View
                style={{ 
                    width: '100%',
                    alignItems: 'flex-end',
                    paddingBottom: 20,
                    bottom: 10,
                }} >
                <Icon.PlusCircle 
                    onPress={() => navigation.navigate('New Note', {use: 'add'})} 
                    stroke='#000' 
                    strokeWidth={1} 
                    width={60}
                    height={60} 
                />
            </View>
        </View>
    );
}

export default NotesScreen;
