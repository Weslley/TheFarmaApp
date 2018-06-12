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

  getPhoto(){
    if(this.props.client && this.props.client.foto!=null){
      return { uri: this.props.client.foto }
    }else{
      return null
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>

        <Header
          title={this.props.client.nome}
          subtitle={"Visualizar e editar o seu perfil"}
          avatar={ this.getPhoto() }
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

          <ProfileMenuItem icon="chat" text={"Dúvidas e Reclamações"} onPress={() => { }} />
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