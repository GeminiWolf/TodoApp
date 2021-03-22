import React, { useContext, useState } from 'react';
import { Dimensions, FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { AuthContext } from '../Providers/AuthProvider';
import Swipeable from 'react-native-swipeable-br';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { color1, color2 } from '../Styles/StyleValues';

const sw = Dimensions.get('window').width

const NotesScreen = ({ navigation }) => {
    const [filter, setFilter] = useState('')

    const { notes, loadItems } = useContext(AuthContext)

    const deleteNote = async (i) => {
        try {
            const storedItems = JSON.parse(await AsyncStorage.getItem('Notes'));
            const itemsArray = storedItems || [];

            itemsArray.splice(i, 1)

            await AsyncStorage.setItem(
                'Notes',
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
            <Text style={{ fontSize: 30, marginVertical: 20, color: color2 }}>Notes</Text>
            <FlatList
                data={notes}
                keyExtractor={note => note.id}
                renderItem={({ item, index }) => (
                    <Card containerStyle={{ width: '100%', marginHorizontal: 0, borderRadius: 20, backgroundColor: color2, borderWidth: 0 }}>
                        <Card.Title style={{ alignSelf: 'flex-start' }}>{item.title}</Card.Title>
                        <Card.FeaturedSubtitle style={{ color: 'grey', width: '90%' }} numberOfLines={1}>
                            <Text>{item.note}</Text>
                        </Card.FeaturedSubtitle>
                        <Text style={{ fontSize: 12 }}>Created: {moment(item.createdAt).format('ddd, DD MMM YY')}</Text>
                        <Icon onPress={() => navigation.navigate('New Note', { note: item })} name='pen' type='font-awesome-5' size={18} containerStyle={{ position: 'absolute', top: 5, right: 5 }} />
                        <Icon onPress={() => deleteNote(index)} name='trash' type='font-awesome-5' size={18} containerStyle={{ position: 'absolute', bottom: 5, right: 5 }} />
                    </Card>
                )} />
            <Icon containerStyle={{ paddingBottom: 20 }} onPress={() => navigation.navigate('New Note')} name='add' color={color2} type='ionicons' size={50} />
        </View>
    );
}

export default NotesScreen;
