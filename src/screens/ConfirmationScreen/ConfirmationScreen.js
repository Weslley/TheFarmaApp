import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Picker, Platform, BackHandler } from "react-native";
import { Button, Text, Picker as NBPicker } from "native-base";
import { TextInputMask, TextMask, MaskService } from "react-native-masked-text";
import Snackbar from 'react-native-snackbar';

import { NavigationActions } from 'react-navigation';

import { connect } from "react-redux";
import { checkout, clearError, clearOrder } from "../../actions/orders";
import { cleanCart } from "../../actions/carts";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading"
import { MenuItem } from "../../components/MenuItem";
import { OrderItemAdapter } from "../../components/Product/";
import { AddressAdapter } from "../../components/Address";
import { CreditCardAdapter } from "../../components/CreditCard";

import DialogSuccessScreen from "../DialogSuccessScreen";
import DialogErrorScreen from "../DialogErrorScreen";

import { Components, CartUtils } from "../../helpers";
import styles from "./styles";

class ConfirmationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numero_parcelas: 1,
      showCheckoutSuccess: false,
      showCheckoutError: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {

        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.non_field_errors) {
            if (nextProps.error.response.data.non_field_errors === 'Pagamento não confirmado') {
              Snackbar.show({ title: nextProps.error.response.data.non_field_errors, duration: Snackbar.LENGTH_SHORT });
            } else {
              Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
            }
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
          this.setState({ showCheckoutError: true })
        }

        if (nextProps.error.message && nextProps.error.message === 'Network Error') {
          this.setState({ showNetworkError: true });
        }

      }

      if (nextProps && nextProps.success === true) {
        this.props.dispatch(cleanCart());
        this.props.dispatch(clearOrder());
        this.setState({ showCheckoutSuccess: true });
        BackHandler.addEventListener('hardwareBackPress', this.nothing);
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.nothing);
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.nothing);
  }

  /** Private functions */
  nothing() { }

  onBack() {
    this.props.dispatch(clearError());
    if (this.props.success === true) {
    } else {
      this.props.navigation.goBack(null);
    }
  }

  showHome() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Welcome', params: {} })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  showMyOrders() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Welcome', params: { actionBack: 'ListOrders' } })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  showCreditCards() {
    this.setState({ showCheckoutError: false });
    this.onBack();
  }

  closeDialog() {
    this.setState({ showCheckoutError: false });
  }

  _checkout() {
    let fields = {}
    fields['farmacia'] = this.props.proposal.farmacia.id
    fields['forma_pagamento'] = this.props.order.forma_pagamento
    if (this.props.order.forma_pagamento === 0) {
      fields['cartao'] = this.props.creditCard.id
    } else {
      fields['troco'] = this.props.order.troco
    }
    fields['numero_parcelas'] = this.state.numero_parcelas
    let params = { client: this.props.client, order: this.props.order, fields }
    this.props.dispatch(checkout(params))
  }

  _renderParcelsOptions() {
    let parcelas = []
    let max = this.props.proposal.quantidade_maxima_parcelas;
    for (i = 1; i <= max; i++) {
      let valor = (this.props.proposal.valor_total / i).toFixed(2);
      let sValor = MaskService.toMask('money', valor);
      if (i == 1) {
        parcelas.push({ id: i, label: `${sValor} à vista` })
      } else {
        parcelas.push({ id: i, label: `${i}X de ${sValor}` })
      }
    }

    let options = parcelas.map((p) => {
      return (<NBPicker.Item label={`${p.label}`} key={"p" + i.id} value={i.id} />)
    })
    return options;
  }

  _renderItem = ({ item }) => {
    let apresentation = this.props.order.itens.find(i => i.apresentacao.id === item.apresentacao)
    if (apresentation && apresentation.apresentacao && item.possui === true) {
      //item.apresentacao = apresentation.apresentacao
      return (<OrderItemAdapter apresentation={apresentation.apresentacao} item={item} />)
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

        <Header
          title={"Confirmação"}
          subtitle={"Detalhes do seu pedido"}
          menuLeft={
            <MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }} />
          }
        />

        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>{"Meu pedido"}</Text>

            {Components.renderIf(this.props.order && this.props.proposal && this.props.proposal.itens,
              <FlatList
                data={this.props.proposal.itens}
                keyExtractor={item => item.apresentacao.toString()}
                renderItem={this._renderItem}
              />
            )}

            <View style={[styles.footerOrder, { marginBottom: 8, marginTop: 16 }]}>
              <Text style={styles.footerOrderTitle}>{"Entrega"}</Text>
              {Components.renderIfElse(this.props.order.valor_frete === "0.00",
                <Text style={styles.footerOrderText} >{"GRÁTIS"}</Text>,
                <TextMask type={"money"} value={this.props.order.valor_frete} />
              )}
            </View>

            <View style={[styles.footerOrder]}>
              <Text style={[styles.footerOrderTitle, { color: "rgba(0,0,0,0.80)" }]}>{"Total"}</Text>
              <TextMask style={styles.footerOrderText} type={"money"} value={this.props.proposal.valor_total} />
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>{"Pagamento"}</Text>
            {Components.renderIfElse(this.props.order.forma_pagamento === 0,
              <View>
                <CreditCardAdapter creditCard={this.props.creditCard} />
                <View style={styles.containerParcel}>
                  <Text style={styles.parcelTitle} >{"Parcelas"}</Text>
                  <NBPicker
                    mode={Platform.OS === 'ios' ? "dropdown" : 'dialog'}
                    iosHeader="Selecione uma opção"
                    iosIcon={<Icon name="ios-arrow-down" size={24} color={"#000"} />}
                    headerBackButtonText="voltar"
                    itemStyle={styles.nbItem}
                    textStyle={styles.nbTextItem}
                    selectedValue={this.state.numero_parcelas}
                    onValueChange={(value, index) => this.setState({ numero_parcelas: value.id })}
                  >
                    {this._renderParcelsOptions()}
                  </NBPicker>
                </View>
              </View>,
              <View>
                <Text>{`Troco para ${MaskService.toMask('money', this.props.order.troco)}`}</Text>
              </View>
            )}
          </View>

          {Components.renderIfElse(this.props.address,
            <View style={[styles.container, { marginBottom: 90 }]}>
              <Text style={styles.title}>{"Endereço para entrega"}</Text>
              <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
                <AddressAdapter address={this.props.address} />
              </View>
            </View>,
            <View style={[styles.container, { marginBottom: 90 }]}>
              <Text style={styles.title}>{"Endereço da farmácia"}</Text>
              <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
                <AddressAdapter address={this.props.proposal.farmacia.endereco} />
              </View>
            </View>
          )}

        </ScrollView>

        <BottomBar
          buttonTitle="Confirmar"
          onButtonPress={() => { this._checkout() }}
        />

        {Components.renderIf(this.props.isLoading === true,
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <Loading />
          </View>
        )}

        {Components.renderIf(this.state.showCheckoutSuccess === true,
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <DialogSuccessScreen
              onPressButton={() => { this.showMyOrders() }}
              onPressHome={() => { this.showHome() }}
            />
          </View>
        )}

        {Components.renderIf(this.state.showCheckoutError === true,
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <DialogErrorScreen
              onPressButton={() => { this.showCreditCards() }}
              onPressClose={() => { this.closeDialog() }}
            />
          </View>
        )}

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    order: state.orders.order,
    proposal: state.orders.proposal,
    isLoading: state.orders.isLoading,
    success: state.orders.success,
    error: state.orders.error,

    address: state.addresses.address,
    creditCard: state.creditCards.creditCard,
  };
}

export default connect(mapStateToProps)(ConfirmationScreen);
