import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';


type ComicDetailsViewPropTypes = {
    navigation: Object,
};

@connect()
export default class ComicDetailsView extends PureComponent {
    props: ComicDetailsViewPropTypes;

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
