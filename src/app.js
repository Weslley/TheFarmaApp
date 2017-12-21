import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens, registerScreenVisibilityListener} from './screens';


// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

const ic_home = require('./images/ic_home.png');
const ic_alarm = require('./images/ic_alarm.png');
const ic_cart = require('./images/ic_shopping_cart.png');
const ic_perfil = require('./images/ic_person.png');

const tabs = [{
  screen: 'HomeFragment',
  icon: ic_home,  
}, {
  screen: 'AlarmFragment',
  icon: ic_alarm,
}, {
  //label: 'Cestinha',
  screen: 'ShoppingFragment',
  icon: ic_cart,
  title: 'Cestinha',
}, {
  //label: 'Perfil',
  screen: 'PerfilFragment',
  icon: ic_perfil,
}];

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
  tabsStyle: {
    tabBarBackgroundColor: '#ffffff',
    tabBarButtonColor: '#cccccc',
    tabBarSelectedButtonColor: '#000000',
    tabFontFamily: 'BioRhyme-Bold',
  },
  appStyle: {
    tabBarBackgroundColor: '#ffffff',
    navBarButtonColor: '#ffffff',
    tabBarButtonColor: '#cccccc',
    navBarTextColor: '#ffffff',
    tabBarSelectedButtonColor: '#000000',
    //navigationBarColor: '#003a66',
    navBarBackgroundColor: '#003a66',
    statusBarColor: '#002b4c',
    tabFontFamily: 'BioRhyme-Bold',
  }
});
