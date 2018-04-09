import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Picker } from "react-native";
import { Container, Text } from "native-base";
import { TextInputMask, TextMask, MaskService } from "react-native-masked-text";

import { connect } from "react-redux";
import { checkout, clearError, clearOrder } from "../../actions/orders";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { OrderItemAdapter } from "../../components/Product/";
import { AddressAdapter } from "../../components/Address";
import { CreditCardAdapter } from "../../components/CreditCard";

import { Components, CartUtils } from "../../helpers";

import styles from "./styles";

class ConfirmationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parcelas: [],
      numero_parcelas: 1
    };
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

  _loadParcels() {
    let parcelas = []
    let max = this.props.order.proposta.quantidade_maxima_parcelas;
    for (i = 1; i <= max; i++) {
      let valor = (this.props.order.proposta.valor_total / i).toFixed(2);
      let sValor = MaskService.toMask('money', valor);
      if (i == 1) {
        parcelas.push({ id: i, label: `${sValor} à vista` })
      } else {
        parcelas.push({ id: i, label: `${i}X de ${sValor}` })
      }
    }
  }

  _changeParcelas = (q) => {
    this.setState({ parcela: q });
  }

  _checkout() {

  }

  _renderItem = ({ item }) => {
    let apresentation = this.props.order.itens.find(i => i.apresentacao.id === item.apresentacao)
    item.apresentacao = apresentation
    return item.possui ? (<OrderItemAdapter item={item} />) : null;
  };

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <Header
          title={"Confirmação"}
          subtitle={"Detalhes do seu pedido"}
          menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />} />

        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>{"Meu pedido"}</Text>

            <FlatList
              data={this.props.order.proposta.itens}
              keyExtractor={item => item.apresentacao.toString()}
              renderItem={this._renderItem}
            />

            <View style={[styles.footerOrder, { marginBottom: 8, marginTop: 16 }]}>
              <Text style={styles.footerOrderTitle}>{"Entrega"}</Text>
              {Components.renderIfElse(this.props.order.valor_frete === "0.00",
                <Text style={styles.footerOrderText} >{"GRÁTIS"}</Text>,
                <TextMask type={"money"} value={this.props.order.valor_frete} />
              )}
            </View>

            <View style={[styles.footerOrder]}>
              <Text style={styles.footerOrderTitle}>{"Total"}</Text>
              <TextMask style={styles.footerOrderText} type={"money"} value={this.props.order.proposta.valor_total} />
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>{"Pagamento"}</Text>
            {Components.renderIfElse(this.props.order.forma_pagamento === 0,
              <View>
                <CreditCardAdapter creditCard={this.props.creditCard} />
                <View style={styles.containerParcel}>
                  <Text style={styles.parcelTitle} >{"Parcelas"}</Text>
                  <Picker mode="dropdown" selectedValue={this.state.numero_parcelas} onValueChange={this._changeParcelas}>
                    {this.state.parcelas.map((p) => {
                      return (<Picker.Item key={p.id} value={p.id} label={p.label} />)
                    })}
                  </Picker>
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

        <BottomBar buttonTitle="Confirmar" onButtonPress={() => { this.checkout() }} />
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
