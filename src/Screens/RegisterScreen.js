import React, { useContext, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Parse from "parse/react-native";
import { Button, Icon, Input } from 'react-native-elements';
import logo from '../../Public/4f90cfc5-6240-40b3-b957-e7176b274d7a-removebg-preview.png'
import { AuthContext } from '../Providers/AuthProvider';

const sW = Dimensions.get('window').width

const RegisterScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')

    const { Login } = useContext(AuthContext)

    const register = async () => {

        const usernameValue = username
        const emailValue = email
        const passwordValue = password

        await Parse.User.signUp(usernameValue, passwordValue)
            .then((createdUser) => {
                createdUser.set('email', emailValue)
                createdUser.save()
                    .then(res => {
                        Login()
                        alert('welcome')
                    })
                    .catch(err => {
                        alert(err)
                    })
            })
            .catch((err) => {
                console.log('error: ' + err)
            })
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Image
                source={logo}
                style={{
                    width: sW * 30 / 100,
                    height: sW * 30 / 100,
                    marginVertical: 40
                }}
            />
            <Input
                label='Username'
                leftIcon={
                    () => <Icon name='user' type='font-awesome-5' />
                }
                containerStyle={{
                    width: sW * 90 / 100,
                }}
                onChangeText={text => setUsername(text)}
            />
            <Input
                label='E-mail'
                keyboardType='email-address'
                autoCapitalize='none'
                leftIcon={
                    () => <Icon name='envelope' type='font-awesome-5' />
                }
                containerStyle={{
                    width: sW * 90 / 100,
                }}
                onChangeText={text => setEmail(text)}
            />
            <Input
                label='Password'
                secureTextEntry={true}
                leftIcon={
                    () => <Icon name='lock' type='font-awesome-5' />
                }
                containerStyle={{
                    width: sW * 90 / 100,
                }}
                onChangeText={text => setPassword(text)}
            />
            <Input
                label='Confirm Password'
                secureTextEntry={true}
                leftIcon={
                    () => <Icon name='lock' type='font-awesome-5' />
                }
                containerStyle={{
                    width: sW * 90 / 100,
                }}
                onChangeText={text => setConfirmPassword(text)}
            />
            <Button
                title='Sign up'
                type='solid'
                onPress={() => register()}
                containerStyle={{
                    width: sW * 90 / 100,
                }}
            />
            <Button
                title='Login'
                type='clear'
                onPress={() => navigation.goBack()}
            />
        </View>
    );
}

export default RegisterScreen;
