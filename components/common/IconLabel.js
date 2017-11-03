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
    iconName: PropTypes.string,
    text: PropTypes.string,
    selectable: PropTypes.bool,
  }

  render() {
    return (
      <View style={this.props.style}>
        <Icon 
          name={this.props.iconName} 
          size={UIConstants.iconSizes.label}
          color={Colors.darkGray}
          style={styles.icon}
        />
        <Text 
          style={styles.text}
          selectable={this.props.selectable}
        >
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  icon: {
    position: 'absolute',
  },

  text: {
    marginTop: 2,
    marginLeft: UIConstants.iconSizes.label + UIConstants.margins.side,
    color: Colors.primaryText,
    fontSize: UIConstants.fontSizes.standard,
  },
});

export default IconLabel;
