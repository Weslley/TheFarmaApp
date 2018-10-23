import React, { Component } from "react";
import { View, ScrollView, Linking, TouchableOpacity, Platform } from "react-native";
import { Container, Button, Text, Icon } from "native-base";
import Snackbar from 'react-native-snackbar';

import { connect } from "react-redux";
import { getCities } from "../../actions/cities";

import { logout } from "../../actions/clients";

import { Header } from "../../layout/Header";
import { MenuItem } from "../../components/MenuItem";
import { ProfileMenuItem } from "../../components/ProfileMenuItem";

import { SUPPORT_LINK } from "../../config/server";
import styles from "./styles";

import DeviceInfo from 'react-native-device-info';

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

  getPhoto() {
    if (this.props.client && this.props.client.foto != null) {
      return { uri: this.props.client.foto }
    } else {
      return null
    }
  }

  openSupport() {
    try {
      Linking.openURL(SUPPORT_LINK);
    } catch (error) {
      console.log(error);
      Snackbar.show({ title: "Erro ao abrir o whatsapp.", duration: Snackbar.LENGTH_SHORT });
    }
  }

  showVersionScreen() {
    this.props.navigation.navigate({ key: 'version1', routeName: 'Version', params: {} });
  }

  showPerfil() {
    this.props.navigation.navigate({ key: 'PerfilEdit', routeName: 'PerfilEdit', params: {} });
  }

  getVersion(){
    if(Platform.OS === 'ios'){
      return `Versão 1.0.0`;
    }else{
      return `Versão ${DeviceInfo.getVersion()}`;
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>

        <Header
          onPressProfile={() => { this.showPerfil() }}
          title={this.props.client.nome}
          subtitle={"Visualizar e editar o seu perfil"}
          avatar={this.getPhoto()}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => { this.props.navigation.goBack(null) }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
            />
          }
        />

        <ScrollView style={{ paddingHorizontal: 24 }}>
          <ProfileMenuItem icon="history" text={"Minhas compras"} onPress={() => {
            this.props.navigation.navigate({ key: 'list_orders1', routeName: 'ListOrders', params: {} });
          }} />

          <ProfileMenuItem icon="marker" text={"Meus Endereços"} onPress={() => {
            this.props.navigation.navigate({ key: 'list_address1', routeName: 'ListAddress', params: {} });
          }} />

          <ProfileMenuItem icon="card-a" text={"Meus Cartões"} onPress={() => {
            this.props.navigation.navigate({ key: 'list_credit1', routeName: 'ListCreditCards', params: {} });
          }} />

          <ProfileMenuItem icon="chat" text={"Dúvidas e Reclamações"} onPress={() => { this.openSupport() }} />
        </ScrollView>

        <View style={{ paddingHorizontal: 24, }}>
          <TouchableOpacity style={{ marginBottom: 16, }} onPress={() => { this.showVersionScreen() }}>
            <Text style={styles.version}>{this.getVersion()}</Text>
          </TouchableOpacity>

          <Button style={[styles.button, { borderWidth: 2, borderRadius: 0, borderColor: '#000', }]} bordered dark onPress={() => this.logout()}>
            <Text style={styles.buttonText} uppercase={false}>{"Sair"}</Text>
            <Icon name="md-exit" style={styles.buttonIcon} />
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