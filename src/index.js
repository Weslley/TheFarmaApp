import React from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import store from './config/store';
import { MainContainer } from './config/routes';

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
    $bottom: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
    },
    $row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    //$outline: 1
});

export default () => (
    <Provider store={store}>
        <MainContainer />
    </Provider>
)