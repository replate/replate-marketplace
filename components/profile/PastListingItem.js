import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet
} from 'react-native';

import ListRow from '../common/ListRow';

import ComponentStyles from '../../constants/ComponentStyles';
import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class PastListingItem extends React.Component {

  static propTypes = {
    listing: PropTypes.object,
    onPressItem: PropTypes.func,
  }

  _onPress = () => {
    this.props.onPressItem(this.props.listing);
  }

  render() {
    return (
      <ListRow
        onPress={this._onPress} 
        showCaret
      >
        <View style={styles.container} >
          <Image
            style={styles.image}
            source={{uri: this.props.listing.image_url}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{this.props.listing.business_name}</Text>
            <Text style={styles.address}>{this.props.listing.short_address}</Text>
          </View>
        </View>
      </ListRow>
    );
  }
}

const imageHeight = 34;

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
  },

  image: {
    width: imageHeight*2,
    height: imageHeight,
    borderRadius: 3,
  },

  textContainer: {
    flex: 1,
    marginLeft: UIConstants.margins.standard,
    marginRight: UIConstants.margins.standard,
  },

  title: {
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
    color: Colors.primaryText,
    lineHeight: imageHeight/2,
  },

  address: {
    fontSize: UIConstants.fontSizes.normal,
    color: Colors.secondaryText,
    lineHeight: imageHeight/2,
  }
})

export default PastListingItem;
