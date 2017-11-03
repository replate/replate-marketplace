import React from 'react';
import PropTypes from 'prop-types';
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';

class SectionBorder extends React.Component {

  static propTypes = {
    color: PropTypes.string,
  }

  static defaultProps = {
    color: Colors.lightGray,
  }

  render() {
    return (
      <View style={{
        width: '100%', 
        height: 1 / PixelRatio.get(),
        backgroundColor: this.props.color
       }} />
    );
  }
}

const styles = StyleSheet.create({

  indicator: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  text: {
    width: '100%', 
    textAlign: 'center',
  }
});

export default SectionBorder;
