import React, { useContext, useEffect } from 'react';
import { Dimensions } from 'react-native';
import AuthStackNav from './AuthStackNav';
import AppStackNav from './AppStackNav';

import { AuthContext } from '../Providers/AuthProvider';
import AnimatedSplash from 'react-native-animated-splash-screen';
import logo from '../../Public/4f90cfc5-6240-40b3-b957-e7176b274d7a-removebg-preview.png'

const sw = Dimensions.get('window').width

const MainStackNav = () => {

    const { user, loading, setLoading } = useContext(AuthContext)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(true)
    //     }, 1000);
    //     setLoading(false)
    // }, []);

    return (
        // <AnimatedSplash
        //     translucent={true}
        //     isLoaded={false}
        //     logoImage={logo}
        //     backgroundColor={"#fff"}
        //     logoHeight={sw * 50 / 100}
        //     logoWidth={sw * 50 / 100}
        // >
            <AppStackNav />
        // </AnimatedSplash>
    )

}

export default MainStackNav;
