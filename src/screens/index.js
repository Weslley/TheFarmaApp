import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';

import HomeScreen from './HomeScreen';
import SearchMedicineScreen from './SearchMedicineScreen';
import MedicineScreen from './MedicineScreen';
import ApresentationScreen from './ApresentationScreen';

import AlarmScreen from './AlarmScreen';
import CartScreen from './CartScreen';
import PerfilScreen from './PerfilScreen';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

export function registerScreens() {

  Navigation.registerComponent('HomeFragment', () => HomeScreen);
  Navigation.registerComponent('SearchFragment', () => SearchMedicineScreen);
  Navigation.registerComponent('MedicineFragment', () => MedicineScreen);
  Navigation.registerComponent('ApresentationFragment', () => ApresentationScreen);

  Navigation.registerComponent('AlarmFragment', () => AlarmScreen);
  Navigation.registerComponent('ShoppingFragment', () => CartScreen);
  Navigation.registerComponent('PerfilFragment', () => PerfilScreen);

  Navigation.registerComponent('LoginScreen', () => LoginScreen);
  Navigation.registerComponent('RegisterScreen', () => RegisterScreen);
}

export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
    didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
    willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
    didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
  }).register();
}