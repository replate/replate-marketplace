import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  TextInput,
  View,
  ViewPropTypes,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class IconInput extends React.Component {

  static propTypes = {
    ...TextInput.propTypes,
    containerStyle: ViewPropTypes.style,
    iconColor: PropTypes.string,
    textColor: PropTypes.string,
    iconName: PropTypes.string,
  }

  static defaultProps = {
    iconColor: Colors.darkGray,
    textColor: Colors.primaryText,
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Icon
          name={this.props.iconName}
          size={UIConstants.iconSizes.label}
          color={this.props.iconColor}
        />
        <TextInput
          {...this.props}
          style={[this.props.style, styles.textInput, {color: this.props.textColor}]}
          placholderTextColor={Colors.alphaColor(this.props.textColor, 0.70)}
          underlineColorAndroid='transparent'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
  },

  textInput: {
    marginTop: (Platform.OS === 'android') ? -2 : -1,
    marginLeft: UIConstants.margins.side,
    fontSize: UIConstants.fontSizes.normal,
    paddingBottom: 0,
    flex: 1,
  },
});

export default IconInput;
