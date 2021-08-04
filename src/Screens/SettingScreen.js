import React, { useContext, useLayoutEffect } from 'react';
import { Linking } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../Providers/AuthProvider';
import { color1, color2 } from '../Styles/StyleValues';

const SettingScreen = ({ navigation }) => {

    // const { logout, user } = useContext(AuthContext)

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitleStyle: {
                color: '#000',

            },
            headerTitleStyle: {
                color: '#000'
            },
            // headerRight: () =>
            //     <View style={{ marginRight: 20 }}>
            //         {user && <Icon onPress={() => logout()} name='sign-out-alt' type='font-awesome-5' />}
            //     </View>
        })
    }, [navigation])

    return (
        <View style={{ flex: 1 }}>
            <View>
                {/* <TouchableOpacity>
                    <Text style={styles.buttons}>Login to backup</Text>
                </TouchableOpacity> */}
                <TouchableOpacity>
                    <Text style={styles.buttons}>Privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.buttons}>Data and Storage</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.title}>Support</Text>
                <TouchableOpacity>
                    <Text style={styles.buttons}>Ask a Question</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL("https://calm-beach-72495.herokuapp.com/")} >
                    <Text style={styles.buttons}>Privacy Policy</Text>
                </TouchableOpacity>
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
        // color: color2,
    },
    buttons: {
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        height: 70,
        textAlignVertical: 'center',
        paddingLeft: 10,
        color: '#000'
    }
})

export default SettingScreen;
