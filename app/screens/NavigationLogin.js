import React from 'react';
import LoadingScreen from './Loading'
import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'
import AppletScreen from './Home'
import ServiceScreen from './Settings'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

const AppStack = createBottomTabNavigator({ 
  Home: AppletScreen,
  Service: ServiceScreen
});
const AuthStack = createSwitchNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});

export default createAppContainer(createSwitchNavigator(
  {
    //AuthLoading: LoadingScreen,
    Auth: AuthStack,
    App: AppStack,
  }
  // ,
  // {
  //   initialRouteName: 'AuthLoading',
  // }
));