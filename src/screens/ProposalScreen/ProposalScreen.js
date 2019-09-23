import React, { Component } from "react";
import { View, FlatList, Platform, ScrollView, TouchableOpacity, KeyboardAvoidingView } from "react-native";

import { Text, Button } from "native-base";
import { TextInputMask } from "react-native-masked-text";

import Snackbar from "react-native-snackbar";
import LinearGradient from "react-native-linear-gradient";
import Communications from "react-native-communications";

import { connect } from "react-redux";
import { updateOrder } from "../../actions/orders";
import { getDrugstore } from "../../actions/drugstores";

import { Header } from "../../layout/Header";
import { ActionSheet } from "../../layout/ActionSheet";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { ButtonCustom } from "../../components/ButtonCustom";
import { ButtonGradient } from "../../components/ButtonDefault";
import { ProposalApresentation, ProposalApresentationV2 } from "../../components/Product/";

import styles from "./styles";
import { Components, CurrencyUtils } from "../../helpers";

class ProposalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onScrollList: false,
      showPaymentDialog: false,
      showTrocoDialog: false,
      troco: "0",
      trocoError: null,
      buttonDisabled: true,
      proposal: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (
          nextProps.error.response &&
          (nextProps.error.response.status >= 400 &&
            nextProps.error.response.status <= 403)
        ) {
          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({
              title: nextProps.error.response.data.non_field_errors[0],
              duration: Snackbar.LENGTH_SHORT
            });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({
              title: nextProps.error.response.data.detail,
              duration: Snackbar.LENGTH_SHORT
            });
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** Private functions */
  onBack() {
    this.props.navigation.navigate({key: "list_proposals1", routeName: "ListProposals", params: { startQuery: true } });
  }

  onChangeTroco = value => {
    this.setState({ troco: value });
  };

  _setTroco() {
    this.setState({ trocoError: null });
    let troco = parseFloat(this.state.troco.replace(/\D/g, "")) / 100;
    if (troco >= this.props.proposal.valor_total_com_frete) {
      let order = this.props.order;
      order.troco = troco;
      order.forma_pagamento = 1;
      if (this.props.order.id) {
        let params = { client: this.props.client, order };
        this.props.dispatch(updateOrder(params));
        this.props.navigation.navigate({
          key: "confirmation1",
          routeName: "Confirmation",
          params: { order }
        });
        this.setState({ showPaymentDialog: false, showTrocoDialog: false });
      }
    } else {
      this.setState({ trocoError: "Deve ser maior ou igual ao valor da proposta."});
    }
  }

  _showPaymentDialog() {
    this.setState({ showPaymentDialog: true });
  }

  _showTrocoDialog() {
    this.setState({ showTrocoDialog: true, showPaymentDialog: false });
  }

  _showDrugstore() {
    let proposal = this.props.proposal;
    this.props.navigation.navigate({ key: "drugstore1", routeName: "Drugstore", params: { drugstore: proposal.farmacia }});
    this.setState({ showPaymentDialog: false, showTrocoDialog: false });
    this.props.dispatch(getDrugstore({client: this.props.client, id: proposal.farmacia.id }));
  }

  _showListCreditCards() {
    if (this.props.order.id) {
      let order = this.props.order;
      order.forma_pagamento = 0;
      let params = { client: this.props.client, order };
      this.props.dispatch(updateOrder(params));
    }

    this.props.navigation.navigate({
      key: "list_credit_cards1",
      routeName: "ListCreditCards",
      params: { showBottomBar: true }
    });
    this.setState({ showPaymentDialog: false, showTrocoDialog: false });
  }

  _callPhone() {
    Communications.phonecall(this.props.proposal.farmacia.telefone, true);
  }

  _callMap() {
    Communications.web(
      `https://www.google.com/maps/search/?api=1&query=${
      this.props.proposal.farmacia.latitude
      },${this.props.proposal.farmacia.longitude}`
    );
  }

  _renderPaymentDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => {
          this.setState({ showPaymentDialog: false });
        }}
        content={
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 24,
              paddingBottom: 32,
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: 20,
                color: "rgba(0,0,0,0.87)",
                marginLeft: 8,
                marginBottom: 24
              }}
            >
              Qual a forma de pagamento que você deseja?
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <ButtonCustom
                image={require("../../assets/images/ic_money.png")}
                title="Dinheiro"
                description="Indique o valor para que possamos separar o troco."
                onPress={() => {
                  this._showTrocoDialog();
                }}
              />

              <ButtonCustom
                image={require("../../assets/images/ic_credit_card.png")}
                title="Cartão de Crédito"
                description="Efetue o pagamento usando um dos seus cartões de crédito."
                onPress={() => {
                  this._showListCreditCards();
                }}
              />
            </View>
          </View>
        }
      />
    );
  }

  _renderTrocoDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => {
          this.setState({ showTrocoDialog: false });
        }}
        content={
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 20,
              paddingBottom: 32,
              backgroundColor: "#fff",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto-Bold",
                fontSize: 20,
                color: "rgba(0,0,0,0.87)",
                marginBottom: 24
              }}
            >
              Quanto em espécie?
            </Text>
            <View>
              <View style={{ marginBottom: 24 }}>
                <TextInputMask
                  type={"money"}
                  keyboardType={"numeric"}
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    paddingHorizontal: 0
                  }}
                  multiline={false}
                  onChangeText={this.onChangeTroco}
                  value={this.state.troco}
                  underlineColorAndroid="#000"
                />

                <TouchableOpacity
                  style={{ position: "absolute", right: 0, top: 5, bottom: 0 }}
                  onPress={() => {
                    this.setState({ troco: 0 });
                  }}
                >
                  <Icon name="ios-close-empty" size={30} color={"#000"} />
                </TouchableOpacity>

                {Components.renderIf(
                  Platform.OS === "ios",
                  <View
                    style={{
                      borderBottomColor: "#000",
                      borderWidth: 0.5,
                      marginTop: 4,
                      marginBottom: 8
                    }}
                  />
                )}

                {Components.renderIf(
                  this.state.trocoError,
                  <Text style={styles.inputError} uppercase={false}>
                    {this.state.trocoError}
                  </Text>
                )}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Button
                  style={[styles.button]}
                  textStyle={{ flex: 1, textAlign: "center" }}
                  bordered
                  dark
                  onPress={() => {
                    this.setState({ showTrocoDialog: false });
                  }}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      { flex: 1, textAlign: "center" }
                    ]}
                    uppercase={false}
                  >
                    {"Cancelar"}
                  </Text>
                </Button>

                <TouchableOpacity
                  style={[styles.button, { borderColor: "transparent" }]}
                  onPress={() => {
                    this._setTroco();
                  }}
                >
                  <LinearGradient
                    colors={["#00C7BD", "#009999"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.linearGradient}
                  >
                    <Text style={[styles.buttonText, { color: "#FFF" }]}>
                      {"Okay"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    );
  }

  _renderHeaderFooter() {
    let order = this.props.order;
    let delivery = order.delivery;

    if (!this.state.onScrollList) {
      return (
        <View style={{ marginTop: 8 }}>
          <View style={styles.infoContainer}>
            <Icon name="place" size={18} color={"#000"} style={{ marginRight: 8 }} />
            <Text style={styles.infoTextBold}>
              {this.props.proposal.farmacia.distancia}
              <Text style={styles.infoText}>{" do endereço indicado"}</Text>
            </Text>
          </View>
          
          {Components.renderIf(delivery,
            <View style={styles.infoContainer}>
              <Icon name="clock-o" size={18} color={"#000"} style={{ marginRight: 8 }}/>
              <Text style={styles.infoTextBold}>
                {this.props.proposal.farmacia.tempo_entrega}
                <Text style={[styles.infoText, { marginBottom: 0 }]}>
                  {" em média para entregar"}
                </Text>
              </Text>
            </View>
          )}

          <View style={styles.infoContainer}>
            <Icon name="alert-circled" size={18} color={"#000"} style={{ marginRight: 8 }} />
            <Text style={styles.infoText}>
              {"Aberto até as "} 
              <Text style={styles.infoTextBold}>{this.props.proposal.farmacia.horario_funcionamento}</Text>
            </Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  }

  _renderItem = ({ item }) => {
    try {
      item.possui = false;
      return(<ProposalApresentationV2 apresentation={item.apresentacao} proposalItem={item} />)
    } catch (error) {
      return null;
    }
  };

  render() {
    let proposal = this.props.proposal;
    let farmacia = proposal.farmacia || {};

    let order = this.props.order;
    let delivery = order.delivery;

    return (
      <View style={{ flex: 1, backgroundColor: "#F8F8F8" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          enabled
        >
          <ScrollView>
            <View style={{ backgroundColor: "#FFFFFF", borderColor: "#CCCCCC",borderBottomWidth: 0.7 }}>
              <Header
                separator={false}
                title={farmacia.nome_fantasia}
                menuLeft={
                  <MenuItem
                    icon="md-arrow-back"
                    style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                    onPress={() => { this.onBack(); }}
                  />
                }
                menuRight={
                  <MenuItem
                    icon="info"
                    onPress={() => { this._showDrugstore(); }}
                    style={{ paddingVertical: 12, paddingHorizontal: 12 }}
                  />
                }
                footer={this._renderHeaderFooter()}
              />
            </View>

            {/*
            {Components.renderIf(!proposal.possui_todos_itens && !this.state.onScrollList,
              <View style={{ backgroundColor: "#FF1967", paddingVertical: 8, paddingHorizontal: 24 }}>
                <Text style={{ fontFamily: "Roboto-Regular", fontSize: 14, color: "#FFFFFF" }}>
                  {"Esta farmácia não possue todos os itens"}
                </Text>
              </View>
            )}
            */}

            {Components.renderIf(proposal && proposal.itens,
              <FlatList
                data={ proposal.itens }
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                style={{ paddingHorizontal: 24, backgroundColor: "#FFFFFF" }}
              />
            )}
            <View style={[{ marginBottom: 180 }]} />
          </ScrollView>

          {/* BottomBar */}
          <View style={styles.footer}>

            {Components.renderIf(delivery,
              <View style={[styles.row,{marginBottom: 8}]}>
                <Text style={styles.footerTxt}>{"Subtotal"}</Text>
                <Text style={styles.footerTxt}>{ CurrencyUtils.toMoney(proposal.valor_total)}</Text>
              </View>
            )}

            {Components.renderIf(delivery,
              <View style={[styles.row,{marginBottom: 8}]}>
                <Text style={styles.footerTxt}>{"Taxa de entrega"}</Text>
                <Text style={styles.footerTxt}>{ CurrencyUtils.toMoney(proposal.valor_frete)}</Text>
              </View>
            )}

            <View style={[styles.row,{marginBottom: 16}]}>
              <Text style={styles.footerTxtBold}>{"Total"}</Text>
              <Text style={styles.footerTxtBold}>{ CurrencyUtils.toMoney(proposal.valor_total_com_frete)}</Text>
            </View>

            <ButtonGradient
              text="Comprar"
              onPress={() => { this._showPaymentDialog(); }}
            />
          </View>

          {Components.renderIf(this.state.showPaymentDialog, this._renderPaymentDialog())}
          {Components.renderIf(this.state.showTrocoDialog, this._renderTrocoDialog())}

        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    cartItems: state.carts.cartItems,
    uf: state.locations.uf,

    order: state.orders.order,
    proposal: state.orders.proposal,
    error: state.orders.error
  };
}

export default connect(mapStateToProps)(ProposalScreen);
