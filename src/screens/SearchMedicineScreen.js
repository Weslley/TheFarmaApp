import React, { Component } from 'react';
import {
	StyleSheet,
	View,	
	Image,
	ScrollView,
	TextInput,
	Alert,
	ListView
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
	Text,
	Spinner
} from 'native-base';

import TimerMixin from 'react-timer-mixin';

import CacheMedicamentoAdapter from '../components/CacheMedicamentoAdapter';
import colors from '../values/colors';
import dimens from '../values/dimens';

import renderIf from '../utils/renderIf';

const ichome = require('../images/ic_home.png');

export default class SearchMedicineScreen extends Component<{}> {
	static navigationOptions = {
		header: null,
		tabBarLabel: 'Home',
		tabBarIcon: ({ tintColor }) => (<Image source={ichome} style={[styles.icon, { tintColor }]} />)
	}

	mixins: [TimerMixin]

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
		this.state = {
			isSearching: false,
			isLoading: false,
			searchType: 0,			
			dataSource: ds.cloneWithRows(['row 1', 'row 2']),
		};
		timer = 0;
	}

	componentWillMount() {
	}

	componentDidMount() {
	}

	_onSearchChange(query) {

		if (timer !== 0) {
			this.setState({ isLoading: false });
			clearTimeout(timer);
        }

		if (query.trim().length > 2) {
			timer = 0;
			timer = setTimeout(() => {
				this.loadResuts(query);
			}, 500);
		} else {
			this.loadSuggestions();
		}
	}

	loadCacheMedicines() {}

	loadSuggestions() {}

	loadResuts(query) {
		this.setState({ isLoading: true });
		Alert.alert(query);
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<Container style={{ backgroundColor: colors.white }}>
				<Header style={styles.header}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()} style={{ paddingLeft: 0, marginLeft: 16 }}>
			            	<Icon name="arrow-back" style={{ color: colors.black }} />
			            </Button>
		        	</Left>
			        <Body>
			        	<Title />
			        </Body>
		        	<Right />
		        </Header>

		        <View style={styles.container}>
			        <Item>
	            		<Input 
	            			style={{ fontFamily: 'Roboto-Bold', fontSize: 24 }} 
		            		placeholder="Nome do medicamento " 
		            		placeholderTextColor="#CCC" multiline={false}
							onChangeText={(text) => { this.onSearchChange(text); }} />

	            		<Icon 
	            			style={{ color: colors.black, fontSize: 30 }}
	            			name='ios-close' />
	          		</Item>

	          		{renderIf(this.state.isLoading,
	          			<Text uppercase style={{ fontFamily: 'Roboto-Bold', fontSize: 12, marginTop: 32, marginBottom: 8 }}>Resultado da busca</Text>
	          		)}
	          		
          		</View>

				{renderIf(this.state.isLoading,
					<Spinner color="#CCC" />
				)}

				<ScrollView style={{ paddingLeft: 24, paddingRight: 24 }}>
					<View>
						<CacheMedicamentoAdapter text="Tyflen" onPress={() => navigate('MedicineScreen')} />
						<CacheMedicamentoAdapter text="Tyflen" onPress={() => navigate('MedicineScreen')} />
						<CacheMedicamentoAdapter text="Tyflen" onPress={() => navigate('MedicineScreen')} />
					</View>
				</ScrollView>    		
			</Container>
			);
	}
}

const styles = StyleSheet.create({
	header: {
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
