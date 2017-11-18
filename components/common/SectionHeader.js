import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Border from './Border';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class SectionHeader extends React.Component {

  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: "",
  }

  render() {
    return (
      <View style={styles.container}> 
        <Text style={styles.text}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    backgroundColor: (true) ? Colors.none : Colors.offWhite,
  },

  text: {
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
    color: Colors.secondaryText,
    marginLeft: UIConstants.margins.side,
    marginVertical: Platform.OS === 'android' ? 7 : 5,
  }
});

export default SectionHeader;
