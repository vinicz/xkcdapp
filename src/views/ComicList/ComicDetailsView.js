import React, { PureComponent } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import { actions as comicLoadingActions } from '../../redux/sagas/comic_loading/ComicLoadingSagas';


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
export default class ComicDetailsView extends PureComponent {
    static navigationOptions = ({ navigation }) => {
      const { comic } = navigation.state.params;

      return {
        title: comic.safe_title,
      };
    };

    render() {
      const { comic } = this.props.navigation.state.params;
      return (
        <ImageViewer
          imageUrls={[{ url: comic.img }]}
          renderIndicator={() => null}
        />
      );
    }
}
