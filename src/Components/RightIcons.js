import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { color1, color2 } from '../Styles/StyleValues';

const RightIcons = () => {

    const navigation = useNavigation()

    return (
        <View style={{ marginRight: 20 }} >
            <Icon onPress={() => navigation.navigate('Settings')} name='cog' type='font-awesome-5' ></Icon>
        </View>
    );
}

export default RightIcons;
