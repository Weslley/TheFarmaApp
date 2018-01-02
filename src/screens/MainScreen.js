import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	ScrollView
} from 'react-native';

import {IconBadge} from 'react-native-icon-badge';
import {TabNavigator} from 'react-navigation';

import HomeScreen from './HomeScreen';
import AlarmScreen from './AlarmScreen';
import CartScreen from './CartScreen';
import PerfilScreen from './PerfilScreen';

import colors from '../values/colors';
import dimens from '../values/dimens';

export default class MainScreen extends Component<{}> {
	render() {
		const { badgeCount } = this.props

		const  Tabs = TabNavigator({
			Home: { screen: HomeScreen, },
			Alarm: { screen: AlarmScreen, },
			Cart: { screen: CartScreen, },
			Perfil: { screen: PerfilScreen, },
		}, 
		{
			swipeEnabled: false,
			animationEnabled: true,
			tabBarPosition: 'bottom',
			tabBarOptions: {
				showLabel: false,
				activeTintColor: '#000000',
				activeBackgroundColor: '#ffffff',
				inactiveTintColor: '#cccccc',
				inactiveBackgroundColor:'#FFFFFF',
				showIcon: true,
				style: {
					backgroundColor: '#FFFFFF',
				}
			}
		})
		return <Tabs />
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'center',
		paddingLeft: dimens.marginMedium,
		paddingRight: dimens.marginMedium
	},
});