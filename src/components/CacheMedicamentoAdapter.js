import React, { Component } from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Divider from './Divider';
import colors from '../values/colors';

const ic_clock = require('../images/ic_recents.png');

export default class CacheMedicamentoAdapter extends Component<{}> {

	constructor(props){
		super(props);
	}

	componentWillMount(){}

	componentDidMount(){}

	render(){
		return (
			<View style={styles.MainContainer}>
				<View style={styles.SecundaryContainer}>
					<Image style={styles.Icon} source={ic_clock} />
					<Text style={styles.Text}>{this.props.text}</Text>
				</View>
				<Divider/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {
		flexDirection: 'column',
		alignItems: 'stretch'
	},
	SecundaryContainer:{
		flexDirection: 'row',
		paddingTop: 23,
		paddingBottom: 23
	},
	Icon: {
		width: 18,
		height: 18,
		marginRight: 16
	},
	Text:{
		color: "rgba(0,0,0,0.80)",
		fontSize: 16
	}
});
