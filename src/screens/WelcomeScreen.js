import React, { Component } from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation';

import Main from './Main';

const routes = StackNavigator({
	Main: { screen: Main },
});

//const colors = require('../utils/colors');
const logo = require('../images/ic_logo.png');

export default class WelcomeScreen extends Component<{}> {

	constructor(props){
		super(props);
		const { navigate } = this.props.navigation;
	}

	componentWillMount() {

	}

	componentDidMount() {
		navigate('Main', { name: 'Jane' });
	}

	render() {
		return (
			<View style={styles.container}>
			<Image source={logo} style={styles.logo}/>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#009688',
		alignItems: 'center',
		justifyContent: 'center'
	},
	logo: {
		width: 125,
		height: 160
	}
});