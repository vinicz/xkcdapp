import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/Store';

import SplashView from './views/Splash/SplashView';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <SplashView
                    navigation = {this.props.navigation}/>
            </Provider>
        );
    }
}
