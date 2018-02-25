import React, {PureComponent} from 'react';
import {Image, View, Text, ImageEditor} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image'
import {actions as comicLoadingActions} from '../../redux/sagas/comic_loading/ComicLoadingSagas'


@connect(
    state => ({
        latestComic: state.comics.latestComic,
    }),
    dispatch => ({
        loadLatestComic: bindActionCreators(comicLoadingActions.loadLatestComic, dispatch),
    }),
)
export default class SplashView extends PureComponent {
    state = {
        imageUri: "",
    }



    componentDidMount() {
        this.props.loadLatestComic()
    }

    componentWillReceiveProps(newProps){
        if(newProps.latestComic.safe_title) {

            const cropData = {
                offset: {x: 0, y: 0},
                size: {
                    height: 200,
                    width: 300,
                },
                resizeMode: 'contain',
            };
            ImageEditor.cropImage(
                newProps.latestComic.img,
                cropData,
                (imageUri) => {
                    this.setState({imageUri});
                },
                e => Logger.error(e),
            );
        }
    }

    render() {
        console.log("render latestcomic: "+JSON.stringify(this.props.latestComic))



        if(this.state.imageUri) {
            return (
                <View>

                    <Text>{this.props.latestComic.safe_title}</Text>
                    <Image style={{height:300}} source={{uri: this.state.imageUri}} resizeMode="contain"/>
                    <FastImage
                        style={{ height:300}}
                        source={{
                            uri: this.props.latestComic.img,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                </View>
            );
        }
        return null;
    }
}