import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import RegisterScreen from '../Screens/RegisterScreen'
import LoginScreen from '../Screens/LoginScreen'

const AuthStack = createStackNavigator()

const AuthStackNav = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='Log in' component={LoginScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}

export default AuthStackNav
