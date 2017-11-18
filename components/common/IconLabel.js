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
      <View style={[styles.container, this.props.style]}>
        <Icon 
          name={this.props.iconName} 
          size={UIConstants.iconSizes.label}
          color={Colors.darkGray}
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

  container: {
    flexDirection: 'row',
  },

  text: {
    marginLeft: UIConstants.margins.side,
    marginTop: -1,
    color: Colors.primaryText,
    fontSize: UIConstants.fontSizes.standard,
    lineHeight: UIConstants.iconSizes.label,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default IconLabel;
