import React from 'react';
import PropTypes from 'prop-types';
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Border from './Border';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class SectionBorder extends React.Component {

  static propTypes = {
    color: PropTypes.string,
    borderColor: PropTypes.string,
  }

  static defaultProps = {
    color: Colors.offWhite,
    borderColor: Colors.lightGray,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[
          {backgroundColor: this.props.color},
          styles.spacer
        ]} />
       </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    width: '100%',
  }, 

  spacer: {
    flex: 1,
    height: 8,
  }
});

export default SectionBorder;
