import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
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
  constructor(props) {
    //ios - close - circle - outline;
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };
  render() {
    return <Container style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 24 }}>
        <View>
          <Icon name="ios-checkmark-circle-outline" style={{ color: "#00C7BD", marginBottom: 64, marginTop: 64, fontSize: 100 }} />

          <Text style={styles.title}>
            {"Parabéns! Sua compra foi efetuada com sucesso."}
          </Text>

          <Text style={styles.description}>
            {"Para acompanhar seu pedido acesse Minhas Compras."}
          </Text>
        </View>

        <View style={[styles.footer, {}]}>
          <TouchableOpacity style={{ marginBottom: 16 }} onPress={() => {}}>
            <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonMyOrders}>
              <Text style={styles.buttonMyOrdersText}>
                {"minhas compras"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonHome} onPress={() => {}}>
            <Text style={styles.buttonHomeText}>{"home"}</Text>
          </TouchableOpacity>
        </View>
      </Container>;
  }
}

export default DialogSuccessScreen;
