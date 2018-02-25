import {
    AppRegistry,
    BackHandler
} from 'react-native';

import XkcdApp from './src/MainNavigator'

BackHandler.addEventListener('hardwareBackPress', function() {
    BackHandler.exitApp()

    return false;
});

AppRegistry.registerComponent('XkcdApp', () => XkcdApp);
