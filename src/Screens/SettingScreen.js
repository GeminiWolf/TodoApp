import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../Providers/AuthProvider';
import { color1, color2 } from '../Styles/StyleValues';

const SettingScreen = ({ navigation }) => {

    const { logout, user } = useContext(AuthContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleStyle: {
                color: color1,

            },
            headerTitleStyle: {
                color: color1
            },
            headerStyle: {
                backgroundColor: color2
            },
            headerRight: () =>
                <View style={{ marginRight: 20 }}>
                    {user && <Icon onPress={() => logout()} name='sign-out-alt' type='font-awesome-5' />}
                </View>
        })
    }, [navigation])

    return (
        <View style={{ backgroundColor: color1, flex: 1 }}>
            <View>
                <Text style={styles.buttons}>Login to backup</Text>
                <Text style={styles.buttons}>Privacy</Text>
                <Text style={styles.buttons}>Data and Storage</Text>
            </View>
            <View>
                <Text style={styles.title}>Support</Text>
                <Text style={styles.buttons}>Ask a Question</Text>
                <Text style={styles.buttons}>FAQ.</Text>
                <Text style={styles.buttons}>Privacy Policy</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        paddingLeft: 10,
        marginTop: 20,
        color: color2,
    },
    buttons: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        height: 70,
        textAlignVertical: 'center',
        paddingLeft: 10,
        color: '#fff'
    }
})

export default SettingScreen;
