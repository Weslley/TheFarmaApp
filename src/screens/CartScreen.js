import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	ScrollView
} from 'react-native';

import colors from '../values/colors';
import dimens from '../values/dimens';

const ic_cart = require('../images/ic_shopping_cart.png');

export default class CartScreen extends Component<{}> {

	static navigationOptions = {
		tabBarLabel: 'Home',
		tabBarIcon: ({ tintColor }) => (<Image source={ic_cart} style={[styles.icon, {tintColor: tintColor}]} />)
	};

	constructor(props) {
		super(props);		
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

	render() {
		return (
			<View style={styles.container}>
			<Text>Carrinho</Text>
			</View>
			);
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
	icon: {
		width: 26,
		height: 26,
	},
});
