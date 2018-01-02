import React, { Component } from 'react';
import {StackNavigator,} from 'react-navigation';

import MainScreen from './MainScreen';
import HomeScreen from './HomeScreen';
import SearchMedicineScreen from './SearchMedicineScreen';
import MedicineScreen from './MedicineScreen';
import ApresentationScreen from './ApresentationScreen';

import AlarmScreen from './AlarmScreen';
import CartScreen from './CartScreen';
import PerfilScreen from './PerfilScreen';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Routes = StackNavigator({
  MainScreen: {screen: MainScreen},
  HomeScreen: {screen: HomeScreen}
},
{
  initialRouteName: 'MainScreen'
});