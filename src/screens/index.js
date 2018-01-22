import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';

import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen';

const Routes = StackNavigator({
  MainScreen: {screen: MainScreen},
  HomeScreen: {screen: HomeScreen}
},
{
  initialRouteName: 'MainScreen'
});