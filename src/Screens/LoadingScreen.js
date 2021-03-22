import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { Animated, Dimensions, Easing, Image, View } from 'react-native';
import logo from '../../Public/4f90cfc5-6240-40b3-b957-e7176b274d7a-removebg-preview.png'

import AnimatedSplash from "react-native-animated-splash-screen";
import { AuthContext } from '../Providers/AuthProvider';

const sw = Dimensions.get('window').width

const LoadingScreen = () => {
    const { user, loading } = useContext(AuthContext)

    return (
        <AnimatedSplash
            translucent={true}
            isLoaded={loading}
            logoImage={logo}
            backgroundColor={"#fff"}
            logoHeight={sw * 50 / 100}
            logoWidth={sw * 50 / 100}
        >
        </AnimatedSplash>
    );
    // return (
    //     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }} >

    //         <Animated.Image source={logo} style={[{ width: sw * 40 / 100, height: sw * 40 / 100 }, { opacity: opacityValue }]} />
    //     </View>
    // );
}

export default LoadingScreen;
