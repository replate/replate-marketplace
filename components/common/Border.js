import React from 'react';
import PropTypes from 'prop-types';
import {
  PixelRatio,
  StyleSheet,
  Text,
  View,
  ViewPropTypes
} from 'react-native';

import Colors from '../../constants/Colors';

class Border extends React.Component {

  static propTypes = {
    style: ViewPropTypes.style,
    color: PropTypes.string,
  }

  static defaultProps = {
    color: Colors.lightGray,
  }

  render() {
    return (
      <View style={[{
        width: '100%',
        height: 1 / PixelRatio.get(),
        backgroundColor: this.props.color
       }, this.props.style]} />
    );
  }
}

export default Border;
