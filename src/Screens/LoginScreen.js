import React, { useContext, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native';
import Parse from "parse/react-native";
import { AuthContext } from '../Providers/AuthProvider';
import { Button, Icon, Input } from 'react-native-elements';
import logo from '../../Public/4f90cfc5-6240-40b3-b957-e7176b274d7a-removebg-preview.png'

const sW = Dimensions.get('window').width

const LoginScreen = ({ navigation }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { Login, loadingBtn } = useContext(AuthContext)

    const login = async () => {
        await Parse.User.logIn(username, password)
            .then((res) => {
                // setUser(res)
                Login()
                console.log('Logged in')
            })
            .catch((err) => {
                console.log(err)
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
            <Button
                title='Login'
                type='solid'
                onPress={() => login()}
                loading={loadingBtn}
                containerStyle={{
                    width: sW * 90 / 100,
                }}
            />
            <Button
                title='Sign up'
                type='clear'
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
}

export default LoginScreen;
