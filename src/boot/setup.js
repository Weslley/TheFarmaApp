import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import { StyleProvider } from 'native-base';
import getTheme from '../theme/components';
import variables from '../theme/variables/commonColor';

import App from '../app';
import reducers from '../reducers';

export default class Setup extends Component {
	render() {
		return (
			<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
				<StyleProvider style={getTheme(variables)}>
					<App />
				</StyleProvider>
			</Provider>
		);
	}
}
