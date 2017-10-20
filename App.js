import React from 'react';
import { StatusBar } from 'react-native';
import LoginNavigator from './components/login/LoginNavigator'
import MainNavigator from './components/MainNavigator'

export default class App extends React.Component {
  render() {
    <StatusBar barStyle='light-content' translucent />
    // TODO (amillman): locally store user's email and auth token
    // for persistent sign-in
    if (false) {
      return <MainNavigator />;
    } else {
      return <LoginNavigator />;
    }
  }
}
