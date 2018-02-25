import { StackNavigator } from 'react-navigation';
// import LoginHolder from './Screens/Login/LoginHolder'
// import NewsScreenHolder from './Screens/News/NewsScreenHolder'
import App from './App'

const XkcdApp = new StackNavigator({
        App: { screen: App },
        },
    {
        headerMode: 'modal',
        navigationOptions: {
            gesturesEnabled: false
        }
    }
);

module.exports = XkcdApp
