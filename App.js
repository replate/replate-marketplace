import React from 'react';
import LoginNavigator from './components/login/LoginNavigator'
import MainNavigator from './components/MainNavigator'

export default class App extends React.Component {
  render() {
    // TODO (amillman): locally store user's email and auth token
    // for persistent sign-in
    if (true) {
      return <MainNavigator />;
    } else {
      return <LoginNavigator />;
    }
  }
}