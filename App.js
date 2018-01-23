import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

import Setup from './src/boot/setup';

EStyleSheet.build({
    $primaryColor: '#d439a9',

    $black: '#000',

    $iconDefaultColor: '#545454',
});

export default class App extends React.Component {
  render() {
    return <Setup />;
  }
}
