import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	ScrollView
} from 'react-native';

import SearchBar from '../components/SearchBar'
import CacheMedicamentoAdapter from '../components/CacheMedicamentoAdapter'
import colors from '../values/colors';
import dimens from '../values/dimens';

export default class HomeScreen extends Component<{}> {

	constructor(props) {
		super(props);
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		if (event.id === 'contextualMenuDismissed') {
			this._contextualMenu = false;
		}
	}

	hiddenNavBar = () => {
		const to = this._toggleNavBar === 'hidden';
		this.props.navigator.toggleNavBar({to,animated: false,});
		this._toggleNavBar = to;
	};

	componentWillMount(){

	}

	componentDidMount(){
		this.hiddenNavBar();
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<SearchBar />
				</View>
				<ScrollView>
					<CacheMedicamentoAdapter text="Tyflen" />
					<CacheMedicamentoAdapter text="Tyflen" />
					<CacheMedicamentoAdapter text="Tyflen" />
					<CacheMedicamentoAdapter text="Tyflen" />
					<CacheMedicamentoAdapter text="Tyflen" />
					<CacheMedicamentoAdapter text="Tyflen" />
					<CacheMedicamentoAdapter text="Tyflen" />
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flex: 1,
		justifyContent: 'center',
		paddingLeft: dimens.marginMedium,
		paddingRight: dimens.marginMedium
	}	
});