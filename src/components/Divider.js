import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';

export default class Divider extends Component<{}> {

	constructor(props){
		super(props);
	}

	componentWillMount(){}

	componentDidMount(){}

	render(){
		const { background, heightSize } = this.props;
		
		let backgroundColor = background==='undefined'? "#CCCCCC" : background;
		let height = heightSize === 'undefined'? 1 : height; 

		const styles = {
			divider: { 
				backgroundColor: backgroundColor,
				height: height,
			}
		};

		return (<View style={styles.divider} />);
	}
}