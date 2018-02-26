import React, { PureComponent } from 'react';
import { Image, View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image';
import autobind from 'autobind-decorator';
import styled from 'styled-components/native';
import { actions as comicLoadingActions } from '../../redux/sagas/comic_loading/ComicLoadingSagas';
import ComicDetailsView from './ComicDetailsView';

const ComicCellView = styled.View`
  margin: 5px;
  backgroundColor: white;
`;

const ComicCellText = styled.Text`
  text-align: center;
  font-size: 24px;
  padding-bottom: 10px;
`;

const ComicCellFastImage = styled(FastImage)`
  height: 200px;
`;


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
        <TouchableOpacity onPress={this.onComicSelected.bind(this, item)} >
          <ComicCellView>
            <ComicCellText>{item.safe_title}</ComicCellText>
            <ComicCellFastImage
              source={{ uri: item.img }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </ComicCellView>
        </TouchableOpacity>
      );
    }


    render() {
      return (
        <FlatList
          data={this.props.comicList}
          renderItem={this.renderLisItem}
          keyExtractor={(item, index) => item.num.toString()}
          refreshing={this.props.refreshing}
          onRefresh={this.props.refreshComicList}
          onEndReached={this.props.loadNextComicList}
        />
      );
    }
}
