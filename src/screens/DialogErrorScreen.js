import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Container, Icon, Text } from "native-base";

import EStyleSheet from "react-native-extended-stylesheet";
import LinearGradient from "react-native-linear-gradient";

import { Components } from "../helpers";

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

class DialogErrorScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF", paddingHorizontal: 24 }}>
        <View>
          <Icon name="ios-close-circle-outline" style={{ color: "#F0166D", marginBottom: 64, marginTop: 64, fontSize: 100 }} />
          <Text style={styles.title}>{"Erro! Seu cartão não pode ser debitado."}</Text>
          <Text style={styles.description}>{"Por favor, verificar a situação de seu cartão ou use outro cartão."}</Text>
        </View>

        <View style={[styles.footer, {}]}>
          {Components.renderIf(this.props.onPressButton,
            <TouchableOpacity style={{ marginBottom: 16 }} onPress={this.props.onPressButton}>
              <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.buttonMyOrders}>
                <Text style={styles.buttonMyOrdersText}>
                  {"Meus Cartões"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}

          {Components.renderIf(this.props.onPressClose,
            <TouchableOpacity style={styles.buttonHome} onPress={this.props.onPressClose}>
              <Text style={styles.buttonHomeText}>{"Fechar"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </Container>
    );
  }
}

export default DialogErrorScreen;