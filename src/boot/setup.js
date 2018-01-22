import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { StyleProvider } from 'native-base';
import getTheme from '../theme/components';
import variables from '../theme/variables/commonColor';

import App from '../app';
import store from '../config/store';

export default class Setup extends Component {
	render() {
		return (
			<Provider store={store}>
				<StyleProvider style={getTheme(variables)}>
					<App />
				</StyleProvider>
			</Provider>
		);
	}
}
