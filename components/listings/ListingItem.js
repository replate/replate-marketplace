import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableHighlight,
  Text,
  View,
  StyleSheet
} from 'react-native';

import Border from '../common/Border';
import Tag from '../common/Tag';

import ComponentStyles from '../../constants/ComponentStyles';
import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class ListingItem extends React.Component {

  static propTypes = {
    listing: PropTypes.object,
    onPressItem: PropTypes.func,
    active: PropTypes.bool,
  }

  static defaultProps = {
    active: false
  }

  _onPress = () => {
    this.props.onPressItem(this.props.listing);
  }

  render() {
    let tag = null;
    if (this.props.active) {
      tag = <Tag text="Active" color={Colors.blue}/>
    } else {
      tag = <Tag text={`${this.props.listing.distance.toFixed(1)} mi`} color={Colors.darkGray}/>
    }
    return (
      <TouchableHighlight
        onPress= {this._onPress} >
        <View style={[ComponentStyles.listingItemContainer]}>
          <View style={ComponentStyles.listingItemOverlay} />
          <Image
            style={ComponentStyles.listingItemImage}
            source={{uri: this.props.listing.image_url}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {this.props.listing.business_name}
            </Text>
            <Text style={styles.address}>
              {this.props.listing.short_address}
            </Text>
          </View>
          {tag}
          <Border />
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({

  textContainer: {
    position: 'absolute',
    left: UIConstants.margins.standard,
    right: UIConstants.margins.standard,
    bottom: UIConstants.margins.standard,
  },

  title: {
    backgroundColor: Colors.none,
    fontSize: UIConstants.fontSizes.title,
    color: Colors.white,
    fontWeight: UIConstants.fontWeights.bold,
    marginBottom: 1,
  },

  address: {
    backgroundColor: Colors.none,
    fontSize: UIConstants.fontSizes.normal,
    color: Colors.white,
  },
})

export default ListingItem;
