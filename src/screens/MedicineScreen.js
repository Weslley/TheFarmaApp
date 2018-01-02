import React, { Component } from 'react';
import {
	StyleSheet,
	View,	
	TextInput,
	Image,
	ScrollView
} from 'react-native';

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


export default class MedicineScreen extends Component<{}> {

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
			<Container style={{backgroundColor: colors.white,}}>
				<Header style={styles.header}>
		        	<Left>
			            <Button transparent onPress={() => this.props.navigation.goBack()} style={{paddingLeft: 0, marginLeft: 16}}>
			            	<Icon name="arrow-back" style={{color: colors.black}}/>
			            </Button>
		        	</Left>
			        <Body>
			        	<Title></Title>
			        </Body>
		        	<Right />
		        </Header>

		        <View style={styles.container}>
			        <Item>
	            		<Input placeholder="Nome do medicamento " style={{fontFamily: "Roboto-Bold", fontSize: 24}} placeholderTextColor="#CCC" />
	            		<Icon name="ios-close" style={{color: colors.black}}/>
	          		</Item>

	          		<Text uppercase style={{fontFamily: "Roboto-Bold", fontSize: 12, marginTop: 32, marginBottom: 8,}}>Resultado da busca</Text>
          		</View>

				<ScrollView style={{paddingLeft: 24, paddingRight: 24}}>
					<View>
						<CacheMedicamentoAdapter text="Tyflen" />
						<CacheMedicamentoAdapter text="Tyflen" />
						<CacheMedicamentoAdapter text="Tyflen" />
						<CacheMedicamentoAdapter text="Tyflen" />
						<CacheMedicamentoAdapter text="Tyflen" />
						<CacheMedicamentoAdapter text="Tyflen" />
						<CacheMedicamentoAdapter text="Tyflen" />
					</View>
				</ScrollView>
			</Container>
			);
	}

}

const styles = StyleSheet.create({
	header:{
		backgroundColor: colors.white,
		elevation: 0,
		shadowOpacity: 0,
	},
	container: {
		marginLeft: dimens.marginMedium,
		marginRight: dimens.marginMedium
	},
	icon: {
		width: 26,
		height: 26,
	},
});
