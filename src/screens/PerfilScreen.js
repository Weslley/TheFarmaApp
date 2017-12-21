import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

export default class PerfilScreen extends Component<{}> {

	constructor(props) {
		super(props);		
		//this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	componentWillMount(){

	}

	componentDidMount(){

	}

	render() {
		return (
			<View style={styles.container}>
			<Text>Perfil</Text>
			</View>
			);
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}	
});