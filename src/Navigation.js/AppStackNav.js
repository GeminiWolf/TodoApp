import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TopTabNav from './TopTabNav';
import AddNoteScreen from '../Screens/AddNoteScreen';
import AddTaskScreen from '../Screens/AddTaskScreen';

import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import RightIcons from '../Components/RightIcons';
import SettingScreen from '../Screens/SettingScreen';
import { color3, color4 } from '../Styles/StyleValues';
import BottomTabNav from './BottomTabNav';

const AppStack = createStackNavigator()

const AppStackNav = () => {

    return (
        <AppStack.Navigator 
            screenOptions={{
                headerBackgroundContainerStyle: {
                    backgroundColor: 'transparent'
                }
            }}
        >
            <AppStack.Screen
                name='WolfTodos'
                component={BottomTabNav}
                options={{
                    headerTitleStyle: {
                        color: color4
                    },
                    headerStyle: {
                        backgroundColor: color3,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        }
                    },
                }}
            />
            <AppStack.Screen
                name='New Task' 
                component={AddTaskScreen}
                options={{
                    headerTitleStyle: {
                        color: color4
                    },
                    headerStyle: {
                        backgroundColor: color3
                    },
                    headerBackTitleStyle: {
                       color: color4,
                    }
                }} 
            />
            <AppStack.Screen
                name='New Note' 
                component={AddNoteScreen}
                options={{
                    headerTitleStyle: {
                        color: color4
                    },
                    headerStyle: {
                        backgroundColor: color3
                    },
                    headerBackTitleStyle: {
                       color: color4,
                    }
                }} 
            />
            <AppStack.Screen
                name='Settings' 
                component={SettingScreen}
                options={{
                    headerTitleStyle: {
                        color: color4
                    },
                    headerStyle: {
                        backgroundColor: color3
                    },
                    headerBackTitleStyle: {
                       color: color4,
                    }
                }} 
            />
        </AppStack.Navigator>
    );
}

export default AppStackNav;
