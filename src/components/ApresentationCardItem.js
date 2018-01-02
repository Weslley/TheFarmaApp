import React, { Component } from 'react';
import {StyleSheet, View, Image} from 'react-native';

import {
	Container,
	Header,
	Title,
	Content,
	Button,
	Input,
	Icon,
	Item,
	Left,
	Right,
	Body,
	Text
} from "native-base";

import colors from '../values/colors';
import dimens from '../values/dimens';

const ic_default_medicine = require('../images/ic_default_medicine.png');
const ic_add = require('../images/ic_add.png');
const ic_remove = require('../images/ic_remove.png');

export default class ApresentationCardItem extends Component<{}> {

	constructor(props){
		super(props);
	}

	componentWillMount(){}

	componentDidMount(){}

	render(){
		return (
			<View style={styles.MainContainer}>
				<View style={styles.SecundaryContainer}>
					<View style={styles.ImageContainer}>
						<Image style={styles.ProductImage} source={ic_default_medicine} />
					</View>

					<View style={styles.InfoContainer}>				
    					<Text style={styles.ApresentationName}>0,5mg/g + 1,0mg/g Cr Derm BG Al X 30 GR Loren Ipsun</Text>
						<Text style={styles.Maker} uppercase >Neo quimica</Text>

						<View style={styles.FooterContainer}>
							<Text style={styles.Price}>R$ 999,99</Text>
							<View style={styles.ActionsContainer}>

								<Button transparent 
										style={{width: 24, height: 24, marginRight: dimens.marginSmall}} 
										onPress={() => true} >
			            			<Image source={ic_remove} />
			            		</Button>

			            		<Text style={styles.Quantity}>{1}</Text>

			            		<Button transparent 
			            				style={{width: 24, height: 24}}
			            				onPress={() => true} >
			            			<Image source={ic_add} />
			            		</Button>

							</View>
						</View>
					</View>
				</View>

				<View style={{backgroundColor: "#CCCCCC", height: 0 }}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	MainContainer: {		
		flexDirection: 'column'
	},	
	SecundaryContainer:{
		flexDirection: 'row',
		paddingTop: 20,
		paddingBottom: 20,
	},
	ImageContainer:{
		marginRight: dimens.marginNormal,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ProductImage:{ 
		width: 88,
		height: 88
	},
	InfoContainer:{
		flex: 1,
		flexWrap: 'wrap'
	},
	ApresentationName:{
		flexWrap: "wrap",
		width: null,
		fontFamily: 'Roboto',
		fontSize: 14,
		marginBottom: dimens.marginSmall,
	},
	Maker:{
		fontFamily: 'Roboto-Bold',
		fontSize: 10,
		marginBottom: dimens.marginNormal,
	},
	FooterContainer:{
		flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
	},
	ActionsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
		alignItems: 'center',
	},
	Price:{
		fontFamily: "Roboto-Medium",
		fontSize: 18,
		color: colors.purple
	},
	Quantity: {
		fontFamily: "Roboto-Medium",
		fontSize: 18,
		width: 24, 
		height: 24,
		marginRight: dimens.marginSmall,
		textAlign: 'center',
	},
});
