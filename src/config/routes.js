import React from "react";
import { Animated, Easing, View } from "react-native";

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";

import { WelcomeScreen } from "../screens/WelcomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";

import { SearchMedicineScreen } from "../screens/SearchMedicineScreen";
import { MedicineApresentationsScreen } from "../screens/MedicineApresentationsScreen";
import { ApresentationDetailScreen } from "../screens/ApresentationDetailScreen";
import { CartScreen } from "../screens/CartScreen";
import { LoginScreen } from "../screens/LoginScreen";
import {
  RegisterScreen,
  NameScreen,
  EmailScreen,
  PasswordScreen,
  PhoneScreen,
  VerificationCodeScreen
} from "../screens/RegisterScreen";
import { ListProposalsScreen } from "../screens/ListProposalsScreen";
import { ListAddressScreen } from "../screens/ListAddressScreen";
import { ListCreditCardsScreen } from "../screens/ListCreditCardsScreen";
import { ListOrdersScreen } from "../screens/ListOrdersScreen";
import { AddAddressScreen } from "../screens/AddAddressScreen";
import { AddCreditCardScreen } from "../screens/AddCreditCardScreen";
import { ProposalScreen } from "../screens/ProposalScreen";
import { DrugstoreScreen } from "../screens/DrugstoreScreen";
import { ConfirmationScreen } from "../screens/ConfirmationScreen";
import { OrderScreen } from "../screens/OrderScreen";
import DialogSuccessScreen from "../screens/DialogSuccessScreen";
import DialogErrorScreen from "../screens/DialogErrorScreen";

import { CameraScreen } from "../screens/CameraScreen";
import { VersionScreen } from "../screens/VersionScreen";
import { PerfilEditScreen } from "../screens/PerfilEditScreen";

import { ProposalNotFoundScreen } from "../screens/ProposalNotFoundScreen";

import { Icon } from "../components/Icon";
import { IconWithBadge } from "../components/IconWithBadge";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;

      const thisSceneIndex = scene.index;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      });

      return { transform: [{ translateX }] };
    }
  };
};

export const TabsNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="home" size={24} color={tintColor} />
        )
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {
        header: null,
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        header: null,
        tabBarIcon: ({ focused, tintColor }) => (
          <Icon name="profile" size={24} color={tintColor} />
        )
      }
    }
  },
  {
    swipeEnabled: false,
    animationEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showLabel: false,
      upperCaseLabel: false,
      showIcon: true,
      activeTintColor: "#000000",
      activeBackgroundColor: "#FFFFFF",
      inactiveTintColor: "#CCCCCC",
      inactiveBackgroundColor: "#FFFFFF",
      indicatorStyle: {
        backgroundColor: "transparent"
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

export const MainNavigator = createStackNavigator(
  {
    //Phone: { screen: PhoneScreen },

    Tabs: {
      screen: TabsNavigator,
      navigationOptions: { header: null }
    },

    Welcome: { screen: WelcomeScreen },
    Profile: { screen: ProfileScreen },
    Notifications: { screen: NotificationsScreen },

    SearchMedicine: { screen: SearchMedicineScreen },
    MedicineApresentations: { screen: MedicineApresentationsScreen },
    ApresentationDetail: { screen: ApresentationDetailScreen },
    Cart: { screen: CartScreen },
    ListProposals: { screen: ListProposalsScreen },
    ListOrders: { screen: ListOrdersScreen },
    ListAddress: { screen: ListAddressScreen },
    ListCreditCards: { screen: ListCreditCardsScreen },
    NewAddress: { screen: AddAddressScreen },
    NewCreditCard: { screen: AddCreditCardScreen },
    Proposal: { screen: ProposalScreen },
    Drugstore: { screen: DrugstoreScreen },
    Confirmation: { screen: ConfirmationScreen },
    Order: { screen: OrderScreen },
    DialogSuccess: { screen: DialogSuccessScreen },
    DialogError: { screen: DialogErrorScreen },

    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Name: { screen: NameScreen },
    Email: { screen: EmailScreen },
    Password: { screen: PasswordScreen },
    Phone: { screen: PhoneScreen },
    VerificationCode: { screen: VerificationCodeScreen },

    Camera: { screen: CameraScreen },
    Version: { screen: VersionScreen },
    PerfilEdit: { screen: PerfilEditScreen }
  },
  {
    mode: "modal",
    transitionConfig
  }
);

export const MainContainer = createAppContainer(MainNavigator);
