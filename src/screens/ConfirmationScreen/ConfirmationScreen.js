import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Container, Text, List, ListItem } from "native-base";
import { TextInputMask, TextMask, MaskService } from "react-native-masked-text";

import { connect } from "react-redux";
import { checkout, clearError, clearOrder } from "../../actions/orders";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { ProductDescription } from "../../components/Product/";
import { AddressAdapter } from "../../components/Address";
import { CreditCardAdapter } from "../../components/CreditCard";

import { Components, CartUtils } from "../../helpers";

import styles from "./styles";

class ConfirmationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() { }

  /** Private functions */
  onBack() {
    this.props.dispatch(clearError());
    this.props.navigation.goBack(null);
  }

  _renderItem = ({ item }) => (
    <ProductDescription apresentation={item} />
  );

  render() {
    return
    (<Container style={{ backgroundColor: "#FFFFFF" }}>

      <Header
        title={"Confirmação"}
        subtitle={"Detalhes do seu pedido"}
        menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />} />

      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>{"Meu pedido"}</Text>

          <List
            dataArray={this.props.cartItems}
            renderRow={apresentation =>
              <ListItem style={styles.ListItem}>
                <ProductDescription apresentation={apresentation} />
              </ListItem>}
          />

          <View style={[styles.footerOrder, { marginBottom: 8, marginTop: 16 }]}>
            <Text style={styles.footerOrderTitle}>{"Entrega"}</Text>
            {Components.renderIfElse(this.props.order.valor_frete === "0.00",
              <Text style={footerOrderText} >{"GRÁTIS"}</Text>,
              <TextMask type={"money"} value={this.props.order.valor_frete} />
            )}
          </View>

          <View style={[styles.footerOrder]}>
            <Text style={footerOrderTitle}>{"Total"}</Text>
            <TextMask style={footerOrderText} type={"money"} value={this.props.order.proposta.valor_total} />
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>{"Pagamento"}</Text>

          {Components.renderIfElse(this.props.order.forma_pagamento === 0,
            <View>
              <CreditCardAdapter creditCard={this.props.creditCard} />
              <View style={styles.containerParcel}>
                <Text style={styles.parcelTitle} >{"Parcelas"}</Text>
                <Text style={styles.parcelText}>{`${MaskService.toMask('money', this.props.order.proposta.valor_total)} à vista`}</Text>
              </View>
            </View>,
            <View>
              <Text>{`Troco para ${MaskService.toMask('money', this.props.order.troco)}`}</Text>
            </View>
          )}
        </View>

        <View style={[styles.container, { marginBottom: 90 }]}>
          <Text style={styles.title}>{"Endereço para entrega"}</Text>
          <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
            <AddressAdapter address={this.props.address} />
          </View>
        </View>

      </ScrollView>

      <BottomBar buttonTitle="Confirmar" onButtonPress={() => { }} />
    </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    order: state.orders.order,
    address: state.addresses.address,
    creditCard: state.creditCards.creditCard,
  };
}

export default connect(mapStateToProps)(ConfirmationScreen);
