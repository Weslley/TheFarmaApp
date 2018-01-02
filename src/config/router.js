import { StackNavigator, TabNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchMedicineScreen from '../screens/SearchMedicineScreen';
import MedicineScreen from '../screens/MedicineScreen';
import ApresentationScreen from '../screens/ApresentationScreen';

import AlarmScreen from '../screens/AlarmScreen';
import CartScreen from '../screens/CartScreen';
import PerfilScreen from '../screens/PerfilScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';


export const SearchStack = StackNavigator({
	Home: { 
		screen: HomeScreen, 
	},
	SearchMedicineScreen: { 
		screen: SearchMedicineScreen 
	},  
	MedicineScreen: { 
		screen: MedicineScreen 
	},
	ApresentationScreen: { 
		screen: ApresentationScreen 
	},	
});

const  Tabs = TabNavigator({
	Home: { 
		screen: SearchStack, 
	},
	Alarm: { 
		screen: AlarmScreen, 
	},
	Cart: { 
		screen: CartScreen, 
	},
	Perfil: { 
		screen: PerfilScreen, 
	},
}, 
{
	swipeEnabled: false,
	animationEnabled: true,
	tabBarPosition: 'bottom',
	tabBarOptions: {
		showLabel: false,
		activeTintColor: '#000000',
		activeBackgroundColor: '#ffffff',
		inactiveTintColor: '#cccccc',
		inactiveBackgroundColor:'#FFFFFF',
		showIcon: true,
		style: {
			backgroundColor: '#FFFFFF',
		}
	}
});

export const Root = StackNavigator({
	Tabs: { 
		screen: Tabs 
	},
	HomeScreen: {
		screen: HomeScreen
	}, 
	SearchMedicineScreen: {
		screen: SearchMedicineScreen
	},
	MedicineScreen: {
		screen: MedicineScreen
	},
	ApresentationScreen: {
		screen: ApresentationScreen
	}
},
{
	//initialRouteName: "MainScreen",
	mode: 'modal',
	headerMode: 'none'
});
