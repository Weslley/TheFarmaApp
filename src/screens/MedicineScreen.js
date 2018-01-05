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
import ApresentationCardItem from '../components/ApresentationCardItem';

import colors from '../values/colors';
import dimens from '../values/dimens';

const ic_home = require('../images/ic_home.png');

export default class MedicineScreen extends Component<{}> {

	static navigationOptions = {
		header: null,
		tabBarLabel: 'Home',
		tabBarIcon: ({ tintColor }) => (<Image source={ic_home} style={[styles.icon, {tintColor: tintColor}]} />)
	}

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
			            <Button transparent onPress={() => this.props.navigation.goBack()} style={{paddingLeft: 0, marginLeft: 8}}>
			            	<Icon name="arrow-back" style={{color: colors.black}}/>
			            </Button>
		        	</Left>
			        <Body>
			        	<Title></Title>
			        </Body>
		        	<Right />
		        </Header>

		        <View style={styles.container}>
		        	<Text style={styles.title}>Losartana Potássica</Text>
		        	<View style={{backgroundColor: colors.black, height: 1, marginBottom: dimens.marginNormal}}/>
          		</View>

				<ScrollView style={{paddingLeft: 24, paddingRight: 24}}>
					<View>
						<ApresentationCardItem />
						<ApresentationCardItem />
						<ApresentationCardItem />
						<ApresentationCardItem />
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
	title:{
		fontFamily: "Roboto-Bold",
		fontSize: 32,
		marginBottom: dimens.marginSmall
	}
});