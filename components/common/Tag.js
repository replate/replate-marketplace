import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class Tag extends React.Component {

  static propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
  }

  render() {
    return (
      <View style={[
        styles.tagContainer,
        {backgroundColor: this.props.color}]}>
        <Text style={styles.tagText}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tagContainer: {
    position: 'absolute',
    borderRadius: 2,
    bottom: UIConstants.margins.standard,
    right: UIConstants.margins.standard,
    padding: UIConstants.margins.tight,
    paddingVertical: 3,
  },

  tagText: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: UIConstants.fontSizes.meta,
    fontWeight: UIConstants.fontWeights.bold,
  },
})

export default Tag;
