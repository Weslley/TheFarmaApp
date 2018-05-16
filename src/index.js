import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import store from './config/store';
import { TabsNavigator, MainNavigator } from './config/routes';

EStyleSheet.build({
    $primaryColor: '#00C7BD',
    $accentColor: '',
    $warningColor: '',

    $text: "#030303",
    $background: "#FFFFFF",
    $separator: "#000000",
    $textColorPrimary: "rgba(0,0,0,0.80)",
    $textColorSecundary: "rgba(0,0,0,0.32)",

    $buttonColor: "#50E3C2",
    //$outline: 1
});

export default () => (
    <Provider store={store}>
        <MainNavigator />
    </Provider>
)