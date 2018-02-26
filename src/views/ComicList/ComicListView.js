import React, { PureComponent } from 'react';
import { View, Modal, TouchableOpacity, Button, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FastImage from 'react-native-fast-image';
import autobind from 'autobind-decorator';
import styled from 'styled-components/native';
import { actions as comicLoadingActions } from '../../redux/sagas/comic_loading/ComicLoadingSagas';
import { actions as errorHandlingActions } from '../../redux/sagas/common/ErrorHandlingSagas';

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

const ErrorModalContainer = styled.View`
  flex: 1
  justify-content: center;
  align-items: center;
  background-color: 'rgba(0, 0, 0, 0.5)';
`;

const ErrorModalInnerContainer = styled.View`
  margin: 20px;
  padding: 20px;
  align-self: stretch;
  background-color: white;
`;

const ErrorModalText = styled.Text`
  text-align: center;
  font-size: 20px;
  padding-bottom: 10px;
`;

type ComicListViewPropTypes = {
    clearError: () => null,
    refreshComicList: () => null,
    loadNextComicList: () => null,
    comicList: Array<Object>,
    refreshing: Boolean,
    errorMessage: String,
    navigation: Object
};

@connect(
  state => ({
    comicList: state.comics.comicList,
    refreshing: state.meta.refreshing,
    errorMessage: state.error.errorMessage,
  }),
  dispatch => ({
    loadNextComicList: bindActionCreators(comicLoadingActions.loadNextComicList, dispatch),
    refreshComicList: bindActionCreators(comicLoadingActions.refreshComicList, dispatch),
    clearError: bindActionCreators(errorHandlingActions.clearError, dispatch),
  }),
)
export default class ComicListView extends PureComponent {
    props: ComicListViewPropTypes;

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
    onErrorModalClosed() {
      this.props.clearError();
      this.props.loadNextComicList();
    }

    @autobind
    renderLisItem(row) {
      const { item } = row;
      return (
        <TouchableOpacity onPress={() => this.onComicSelected(item)} >
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
        <View>
          <FlatList
            data={this.props.comicList}
            renderItem={this.renderLisItem}
            keyExtractor={item => item.num.toString()}
            refreshing={this.props.refreshing}
            onRefresh={this.props.refreshComicList}
            onEndReached={this.props.loadNextComicList}
          />
          <Modal
            visible={this.props.errorMessage.length > 0}
            animationType="slide"
            onRequestClose={() => this.onErrorModalClosed()}
          >
            <ErrorModalContainer>
              <ErrorModalInnerContainer>
                <ErrorModalText>{this.props.errorMessage}</ErrorModalText>
                <Button
                  onPress={() => this.onErrorModalClosed()}
                  title="RETRY"
                />
              </ErrorModalInnerContainer>
            </ErrorModalContainer>
          </Modal>
        </View>
      );
    }
}
