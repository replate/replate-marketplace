import React from 'react';
import PropTypes from 'prop-types';
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../../constants/Colors';

class Border extends React.Component {

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

export default Border;
