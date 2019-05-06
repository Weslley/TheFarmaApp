import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Linking
} from "react-native";
import { TextMask, MaskService } from "react-native-masked-text";

import Snackbar from "react-native-snackbar";
import LinearGradient from "react-native-linear-gradient";
import Communications from "react-native-communications";

import { connect } from "react-redux";
import { getOrder, clearOrder } from "../../actions/orders";

import { Header } from "../../layout/Header";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { OrderItemAdapter } from "../../components/Product/";
import { AddressAdapter } from "../../components/Address";
import { CreditCardAdapter } from "../../components/CreditCard";

import { StatusPedido } from "../../models/enums";
import {
  Components,
  StringUtils,
  Date as DateUtils,
  CurrencyUtils
} from "../../helpers";

import { SUPPORT_LINK } from "../../config/server";
import styles from "./styles";

class OrderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: null,
      notificacao: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount = () => {
    let order = this.props.navigation.state.params.order;
    this.setState({ order });
  };

  componentWillUnmount = () => {
    this.props.dispatch(clearOrder());
  };

  /** Private functions */
  onBack() {
    if (this.state.notificacao) {
      this.props.dispatch(clearOrder());
    }
    this.props.navigation.goBack(null);
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

  _showDrugstore() {
    this.props.navigation.navigate({
      key: "drugstore1",
      routeName: "Drugstore",
      params: { drugstore: this.state.order.farmacia }
    });
  }

  _callPhone() {
    Communications.phonecall(this.state.order.farmacia.telefone, true);
  }

  _callMap() {
    Communications.web(
      `https://www.google.com/maps/search/?api=1&query=${
        this.state.order.farmacia.latitude
      },${this.state.order.farmacia.longitude}`
    );
  }

  _getOrderStatus() {
    let order = this.state.order;
    let status = StatusPedido[order.status][1];
    switch (order.status) {
      case 2:
      case 3:
      case 9:
        return (
          <View style={[styles.tag, styles.tagWarning]}>
            <Text style={[styles.tagText, styles.tagWarningText]}>
              {status}
            </Text>
          </View>
        );
      case 4:
      case 5:
        return (
          <View style={[styles.tag]}>
            <Text style={styles.tagText}>{status}</Text>
          </View>
        );
      case 6:
      case 7:
      case 8:
      case 10:
        return (
          <View style={[styles.tag, styles.tagDanger]}>
            <Text style={[styles.tagText, styles.tagDangerText]}>{status}</Text>
          </View>
        );
      default:
        return <Text style={styles.text}>{status}</Text>;
    }
  }

  _renderHeader() {
    let order = this.state.order;
    let status = StatusPedido[order.status][1];
    let farmacia = order.farmacia;

    if (farmacia) {
      return (
        <View style={{ paddingHorizontal: 24, borderBottomColor: "#EEE", borderBottomWidth: 0.5 }}>
          <Header
            separator={false}
            title={`${farmacia.nome_fantasia}`}
            style={{
              paddingHorizontal: 0,
              paddingTop: 24,
              paddingBottom: 0,
            }}
            menuLeft={
              <MenuItem
                icon="md-arrow-back"
                onPress={() => {
                  this.onBack();
                }}
                style={{
                  paddingVertical: 12,
                  paddingRight: 12,
                  paddingLeft: 24
                }}
              />
            }
            menuRight={
              <View style={{ flexDirection: "row" }}>
                <MenuItem
                  icon="call-o"
                  iconSize={20}
                  onPress={() => {
                    this._callPhone();
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 12 }}
                />
                <MenuItem
                  icon="place"
                  iconSize={20}
                  onPress={() => {
                    this._callMap();
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 12 }}
                />
              </View>
            }
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              alignContent: "center"
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center"
              }}
            >
              <Text style={styles.subtitle}>{`Ordem #${order.id}`}</Text>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              {this._getOrderStatus()}
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <Header
          title={`Ordem #${order.id}`}
          subtitle={"Todos os detalhes do seu pedido está aqui"}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => {
                this.onBack();
              }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
            />
          }
        />
      );
    }
  }

  _renderParcel() {
    let numero_parcelas = this.state.order.numero_parcelas;
    let valor = (this.state.order.valor_bruto / numero_parcelas).toFixed(2);
    let sValor = MaskService.toMask("money", valor);
    if (numero_parcelas === 1) {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[styles.parcelTitle, { marginRight: 8 }]}
          >{`${sValor} Avista`}</Text>
          <Icon name="arrow-down-b" size={18} color={"#000"} />
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={[styles.parcelTitle, { marginRight: 8 }]}
          >{`${numero_parcelas}X de ${sValor}`}</Text>
          <Icon name="arrow-down-b" size={18} color={"#000"} />
        </View>
      );
    }
  }

  _renderItem = ({ item }) => {
    if (item.status !== 4) {
      return <OrderItemAdapter apresentation={item.apresentacao} item={item} />;
    }
  };

  _renderPagamento() {
    if (this.state.order.forma_pagamento === 0) {
      if (this.state.order.cartao) {
        return (
          <View style={styles.container}>
            <Text style={[styles.title]}>{"Forma de Pagamento"}</Text>

            <View>
              <CreditCardAdapter creditCard={this.state.order.cartao} />
              <View style={[styles.containerParcel, styles.row]}>
                <Text style={styles.parcelTitle}>{"Parcelas"}</Text>
                <View>{this._renderParcel()}</View>
              </View>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{"Forma de Pagamento"}</Text>
          <View>
            <Text style={[{ fontFamily: "Roboto-Light" }]}>
              {`Dinheiro (Troco para ${MaskService.toMask("money", this.state.order.troco )})`}
            </Text>
          </View>
        </View>
      );
    }
    return null;
  }

  _renderEndereco() {
    if (this.state.order.delivery === true) {
      let address = {};
      address.nome_endereco = this.state.order.nome_endereco;
      address.logradouro = this.state.order.logradouro;
      address.numero = this.state.order.numero;
      address.bairro = this.state.order.bairro;
      address.cidade = { nome: this.state.order.cidade };
      return (
        <View style={[styles.container]}>
          <Text style={[styles.title]}>{"Endereço para entrega"}</Text>
          <View
            style={{
              marginHorizontal: -24,
              paddingHorizontal: 24,
              backgroundColor: "#F8F8F8"
            }}
          >
            <AddressAdapter address={address} />
          </View>
        </View>
      );
    } else {
      if (this.state.order.farmacia) {
        return (
          <View style={[styles.container]}>
            <View style={[styles.row, { marginBottom: 16 }]}>
              <Text style={[styles.title, { marginBottom: 0 }]}>
                {"Endereço da farmácia"}
              </Text>
              <View style={{ flexDirection: "row", marginRight: -24 }}>
                <MenuItem
                  icon="call"
                  onPress={() => {
                    this._callPhone();
                  }}
                  style={{ paddingVertical: 5, paddingHorizontal: 12 }}
                />
                <MenuItem
                  icon="marker"
                  onPress={() => {
                    this._callMap();
                  }}
                  style={{ paddingVertical: 5, paddingHorizontal: 12 }}
                />
              </View>
            </View>

            <View
              style={{
                marginHorizontal: -24,
                paddingHorizontal: 24,
                backgroundColor: "#F8F8F8"
              }}
            >
              <AddressAdapter address={this.state.order.farmacia.endereco} />
            </View>
          </View>
        );
      }
    }
    return null;
  }

  getSubTotal() {
    let order = this.state.order;
    let valor_total = CurrencyUtils.toReal(order.valor_bruto);
    let valor_frete = CurrencyUtils.toReal(order.valor_frete);
    return valor_total - valor_frete;
  }

  getFrete() {
    let frete = this.state.order.valor_frete;
    if (frete) {
      return (
        <TextMask
          type={"money"}
          value={frete}
          style={styles.subtitle}
        />
      );
    } else {
      return (
        <Text style={[styles.subtitle, { fontSize: 14 }]}>
          {"GRÁTIS"}
        </Text>
      );
    }
  }

  render() {
    let order = this.state.order;
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {this._renderHeader()}

        <ScrollView>
          <View style={styles.container}>

            <Text style={[styles.title, {marginBottom: 16}]}>{DateUtils.toDate(order.log.data_criacao)}</Text>

            {Components.renderIf(order && order.itens,
              <FlatList
                data={order.itens}
                keyExtractor={item => item.apresentacao.id.toString()}
                renderItem={this._renderItem}
              />
            )}

            <View style={[styles.row, { marginTop: 16 }]}>
              <Text style={[styles.subtitle, { textAlign: "right", fontSize: 14 }]}> {"Subtotal"}</Text>
              <TextMask type={"money"} value={this.getSubTotal()} style={styles.subtitle}/>
            </View>

            <View style={[styles.row, { marginTop: 8 }]}>
              <Text style={[ styles.subtitle, { textAlign: "right", fontSize: 14 }]}>{"Frete"}</Text>
              {this.getFrete()}
            </View>

            <View style={[styles.row, { marginTop: 8 }]}>
              <Text style={[styles.footerOrderText ]}>{"Total"}</Text>
              <TextMask style={styles.footerOrderText} type={"money"} value={order.valor_bruto} />
            </View>
          </View>

          {this._renderEndereco()}

          {this._renderPagamento()}

          <View style={[styles.container, { marginBottom: 90 }]}>
            <Text style={styles.title}>{"Alguma dúvida ou problema?"}</Text>
            <TouchableOpacity
              onPress={() => {
                this.openSupport();
              }}
            >
              <LinearGradient
                colors={["#00C7BD", "#009999"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  paddingHorizontal: 28,
                  paddingVertical: 14
                }}
              >
                <Text style={styles.buttonText}>{"Entrar em contato"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client
  };
}

export default connect(mapStateToProps)(OrderScreen);
