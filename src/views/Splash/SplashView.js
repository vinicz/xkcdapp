import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

const BackgroundView = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

const SplashText = styled.Text`
  font-size: 40px;
  color: black;
  text-align: center;
  padding-bottom: 200px;
`;

const kDelayTime = 2000;


type SplashViewPropTypes = {
    navigation: Object,
};

@connect()
export default class SplashView extends Component {
    props: SplashViewPropTypes;

    static navigationOptions = {
      header: null,
    };

    componentDidMount() {
      setTimeout(() => {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'ComicListView' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }, kDelayTime);
    }

    render() {
      return (
        <BackgroundView>
          <SplashText>XkcdApp</SplashText>
        </BackgroundView>
      );
    }
}
