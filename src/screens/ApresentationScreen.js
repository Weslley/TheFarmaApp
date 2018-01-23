import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Image } from "react-native";

import {
	Container,
	Header,
	Title,
	Button,
	Icon,
	Left,
	Right,
	Body,
	Text,
	List,
	ListItem,
	Thumbnail
} from "native-base";

import { addItemToCart, removeItemToCart } from "../actions/carrinho";

import CONFIG from "../utils/config";
import colors from "../values/colors";
import dimens from "../values/dimens";

const icHome = require("../images/ic_home.png");
const imgDefault = require("../images/ic_default_medicine.png");

class ApresentationScreen extends Component {
	static navigationOptions = {
		header: null,
		tabBarLabel: "Home",
		tabBarIcon: ({ tintColor }) => (
			<Image source={icHome} style={[styles.icon, { tintColor }]} />
		)
	};
	
	constructor(props) {
		super(props);
		this.state = {
			apresentation: null,
			generics: []
		}
	}
	
	componentDidMount() {
		axios
		.get(`${CONFIG.IP_SERVER}/apresentacoes/${this.props.uf}/${this.state.apresentation.id}/genericos/`)
		.then(res => this.setState({ generics: res.data.results }))
		.catch(err => console.error('ERROR ---', err));
	}
	render() {
		return (
			<ScrollView>
			<Container style={{ backgroundColor: colors.white }}>
			<Header style={styles.header}>
			<Left>
			<Button transparent onPress={() => this.props.navigation.goBack()} style={{ paddingLeft: 0, marginLeft: 8 }}>
			<Icon name="arrow-back" style={{ color: colors.black }} />
			</Button>
			</Left>
			<Right />
			</Header>
			
			<Content>
			{apresentation.imagem ? <Image style={{ width: 144, height: 144 }} source={{ uri: apresentation.imagem }} /> : <Image style={{ width: 144, height: 144 }} source={imgDefault} />}
			
			<View style={{ marginHorizontal: dimens.marginMedium }}>
			<Text>{apresentation.produto.nome}</Text>
			
			<View style={{ backgroundColor: colors.black, height: 1, marginBottom: dimens.marginNormal }} />
			
			<Text>{apresentation.produto.fabricante}</Text>
			<Text>{apresentation.nome}</Text>
			
			<Body style={{ paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
			<Text
			style={{
				flex: 1,
				fontFamily: "Roboto-Medium",
				fontSize: 18,
				color: colors.purple
			}}
			>
			{apresentation.preco}
			</Text>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
			<Button transparent onPress={() => this.props.dispatch(removeItemToCart(apresentation))}>
			<Icon name="remove" />
			</Button>
			<Text>{apresentation.quantity}</Text>
			<Button transparent onPress={() => this.props.dispatch(addItemToCart(apresentation))}>
			<Icon name="add" />
			</Button>
			</View>
			</Body>
			</View>
			
			{renderIf(this.state.generics.length > 0, 
				<View style={{ marginHorizontal: dimens.marginMedium }}>
				<Text style={{}}>Genéricos e Similhares</Text>
				<List 
				style={{ marginRight: 24 }} 
				dataArray={this.state.generics} 
				renderRow={generic => (<ListItem />)}/>
				</View>
			)}
			
			</Content>
			</Container>
			</ScrollView>
		);
	}
}

function mapStateToProps(state) {
	return {
		uf: state.localizacao.uf,
	};
}

export default connect(mapStateToProps)(ApresentationScreen);