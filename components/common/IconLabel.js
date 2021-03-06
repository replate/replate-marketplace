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

class IconLabel extends React.Component {

  static propTypes = {
    style: ViewPropTypes.style,
    iconColor: PropTypes.string,
    textColor: PropTypes.string,
    iconName: PropTypes.string,
    text: PropTypes.string,
    selectable: PropTypes.bool,
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
        <Text
          style={[styles.text, {color: this.props.textColor}]}
          selectable={this.props.selectable}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
  },

  text: {
    marginLeft:UIConstants.margins.side,
    marginTop: -1,
    fontSize: UIConstants.fontSizes.normal,
    lineHeight: UIConstants.iconSizes.label,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default IconLabel;
