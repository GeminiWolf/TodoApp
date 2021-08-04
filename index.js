import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import AsyncStorage from '@react-native-async-storage/async-storage';
import keys from './constants/keys';
import Parse from "parse/react-native.js";

// Parse.setAsyncStorage(AsyncStorage);
// Parse.initialize(keys.applicationId, keys.javascriptKey);
// Parse.serverURL = keys.serverURL;

AppRegistry.registerComponent(appName, () => App);
