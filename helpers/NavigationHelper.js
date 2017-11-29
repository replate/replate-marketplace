import React from 'react';

class NavigationHelper {

  static paramsToProps(SomeComponent) {
  // turns this.props.navigation.state.params into this.params.<x>
    NewComponent = class extends React.Component {

      render() {
        const {navigation, ...otherProps} = this.props
        const {state: {params}} = navigation
        return <SomeComponent {...this.props} {...params} />
      }
    }

    Object.assign(NewComponent, SomeComponent);
    return NewComponent;
  }
}

export default NavigationHelper;
