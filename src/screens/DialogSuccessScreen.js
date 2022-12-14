import { NavigationActions, StackActions } from 'react-navigation';;
import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, BackHandler } from "react-native";
import { Container, Footer, Icon, Text } from "native-base";

import { connect } from "react-redux";
import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";

import { Header } from "../layout/Header";

const styles = EStyleSheet.create({
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 24,
    color: "rgba(0,0,0,0.80)",
    marginBottom: 24
  },
  description: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)",
    lineHeight: 24
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  buttonMyOrders: {
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 28,
    paddingVertical: 14
  },
  buttonMyOrdersText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#FFFFFF"
  },
  buttonHome: {
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 28,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
    borderColor: "#AAA",
    borderWidth: 1
  },
  buttonHomeText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "rgba(0,0,0,0.80)"
  }
});

class DialogSuccessScreen extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  componentDidMount() {
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
  }

  onBackButtonPressAndroid = () => {
    try {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Tabs', params: {} })],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (error) {
      console.log(error);
    }
    return true;
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 24 }}>
        <View>
          <Icon name="ios-checkmark-circle-outline" style={{ color: "#00C7BD", marginBottom: 64, marginTop: 64, fontSize: 100 }} />
          <Text style={styles.title}>{"Parab??ns! Sua compra foi efetuada com sucesso."}</Text>
          <Text style={styles.description}>{"Para acompanhar seu pedido acesse Pedidos."}</Text>
        </View>

        <View style={[styles.footer]}>
          <TouchableOpacity style={{ marginBottom: 16 }} onPress={this.props.onPressButton}>
            <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonMyOrders}>
              <Text style={styles.buttonMyOrdersText}>
                {"Meus Pedidos"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonHome} onPress={this.props.onPressHome}>
            <Text style={styles.buttonHomeText}>{"Home"}</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

export default DialogSuccessScreen;
