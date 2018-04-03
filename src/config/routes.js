import React, { Component } from "react";
import { Image } from "react-native";

import { StackNavigator, TabNavigator } from "react-navigation";

import { WelcomeScreen } from "../screens/WelcomeScreen";
import { SearchMedicineScreen } from "../screens/SearchMedicineScreen";
import { MedicineApresentationsScreen } from "../screens/MedicineApresentationsScreen";
import { ApresentationDetailScreen } from "../screens/ApresentationDetailScreen";
import { CartScreen } from "../screens/CartScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { ListProposalsScreen } from "../screens/ListProposalsScreen";
import { ListAddressScreen } from "../screens/ListAddressScreen";
import { ListCreditCardsScreen } from "../screens/ListCreditCardsScreen";
import { ListOrdersScreen } from "../screens/ListOrdersScreen";
import { AddAddressScreen } from "../screens/AddAddressScreen";
import { AddCreditCardScreen } from "../screens/AddCreditCardScreen";
import { ProposalScreen } from "../screens/ProposalScreen";
import { DrugstoreScreen } from "../screens/DrugstoreScreen";
import { ConfirmationScreen } from "../screens/ConfirmationScreen";
import DialogSuccessScreen from "../screens/DialogSuccessScreen";
import DialogErrorScreen from "../screens/DialogErrorScreen";

export const HomeNavigator = StackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require("../assets/images/ic_home.png")}
          style={[{width: 24, height: 24}, { tintColor }]} />
      ),
      tabBarLabel: "home"
    }
  }
});

export const TabsNavigator = TabNavigator(
  {
    Home: {
      screen: HomeNavigator
    },
    Profile: {
      screen: ProfileScreen
    }
  },
  {
    swipeEnabled: false,
    animationEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: true,
      upperCaseLabel: false,
      showIcon: true,
      activeTintColor: "#00C7BD",
      activeBackgroundColor: "#FFFFFF",
      inactiveTintColor: "#000000",
      inactiveBackgroundColor: "#FFFFFF",
      indicatorStyle: {
        backgroundColor: 'transparent',
      },
      style: {
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 0
      },
      labelStyle: {
        fontSize: 14,
        margin: 0
      }
    }
  }
);

export const MainNavigator = StackNavigator(
  {
    TabsNavigator: {
      screen: TabsNavigator,
      navigationOptions: { header: null }
    },
    SearchMedicine: {
      screen: SearchMedicineScreen
    },
    MedicineApresentations: {
      screen: MedicineApresentationsScreen
    },
    ApresentationDetail: {
      screen: ApresentationDetailScreen
    },
    Cart: {
      screen: CartScreen
    },
    ListProposals: {
      screen: ListProposalsScreen
    },
    ListOrders: {
      screen: ListOrdersScreen
    },
    ListAddress: {
      screen: ListAddressScreen
    },
    ListCreditCards: {
      screen: ListCreditCardsScreen
    },
    NewAddress: {
      screen: AddAddressScreen
    },
    NewCreditCard: {
      screen: AddCreditCardScreen
    },
    Proposal: {
      screen: ProposalScreen
    },
    Drugstore: {
      screen: DrugstoreScreen
    },
    Confirmation: {
      screen: ConfirmationScreen
    },
    DialogSuccess: {
      screen: DialogSuccessScreen
    },
    DialogError: {
      screen: DialogErrorScreen
    },
    Register: { 
      screen: RegisterScreen 
    }
  },
  {
    mode: "modal"
  }
);
