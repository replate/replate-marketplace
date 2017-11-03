import React from 'react';

class NavigationHelper {

  static paramsToProps(SomeComponent) { 
  // turns this.props.navigation.state.params into this.params.<x>
    return class extends SomeComponent {
      render() {
        const {navigation, ...otherProps} = this.props
        const {state: {params}} = navigation
        return <SomeComponent {...this.props} {...params} />
      }
    }
  }
}

export default NavigationHelper;
