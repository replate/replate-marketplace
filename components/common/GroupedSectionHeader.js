import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import SectionHeader from './SectionHeader';
import Border from './Border';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class GroupedSectionHeader extends React.Component {

  static propTypes = {
    text: PropTypes.string,
  }

  static defaultProps = {
    text: "",
  }

  render() {
    if (Platform.OS === 'android') {
      return (<SectionHeader {...this.props} />);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
        <Border />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
    backgroundColor: Colors.offWhite,
  },

  text: {
    fontSize: UIConstants.fontSizes.normal,
    fontWeight: UIConstants.fontWeights.bold,
    color: Colors.secondaryText,
    marginLeft: UIConstants.margins.side,
    marginBottom: UIConstants.margins.tight,
    marginTop: UIConstants.margins.large,
  }
});

export default GroupedSectionHeader;
