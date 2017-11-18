import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../constants/Colors';
import UIConstants from '../../constants/UIConstants';

class ListRow extends React.Component {

  static propTypes = {
    style: ViewPropTypes.style,
    onPress: PropTypes.func,
    showCaret: PropTypes.bool,
  }

  render() {
    return (
      <TouchableOpacity
        disabled={this.props.onPress == null}
        onPress={this.props.onPress} >
        <View style={[styles.container, this.props.style]}>
          <View style={styles.childrenContainer}>
            {this.props.children}
          </View>
          { (this.props.showCaret) ?
            <Icon 
              name={'keyboard-arrow-right'} 
              size={UIConstants.iconSizes.label}
              color={Colors.alphaColor(Colors.darkGray, 0.4)}
              style={styles.caret}
            />
            : null
          }
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: UIConstants.margins.side,
    paddingVertical: UIConstants.margins.standard,
  },

  childrenContainer: {
    flex: 1,
  },

  caret: {
    marginLeft: UIConstants.margins.standard,
    alignSelf: 'center',
  }

});

export default ListRow;
