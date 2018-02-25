import { StackNavigator } from 'react-navigation';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import ComicListView from './views/ComicList/ComicListView';
import ComicDetailsView from './views/ComicList/ComicDetailsView';
import SplashView from './views/Splash/SplashView';
import store from './redux/Store';

const AppNavigator = new StackNavigator(
  {
    SplashView: { screen: SplashView },
    ComicListView: { screen: ComicListView },
    ComicDetailsView: { screen: ComicDetailsView },
  },
  {
    headerMode: 'screen',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

