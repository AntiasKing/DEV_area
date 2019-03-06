import React from 'react';
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Nav from './screens/NavigationLogin'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { TabNavigator } from 'react-navigation'

export default class App extends React.Component {
  render() {
    return (
      <Nav/>
    );
  }
}