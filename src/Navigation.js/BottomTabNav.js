import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import * as Icon from 'react-native-feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import TodoScreen from '../Screens/TodoScreen';
import NotesScreen from '../Screens/NotesScreen';
import { color2, color3, color4 } from '../Styles/StyleValues';

const screenWidth = Dimensions.get('window').width;

const BottomTab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <BottomTab.Navigator

            screenOptions={({ route }) => ({
                tabBarLabelStyle: {
                    color: color4
                },
                tabBarStyle: {
                    backgroundColor: color3,
                    height: 60,
                    width: '100%',
                    alignSelf: 'center',
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                },
                tabBarActiveTintColor: color3,
                tabBarInactiveTintColor: color2, 
              })}
        >
            <BottomTab.Screen 
                options={{
                    headerShown: false, 
                    tabBarIcon: ({focused, color, size}) => (
                        <View 
                            style={{ 
                                backgroundColor: focused ? color4 : 'transparent',
                                height: 50,  
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 25
                            }} >
                            <Icon.Home color={color} />
                        </View>
                    ),
                    tabBarShowLabel: false,
                }} 
                name='Home' 
                component={HomeScreen} 
            />
            <BottomTab.Screen 
                name='Tasks' 
                options={{
                    headerStyle: {
                        backgroundColor: color3,
                    },
                    headerTitleStyle: {
                        color: color4
                    },
                    tabBarIcon: ({focused, color, size}) => (
                        <View 
                            style={{ 
                                backgroundColor: focused ? color4 : 'transparent',
                                height: 50,  
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 25
                            }} >
                            <Icon.CheckSquare color={color} />
                        </View>
                    ),
                    tabBarShowLabel: false,
                }} 
                component={TodoScreen} 
            />
            <BottomTab.Screen 
                name='Notes' 
                options={{
                    headerStyle: {
                        backgroundColor: color3,
                    },
                    headerTitleStyle: {
                        color: color4
                    },
                    tabBarIcon: ({focused, color, size}) => (
                        <View 
                            style={{ 
                                backgroundColor: focused ? color4 : 'transparent',
                                height: 50,  
                                width: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 25
                            }} >
                            <Icon.FileText color={color} />
                        </View>
                    ),
                    tabBarShowLabel: false,
                }} 
                component={NotesScreen} 
            />
        </BottomTab.Navigator>
    );
}

export default BottomTabNav;
