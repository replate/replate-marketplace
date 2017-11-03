import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';

import Colors from '../../constants/Colors';

class LoadingView extends React.Component {

  static propTypes = {
    style: ViewPropTypes.style,
    indicatorColor: PropTypes.string,
    isLoading: PropTypes.bool,
    renderLoading: PropTypes.func,
  }

  static defaultProps = {
    indicatorColor: Colors.darkGray,
    isLoading: true,
    renderLoading: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  _renderDefaultLoading = () => {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size={(Platform.OS === 'android') ? 'large' : 'small'}
        color={this.props.indicatorColor}
      />
    );
  }

  render() {
    if (this.props.isLoading) {
      var renderLoading = this.props.renderLoading;
      if (renderLoading === null) {
        renderLoading = this._renderDefaultLoading;
      }
      return (<View style={this.props.style} >{renderLoading()}</View>);
    } else {
      return (<View style={this.props.style} >{this.props.children}</View>);
    }
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
});

export default LoadingView;
