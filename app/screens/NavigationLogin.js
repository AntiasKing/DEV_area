import React from 'react';
import LoadingScreen from './Loading'
import SignInScreen from './SignIn'
import SignUpScreen from './SignUp'
import AppletScreen from './Home'
import ServiceScreen from './Settings'
import IPServerScreen from './IPServeur'
import Page1Screen from './RuleCreation/Page1'
import Page2Screen from './RuleCreation/Page2'
import Page3Screen from './RuleCreation/Page3'
import Page4Screen from './RuleCreation/Page4'
import Page5Screen from './RuleCreation/Page5'


import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation'

const AppStack = createBottomTabNavigator({ 
  Home: AppletScreen,
  Service: ServiceScreen
});
const AuthStack = createSwitchNavigator({
  IPServer: IPServerScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen
});
const AppletStack = createStackNavigator({
  Page1: Page1Screen,
  Page2: Page2Screen,
  Page3: Page3Screen,
  Page4: Page4Screen,
  Page5: Page5Screen
})

export default createAppContainer(createSwitchNavigator(
  {
    //AuthLoading: LoadingScreen,
    Auth: AuthStack,
    App: AppStack,
    Applet: AppletStack

  }
  // ,
  // {
  //   initialRouteName: 'AuthLoading',
  // }
));