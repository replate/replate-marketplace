import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import Button from 'react-native-button';

class LoadingButton extends React.Component {

  static propTypes = {
    ...Button.propTypes,
    title: PropTypes.string,
    isLoading: PropTypes.bool,
  }

  render() {
    let styleProps = StyleSheet.flatten(this.props.style);
    let textOpacity = this.props.isLoading ? 0 : 1;
    return (
      <Button 
        {...this.props} 
        disabled={this.props.isLoading}
      >
        <ActivityIndicator 
          style={[styles.indicator, {opacity: 1 - textOpacity}]} 
          color={styleProps.color} 
        />
        <Text 
          style={[styles.text, this.props.style, {opacity: textOpacity}]}
        >
          {(Platform.OS === 'ios') ? this.props.title : this.props.title.toUpperCase()}
        </Text>
      </Button>
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

export default LoadingButton;
