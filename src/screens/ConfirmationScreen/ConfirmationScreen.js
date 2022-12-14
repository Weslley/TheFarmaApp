import React, { Component } from "react";
import { View, ScrollView, FlatList, Platform } from "react-native";
import { Text, Picker as NBPicker } from "native-base";
import { TextMask, MaskService } from "react-native-masked-text";
import Snackbar from 'react-native-snackbar';

import { NavigationActions, StackActions } from 'react-navigation';;

import { connect } from "react-redux";
import { checkout, clearError, clearOrder } from "../../actions/orders";
import { cleanCart } from "../../actions/carts";
import { clearCreditCard } from "../../actions/creditCards";
import { clearAddress } from "../../actions/addresses";

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
        this.setState({ showCheckoutSuccess: true });
        //this.props.navigation.navigate({ key: 'DialogSuccess1', routeName: 'DialogSuccess', params: {} });
        return;
        /*
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Tabs', params: {} })],
        });
        this.props.navigation.dispatch(resetAction);
         */
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount = () => {
    this.setState({ numero_parcelas: 1 })
  }

  componentDidMount() {
    this.setState({ numero_parcelas: 1 })
  }

  componentWillUnmount = () => {
    if (this.props.success === true) {
      this.props.dispatch(clearOrder());
      this.props.dispatch(clearCreditCard());
      this.props.dispatch(clearAddress());
      this.props.dispatch(cleanCart());
    }
  }

  /** Private functions */
  onBack() {
    this.props.dispatch(clearError());
    if (this.props.success === true) {
    } else {
      this.props.navigation.goBack(null);
    }
  }

  showHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Tabs', params: {} })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  showMyOrders() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Tabs', params: { actionBack: 'ListOrders' } })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  showCreditCards() {
    this.setState({ showCheckoutError: false });
    this.onBack();
  }

  closeDialog() {
    this.setState({ showCheckoutError: false });
    this.props.navigation.navigate({ key: 'proposal1', routeName: 'Proposal', params: {} });
  }

  getPrice() {
    return CurrencyUtils.toMoney("" + this.props.proposal.valor_total);
  }

  getFrete() {
    let frete = this.props.proposal.valor_frete;
    if (frete) {
      return (<TextMask type={"money"} value={this.props.proposal.valor_frete} style={styles.footerOrderTitle} />);
    } else {
      return (<Text style={[styles.footerOrderText, { fontSize: 14 }]} >{"GRÁTIS"}</Text>);
    }
  }

  _checkout() {
    let fields = {}
    fields['permutacao_id'] = this.props.proposal.permutacao_id
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
      let valor = (this.props.proposal.valor_total_com_frete / i).toFixed(2);
      let sValor = MaskService.toMask('money', valor);
      if (i === 1) {
        parcelas.push({ id: i, label: `${sValor} Avista` })
      } else {
        parcelas.push({ id: i, label: `${i}X de ${sValor}` })
      }
    }

    let options = parcelas.map((p) => {
      return (<NBPicker.Item label={`${p.label}`} key={"p" + p.id} value={p.id} />)
    })
    return options;
  }

  _renderItem = ({ item }) => {
    if (item && item.apresentacao && item.possui === true) {
      return (<OrderItemAdapter apresentation={item.apresentacao} item={item} />)
    } else {
      return null;
    }
  };

  render() {
    let order = this.props.order;
    let proposal = this.props.proposal;
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
            <Text style={[styles.title, { fontFamily: 'Roboto-Bold' }]}>{"Meu pedido"}</Text>
            {Components.renderIf(order && proposal && proposal.itens,
              <FlatList
                data={proposal.itens}
                keyExtractor={item => item.apresentacao.toString()}
                renderItem={this._renderItem}
              />
            )}

            <View style={[styles.row, { marginTop: 16 }]}>
              <View />
              <View style={[styles.row, { width: '60%' }]}>
                <Text style={[styles.footerOrderTitle, { textAlign: 'right' }]}>{"Subtotal"}</Text>
                <TextMask type={"money"} value={this.props.proposal.valor_total} style={styles.footerOrderTitle} />
              </View>
            </View>

            {Components.renderIf(order.delivery === true,
              <View style={[styles.row, { marginTop: 8 }]}>
                <View />
                <View style={[styles.row, { width: '60%' }]}>
                  <Text style={[styles.footerOrderTitle, { textAlign: 'right' }]}>{"Frete"}</Text>
                  {this.getFrete()}
                </View>
              </View>
            )}

            <View style={[styles.row, { marginTop: 8 }]}>
              <View />
              <View style={[styles.row, { width: '60%' }]}>
                <Text style={[styles.footerOrderTitle, { color: "rgba(0,0,0,0.80)", textAlign: 'right', fontFamily: 'Roboto-Medium' }]}>{"Total"}</Text>
                <TextMask style={styles.footerOrderText} type={"money"} value={proposal.valor_total_com_frete} />
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>{"Forma de pagamento"}</Text>
            {Components.renderIfElse(order.forma_pagamento === 0,
              <View>
                {Components.renderIf(this.props.creditCard, <CreditCardAdapter creditCard={this.props.creditCard} />)}

                <View style={[styles.containerParcel, styles.row]}>
                  <Text style={[styles.parcelTitle, { width: '45%' }]} >{"Parcelas"}</Text>
                  <View style={{ width: '55%' }}>
                    <NBPicker
                      mode={Platform.OS === 'ios' ? "dropdown" : 'dialog'}
                      iosHeader="Selecione uma opção"
                      iosIcon={<Icon name="ios-arrow-down" size={24} color={"#000"} />}
                      headerBackButtonText="voltar"
                      itemStyle={styles.nbItem}
                      textStyle={styles.nbTextItem}
                      selectedValue={this.state.numero_parcelas}
                      onValueChange={(value, index) => this.setState({ numero_parcelas: value })}
                    >
                      {this._renderParcelsOptions()}
                    </NBPicker>
                  </View>
                </View>
              </View>,
              <View>
                <Text style={[{ fontFamily: 'Roboto-Light' }]}>
                  <Text style={styles.title}>Dinheiro</Text>
                  {` (Troco para ${MaskService.toMask('money', this.props.order.troco)})`}
                </Text>
              </View>
            )}
          </View>

          {Components.renderIfElse(this.props.address,
            <View style={[styles.container, { marginBottom: 90, borderBottomWidth: 0 }]}>
              <Text style={styles.title}>{"Endereço para entrega"}</Text>
              <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
                <AddressAdapter address={this.props.address} />
              </View>
            </View>,
            <View style={[styles.container, { marginBottom: 90, borderBottomWidth: 0 }]}>
              <Text style={styles.title}>{"Endereço da farmácia"}</Text>
              <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
                <AddressAdapter address={this.props.proposal.farmacia.endereco} />
              </View>
            </View>
          )}

        </ScrollView>

        <BottomBar
          label={"Total"}
          buttonTitle="Confirmar"
          onButtonPress={() => { this._checkout() }}
          price={this.props.proposal.valor_total_com_frete}
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
            <DialogErrorScreen onPressClose={() => { this.closeDialog() }} />
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
