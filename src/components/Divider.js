import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';

export default class Divider extends Component<{}> {

	constructor(props){
		super(props);
	}

	componentWillMount(){}

	componentDidMount(){}

	render(){
		return (
			<View style={styles.divider} />
		);
	}
}

const styles = StyleSheet.create({
	divider: { 
		backgroundColor: "#CCCCCC", 
		height: 1
	}
});
