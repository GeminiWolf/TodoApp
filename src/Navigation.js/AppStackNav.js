import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabNav from './TopTabNav';
import AddNoteScreen from '../Screens/AddNoteScreen';

import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import RightIcons from '../Components/RightIcons';
import SettingScreen from '../Screens/SettingScreen';
import { color1, color2 } from '../Styles/StyleValues';

const AppStack = createStackNavigator()

const AppStackNav = () => {

    return (
        <AppStack.Navigator>
            <AppStack.Screen
                name='WolfTodos'
                component={TopTabNav}
                // options={{
                    // headerTitleStyle: {
                    //     color: color1
                    // },
                    // headerRight: () => <RightIcons />
                // }}
            />
            <AppStack.Screen name='New Note' component={AddNoteScreen} />
            <AppStack.Screen name='Settings' component={SettingScreen} />
        </AppStack.Navigator>
    );
}

export default AppStackNav;
