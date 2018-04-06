import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Container, Button, Text, Icon } from "native-base";
import { LoginButton } from "react-native-fbsdk";

import { connect } from "react-redux";
import { getCities } from "../../actions/cities";
import { getDistricts } from "../../actions/districts";

import { logout } from "../../actions/clients";

import { Header } from "../../layout/Header";
import { MenuItem } from "../../components/MenuItem";
import { ProfileMenuItem } from "../../components/ProfileMenuItem";

import { Components } from "../../helpers";
import styles from "./styles";

class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    this.props.dispatch(getCities());
  }

  /** Private functions */
  logout() {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>

        <Header
          title={this.props.client.nome}
          subtitle={"Visualizar e editar o seu perfil"}
          avatar={{ uri: this.props.client.foto } || require("../../assets/images/avatar.png")}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => { this.props.navigation.goBack(null) }}
            />
          }
        />

        <ScrollView style={{ paddingHorizontal: 24 }}>
          <ProfileMenuItem icon="history" text={"Minhas compras"} onPress={() => {
            this.props.navigation.navigate("ListOrders");
          }}
            badge={2} />
          <ProfileMenuItem icon="marker" text={"Meus Endereços"} onPress={() => {
            this.props.navigation.navigate("ListAddress", {
              title: "Meus Endereços"
            });
          }} />
          <ProfileMenuItem icon="card-a" text={"Meus Cartões"} onPress={() => {
            this.props.navigation.navigate("ListCreditCards");
          }} />
          <ProfileMenuItem icon="chat" text={"Dúvidas e Reclamações"} onPress={() => {
            this.props.navigation.navigate("DialogSuccess");
          }} />
        </ScrollView>

        <View style={{ paddingHorizontal: 24, }}>
          <Button style={[styles.button]} bordered dark onPress={() => this.logout()}>
            <Text style={styles.buttonText} uppercase={false}>{"Sair"}</Text>
            <Icon name="ios-arrow-round-forward-outline" style={styles.buttonIcon} />
          </Button>
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