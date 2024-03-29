import React, { useEffect } from 'react';
import MainStackNav from './src/Navigation.js/MainStackNav';
import { Platform, StatusBar } from 'react-native';

import Parse from "parse/react-native.js";
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/Providers/AuthProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { applicationId, javascriptKey, serverURL } from './constants/keys';
import { color3 } from './src/Styles/StyleValues';

// Parse.setAsyncStorage(AsyncStorage);
// Parse.initialize(applicationId, javascriptKey);
// Parse.serverURL = serverURL;

const App = () => {

  // useEffect(() => {

  //   const createInstallation = async () => {
  //     const Installation = await Parse.Object.extend(Parse.Installation);
  //     const installation = await new Installation();
  //     console.log('install')
  //     await installation.set("deviceType", Platform.OS);
  //     await installation.save();
  //   }

  //   createInstallation();
  // }, []);

  return (
    <AuthProvider>
      <StatusBar backgroundColor={color3} barStyle='light-content' />
      <NavigationContainer>
        <MainStackNav />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;