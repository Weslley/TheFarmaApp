import React, { Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Platform,
  BackHandler
} from "react-native";
import { Container, Text, Button, Item, Input } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";
import Snackbar from "react-native-snackbar";
import LinearGradient from "react-native-linear-gradient";
import Communications from "react-native-communications";

import { connect } from "react-redux";
import { updateOrder } from "../../actions/orders";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProposalApresentation } from "../../components/Product/";

import { Components, CartUtils, CurrencyUtils } from "../../helpers";
import styles from "./styles";

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

  componentWillMount() {
    console.log("Montando! -> Proposal");
  }

  componentDidMount() {
    console.log("Montou! -> Proposal");
    BackHandler.addEventListener("hardwareBackPress", this.nothing);
  }

  componentWillUnmount = () => {
    console.log("Desmontou! -> Proposal");
    BackHandler.removeEventListener("hardwareBackPress", this.nothing);
  };

  /** Private functions */
  onBack() {
    this.props.navigation.navigate({
      key: "list_proposals1",
      routeName: "ListProposals",
      params: { startQuery: true }
    });
    BackHandler.addEventListener("hardwareBackPress", this.nothing);
  }

  nothing() {
    return true;
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
      this.setState({
        trocoError: "Deve ser maior ou igual ao valor da proposta."
      });
    }
  }

  _showPaymentDialog() {
    this.setState({ showPaymentDialog: true });
  }

  _showTrocoDialog() {
    this.setState({ showTrocoDialog: true, showPaymentDialog: false });
  }

  _showDrugstore() {
    this.props.navigation.navigate({
      key: "drugstore1",
      routeName: "Drugstore",
      params: { drugstore: this.props.proposal.farmacia }
    });
    this.setState({ showPaymentDialog: false, showTrocoDialog: false });
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
    if (!this.state.onScrollList) {
      return (
        <View style={{ marginTop: 16 }}>
          <View style={styles.infoContainer}>
            <Icon
              name="place"
              size={18}
              color={"#000"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.infoTextBold}>
              {this.props.proposal.farmacia.distancia}
              <Text style={styles.infoText}>{" do endereço indicado"}</Text>
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <Icon
              name="clock-o"
              size={18}
              color={"#000"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.infoTextBold}>
              {this.props.proposal.farmacia.tempo_entrega}
              <Text style={[styles.infoText, { marginBottom: 0 }]}>
                {" em média para entregar"}
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.infoContainer}
            onPress={() => {
              this._showDrugstore();
            }}
          >
            <Icon
              name="info"
              size={18}
              color={"#000"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.infoTextBold}>{"Sobre nós"}</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  _renderItem = ({ item }) => {
    let apresentation = this.props.cartItems.find(
      i => i.id === item.apresentacao
    );
    if (apresentation) {
      return (
        <ProposalApresentation
          apresentation={apresentation}
          proposalItem={item}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : null}
          enabled
        >
          <ScrollView>
            <Header
              title={this.props.proposal.farmacia.nome_fantasia}
              subtitle={`Fazemos entrega até ${
                this.props.proposal.farmacia.horario_funcionamento
              }`}
              menuLeft={
                <MenuItem
                  icon="md-arrow-back"
                  style={{
                    paddingLeft: 24,
                    paddingVertical: 12,
                    paddingRight: 12
                  }}
                  onPress={() => {
                    this.onBack();
                  }}
                />
              }
              menuRight={
                <View style={{ flexDirection: "row" }}>
                  <MenuItem
                    icon="call"
                    onPress={() => {
                      this._callPhone();
                    }}
                    style={{ paddingVertical: 12, paddingHorizontal: 12 }}
                  />
                  <MenuItem
                    icon="marker"
                    onPress={() => {
                      this._callMap();
                    }}
                    style={{ paddingVertical: 12, paddingHorizontal: 12 }}
                  />
                </View>
              }
              footer={this._renderHeaderFooter()}
            />

            {Components.renderIf(
              !this.props.proposal.possui_todos_itens &&
                !this.state.onScrollList,
              <View
                style={{
                  backgroundColor: "#FF1967",
                  marginTop: 4,
                  paddingVertical: 14,
                  paddingHorizontal: 24
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Regular",
                    fontSize: 16,
                    color: "#FFFFFF"
                  }}
                >
                  {"Essa farmacia não tem todos os itens"}
                </Text>
              </View>
            )}

            {Components.renderIf(
              this.props.proposal && this.props.proposal.itens,
              <FlatList
                style={{ paddingHorizontal: 24, paddingBottom: 90 }}
                data={this.props.proposal.itens}
                keyExtractor={item => item.apresentacao.toString()}
                renderItem={this._renderItem}
              />
            )}
          </ScrollView>

          <BottomBar
            label={"Total com frete"}
            proposal={true}
            buttonTitle="Comprar"
            price={this.props.proposal.valor_total_com_frete}
            onButtonPress={() => {
              this._showPaymentDialog();
            }}
          />

          {Components.renderIf(
            this.state.showPaymentDialog,
            this._renderPaymentDialog()
          )}

          {Components.renderIf(
            this.state.showTrocoDialog,
            this._renderTrocoDialog()
          )}
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
