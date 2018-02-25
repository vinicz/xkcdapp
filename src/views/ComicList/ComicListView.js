import React, { PureComponent } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image';
import autobind from 'autobind-decorator';
import ImageViewer from 'react-native-image-zoom-viewer';
import { actions as comicLoadingActions } from '../../redux/sagas/comic_loading/ComicLoadingSagas';
import ComicDetailsView from './ComicDetailsView';


@connect(
  state => ({
    comicList: state.comics.comicList,
    refreshing: state.meta.refreshing,
  }),
  dispatch => ({
    loadNextComicList: bindActionCreators(comicLoadingActions.loadNextComicList, dispatch),
    refreshComicList: bindActionCreators(comicLoadingActions.refreshComicList, dispatch),
  }),
)
export default class ComicListView extends PureComponent {
    static navigationOptions = {
      header: null,
    };

    componentDidMount() {
      this.props.loadNextComicList();
    }

  @autobind
    onComicSelected(comic) {
      this.props.navigation.navigate('ComicDetailsView', { comic });
    }


  @autobind
    renderLisItem(row) {
      const item = row.item;
      return (
        <View>
          <TouchableOpacity onPress={this.onComicSelected.bind(this, item)} >
            <Text>{item.safe_title}</Text>
            <FastImage
              style={{ height: 100 }}
              source={{ uri: item.img }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </TouchableOpacity>
        </View>
      );
    }


    render() {
      return (
        <FlatList
          data={this.props.comicList}
          renderItem={this.renderLisItem}
          keyExtractor={(item, index) => item.num}
          refreshing={this.props.refreshing}
          onRefresh={this.props.refreshComicList}
          onEndReached={this.props.loadNextComicList}
        />
      );
    }
}
