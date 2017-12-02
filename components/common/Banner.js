import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

const bannerPadding = 4;
const iconSize = 30;

class Banner extends React.Component {

  static propTypes = {
    style: ViewPropTypes.style,
    type: PropTypes.string,
    message: PropTypes.string,
  }

  _typePicker = (success, error) => {
    switch(this.props.type) {
      case 'success':
        return success;
        break;
      case 'error':
        return error;
        break;
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={[
          styles.iconWrapper,
          {
            backgroundColor: this._typePicker(Colors.green, Colors.red)
          },
        ]}>
          <Icon
            name={this._typePicker('done', 'close')}
            size={17}
            color={Colors.white}
          />
        </View>
        <Text style={styles.message}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    padding: bannerPadding,
    borderRadius: iconSize/2 + bannerPadding,
    backgroundColor: Colors.white,

    // iOS Shadow
    shadowRadius: 3,
    shadowColor: Colors.offBlack,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    // Android Shadow
    elevation: 5,
  },

  iconWrapper: {
    width: iconSize,
    height: iconSize,
    borderRadius: iconSize/2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent:'center',
    alignSelf: 'flex-start',
  },

  message: {
    marginHorizontal: UIConstants.margins.tight,
    fontSize: UIConstants.fontSizes.normal,
    lineHeight: UIConstants.fontSizes.normal + 1,
    fontWeight: UIConstants.fontWeights.bold,
    color: Colors.primaryText,
    flexShrink: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
});

export default Banner;
