import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import Button from 'react-native-button';

import Icon from 'react-native-vector-icons/MaterialIcons';
import IconLabel from '../common/IconLabel';

import UIConstants from '../../constants/UIConstants';
import Colors from '../../constants/Colors';

const downCaret = 'keyboard-arrow-down'

class ListingsTitle extends React.Component {

  _toggleModal = () => {
    this.props.onPressItem();
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Button
          onPress={this._toggleModal}>
          <Text style={[styles.text, {color: Colors.white}]}>
            {this.props.title}
          </Text>
          <Icon
            name={downCaret}
            size={UIConstants.iconSizes.navbar}
            color={Colors.white}
            style={[styles.icon]}
          />
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flexDirection: 'row',
  },

  text: {
    fontSize: UIConstants.fontSizes.title,
    fontWeight: UIConstants.fontWeights.title,
  },

  icon: {
    paddingTop: 5,
  }

})

export default ListingsTitle;