import React, { Component } from 'react';
import { StyleSheet, View, Image, Picker } from 'react-native';
import {
	Container,
	Header,
	Content,
	Button,	
	Icon,
	Item,	
	Right,
	Text
} from 'native-base';

import axios from 'axios';
import Permissions from 'react-native-permissions';

//import realm from '../models/realm';
import Estados from '../models/Estados';
import configuracao from "../utils/config";
import colors from "../values/colors";
import dimens from "../values/dimens";

const ichome = require('../images/ic_home.png');
const logo = require('../images/ic_logo.png');

export default class HomeScreen extends Component {
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Home',
		tabBarIcon: ({ tintColor }) => (<Image source={ichome} style={[styles.icon, { tintColor }]} />)
	}

	watchID = null

	constructor(props) {
		super(props);
		this.state = {
			latitude: 0.0,
			longitude: 0.0,
			uf: null,
			cities: [],
			districts: [],
		};
	}

	componentWillMount() {
		Permissions.checkMultiple(['camera', 'photo', 'location']).then(response => {
			this.setState({
				cameraPermission: response.camera,
				photoPermission: response.photo,
				locationPermission: response.location
			});
		});
	}

	componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

	componentDidMount() {
		if (this.state.locationPermission === 'authorized') {
			this.getLocation();
		} else {
			Permissions.request('location').then(response => {
				this.setState({ locationPermission: response });

				if (response === 'authorized') {
					this.getLocation();
				}
			});
		}
	}

	getLocation() {
		this.watchID = navigator.geolocation.watchPosition((position) => {
			this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
		});
	}

	dialogChooseState() {
		<Picker
  			selectedValue={this.state.uf}
  			onValueChange={(itemValue, itemIndex) => this.setState({uf: itemValue})}>
			{Estados.getListaEstados().forEach((estado) => {
				<Picker.Item label={estado.nome} value={estado.sigla} />
			})}
		</Picker>
	}

	syncCidades(url) {
		axios.get(configuracao.IP_SERVER + url)
			.then((resp) => {
				console.log(resp);
			})
			.catch((error) => {
				return error;
			});		
	}

	syncBairros(url) {
		axios.get(configuracao.IP_SERVER + url)
			.then((resp) => {
				resp.data.results;
			})
			.catch((error) => {
				return error;
			});	
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<Container style={styles.main_container}>
				<Header style={styles.header} />
				<Content style={styles.container} >
					<View style={{ marginBottom: dimens.marginMedium }}>
						<Item>
							<Text style={styles.text1}>Bom dia, Cliente</Text>
							<Right>
								<View style={{ backgroundColor: colors.textColorSecundary }}>
									<Image source={logo} style={{ width: 30, height: 40, marginBottom: dimens.marginSmall }} />
								</View>
							</Right>
						</Item>
						<View style={{ backgroundColor: colors.textColorDark, height: 1 }} />
					</View>
					
					<View style={{ padding: 2 }}>
						<Button 
							style={styles.button}
							onPress={() => navigate('SearchMedicineScreen')} >
							<Text uppercase={false} style={{ fontFamily: 'Roboto', fontSize: 16, color: colors.textColorDark }}>Qual medicamento você deseja?</Text>
							<Right style={{ marginRight: 10 }}>
								<Icon active name='ios-search' size={24} />
							</Right>
						</Button>
					</View>

					<View>
						<Button onPress={() => { this.syncCidades('/cidades'); }}>
							<Text>Exibir coordenadas</Text>
						</Button>
					</View>
				
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  main_container: {
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.white,
    elevation: 0, //remove shadow on Android
    shadowOpacity: 0 //remove shadow on iOS
  },
  container: {
    marginLeft: dimens.marginMedium,
    marginRight: dimens.marginMedium
  },
  button: {
    backgroundColor: colors.gray,
    padding: dimens.marginSmall,
    borderRadius: 100,
    elevation: 0,
    shadowOpacity: 0
  },
  text1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    color: colors.textColorDark
  }
});
