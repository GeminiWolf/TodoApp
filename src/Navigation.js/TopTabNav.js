import React from 'react';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TodoScreen from '../Screens/TodoScreen';
import NotesScreen from '../Screens/NotesScreen';
import { color1, color2 } from '../Styles/StyleValues';

const TopTab = createMaterialTopTabNavigator()

const TopTabNav = () => {

    return (
        <TopTab.Navigator
            tabBarOptions={{
                // tabStyle: {
                //     backgroundColor: color2
                // },
                // activeTintColor: color1,
                inactiveTintColor: '#adadad'
            }}
        >
            <TopTab.Screen name='Tasks' component={TodoScreen} />
            <TopTab.Screen name='Notes' component={NotesScreen} />
        </TopTab.Navigator>
    );
}

export default TopTabNav;
