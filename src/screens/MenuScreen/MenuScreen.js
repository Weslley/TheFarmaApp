import React, { Component } from "react";
import {
  View,
  ScrollView,
  Linking,
  TouchableOpacity,
  Platform
} from "react-native";

import { Container, Text } from "native-base";
import Snackbar from "react-native-snackbar";
import { NavigationActions, StackActions } from "react-navigation";

import { connect } from "react-redux";

import { logout } from "../../actions/clients";

import { Icon } from "../../components/Icon";
import { Header } from "../../layout/Header";
import { MenuItem } from "../../components/MenuItem";
import { ProfileMenuItem } from "../../components/ProfileMenuItem";

import { SUPPORT_LINK } from "../../config/server";
import styles from "./styles";

import DeviceInfo from "react-native-device-info";

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  /** Private functions */
  logout() {
    try {
      this.props.dispatch(logout());
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Tabs", params: {} })]
      });
      this.props.navigation.dispatch(resetAction);
    } catch (err) {
      console.log(err);
    }
  }

  getPhoto() {
    if (this.props.client && this.props.client.foto != null) {
      return { uri: this.props.client.foto };
    } else {
      return null;
    }
  }

  openSupport() {
    try {
      Linking.openURL(SUPPORT_LINK);
    } catch (error) {
      console.log(error);
      Snackbar.show({
        title: "Erro ao abrir o whatsapp.",
        duration: Snackbar.LENGTH_SHORT
      });
    }
  }

  showVersionScreen() {
    this.props.navigation.navigate({
      key: "version1",
      routeName: "Version",
      params: {}
    });
  }

  showPerfil() {
    this.props.navigation.navigate({
      key: "PerfilEdit",
      routeName: "PerfilEdit",
      params: {}
    });
  }

  getVersion() {
    if (Platform.OS === "ios") {
      return `Versão 1.0.0`;
    } else {
      return `Versão ${DeviceInfo.getVersion()}`;
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <Header
          onPressProfile={() => {
            this.showPerfil();
          }}
          title={this.props.client.nome}
          avatar={this.getPhoto()}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => {
                this.props.navigation.goBack(null);
              }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
            />
          }
        />

        <ScrollView style={{ paddingHorizontal: 24 }}>
          <ProfileMenuItem
            icon="history"
            text={"Pedidos"}
            onPress={() => {
              this.props.navigation.navigate({
                key: "list_orders1",
                routeName: "ListOrders",
                params: {}
              });
            }}
          />

          <ProfileMenuItem
            icon="marker"
            text={"Endereços"}
            onPress={() => {
              this.props.navigation.navigate({
                key: "list_address1",
                routeName: "ListAddress",
                params: {}
              });
            }}
          />

          <ProfileMenuItem
            icon="card-a"
            text={"Forma de Pagamento"}
            onPress={() => {
              this.props.navigation.navigate({
                key: "list_credit1",
                routeName: "ListCreditCards",
                params: {}
              });
            }}
          />

          <ProfileMenuItem
            icon="chat"
            text={"Suporte TheFarma"}
            onPress={() => {
              this.openSupport();
            }}
          />

          <ProfileMenuItem
            icon="logout"
            text={"Deslogar"}
            onPress={() => {
                this.logout();
            }}
          />
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            marginBottom: 16
          }}
        >
          <TouchableOpacity
            style={{}}
            onPress={() => {
              this.showVersionScreen();
            }}
          >
            <Text style={styles.version}>{this.getVersion()}</Text>
          </TouchableOpacity>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client
  };
}

export default connect(mapStateToProps)(MenuScreen);
