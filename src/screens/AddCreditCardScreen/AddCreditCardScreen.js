import moment from "moment";

import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView, View, Image, TouchableOpacity, TextInput, Platform } from "react-native";

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { Button, Text } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';

import { connect } from "react-redux";
import { getCreditCards, saveCreditCard, clearError } from "../../actions/creditCards";

import { Header } from "../../layout/Header"
import { Icon } from "../../components/Icon"
import { Loading } from "../../components/Loading"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class AddCreditCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome_proprietario: '',
      numero_cartao: '',
      validade: '',
      cvv: '',
      bandeira: '',
      mes_expiracao: '',
      ano_expiracao: '',

      numeroCartaoError: null,
      validadeError: null,
      cvvError: null,

      currentIndex: 0,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.numero_cartao) {
            this.setState({ numeroCartaoError: nextProps.error.response.data.numero_cartao[0] })
          }

          if (nextProps.error.response.data.mes_expiracao) {
            this.setState({ validadeError: nextProps.error.response.data.mes_expiracao[0] })
          }

          if (nextProps.error.response.data.ano_expiracao) {
            this.setState({ validadeError: nextProps.error.response.data.ano_expiracao[0] })
          }

          if (nextProps.error.response.data.cvv)
            this.setState({ cvvError: nextProps.error.response.data.cvv[0] })

          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
        }
      }

      if (nextProps && nextProps.success === true) {
        this.props.dispatch(getCreditCards({ client: this.props.client }));
        this.onBack();
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      CardIOUtilities.preload();
    }
  }


  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  scanCard() {
    CardIOModule
      .scanCard({ suppressConfirmation: true })
      .then(card => {
        console.log(card);
        this.setState({ numero_cartao: card.cardNumber })
      })
      .catch(() => { console.log("Cancelou"); })
  }

  clearFormErrors() {
    this.setState({ numeroCartaoError: null, validadeError: null, cvvError: null })
  }

  onChangeNumeroCartao = value => {
    let valueMask = MaskService.toMask('credit-card', value);
    this.setState({ numero_cartao: valueMask })
    let bandeira = this.getCreditCardLabel(valueMask.replace(/\D/g, ""));
    this.setState({ bandeira });
    if (valueMask.length >= 14) {
      this.iExpiredDate.focus();
    }
  }

  onChangeValidade = value => {
    let valueMask = MaskService.toMask('custom', value, { mask: "99/99" });
    this.setState({ validade: valueMask })
    if (valueMask.length === 5) {
      mes_expiracao = "" + parseInt(valueMask.split("/")[0])
      ano_expiracao = "" + parseInt(valueMask.split("/")[1])
      this.setState({ mes_expiracao, ano_expiracao })
      this.iCvv.focus();
    }
  }

  onChangeCVV = value => {

  }

  getCreditCardLabel(cardNumber) {
    var regexVisa = /^4[0-9]{12}(?:[0-9]{3})?/;
    var regexMaster = /^5[1-5][0-9]{14}/;
    var regexAmex = /^3[47][0-9]{13}/;
    var regexDiners = /^3(?:0[0-5]|[68][0-9])[0-9]{11}/;
    var regexDiscover = /^6(?:011|5[0-9]{2})[0-9]{12}/;
    var regexJCB = /^(?:2131|1800|35\d{3})\d{11}/;
    var regexHiperCard = /^(606282\d{10}(\d{3})?)|(3841\d{15})/;
    var regexElo = /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/;

    if (regexVisa.test(cardNumber)) {
      return 'visa';
    }
    if (regexMaster.test(cardNumber)) {
      return 'master';
    }
    if (regexAmex.test(cardNumber)) {
      return 'amex';
    }
    if (regexDiners.test(cardNumber)) {
      return 'diners';
    }
    if (regexDiscover.test(cardNumber)) {
      return 'discover';
    }
    if (regexJCB.test(cardNumber)) {
      return 'jcb';
    }
    if (regexHiperCard.test(cardNumber)) {
      return 'hipercard';
    }
    if (regexElo.test(cardNumber)) {
      return 'elo';
    }
    return '';
  }

  validForm() {
    this.clearFormErrors();

    if (this.state.numero_cartao == null || this.state.numero_cartao == "") {
      this.iNumberCard.focus();
      this.setState({ numeroCartaoError: "Este campo é obrigatório" })
      return false;
    }

    if (this.state.bandeira == null || this.state.bandeira == "") {
      this.iNumberCard.focus();
      this.setState({ numeroCartaoError: "Cartão inválido" })
      return false;
    }

    if (this.state.validade && this.state.validade.length === 5) {
      let parts = this.state.validade.split('/');
      let data = moment(`20${parts[1]}-${parts[0]}-01`);
      if (data.isValid()) {
        if (data.toDate().getTime() < new Date().getTime()) {
          this.iExpiredDate.focus();
          this.setState({ validadeError: "Cartão vencido" })
          return false;
        }
      } else {
        this.iExpiredDate.focus();
        this.setState({ validadeError: "Data inválida" })
        return false;
      }
    } else {
      this.iExpiredDate.focus();
      this.setState({ validadeError: "Data inválida" })
      return false;
    }

    if (this.state.cvv == null || this.state.cvv == "") {
      this.iCvv.focus();
      this.setState({ cvvError: "campo obrigatório" })
      return false;
    }

    return true;
  }

  submit() {
    if (this.validForm()) {
      let creditCard = {}
      creditCard["nome_proprietario"] = this.props.client.nome;
      creditCard["numero_cartao"] = this.state.numero_cartao.replace(/\D/g, "");
      creditCard["mes_expiracao"] = this.state.mes_expiracao;
      creditCard["ano_expiracao"] = `20${this.state.ano_expiracao}`;
      creditCard["bandeira"] = this.state.bandeira;
      creditCard["cvv"] = this.state.cvv;
      this.props.dispatch(saveCreditCard({ client: this.props.client, creditCard }));
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

          <Header
            title={"Novo Cartão"}
            subtitle={"Preencha todos os dados necessários"}
            menuLeft={
              <MenuItem
                icon="md-arrow-back"
                onPress={() => { this.onBack() }}
                style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
              />
            }
            menuRight={
              <MenuItem
                icon="check"
                onPress={() => { this.submit() }}
                style={{ paddingRight: 24, paddingVertical: 12 }}
              />
            }
          />

          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">

            <ScrollView>
              <View style={{ alignItems: "center", paddingVertical: 32 }}>
                <Image style={{ width: 128, height: 88 }} source={require("../../assets/images/CreditCard.png")} />
              </View>

              <ScrollView horizontal={true}>
                <View style={[styles.item, { marginLeft: 24, maxHeight: 100 }]}>
                  <Text style={styles.label}>{"Número do cartão"}</Text>
                  <View style={{ flexDirection: "row", alignItems: 'center' }}>
                    <TextInput
                      maxLength={19}
                      autoFocus={true}
                      multiline={false}
                      keyboardType={"numeric"}
                      ref={(c) => { this.iNumberCard = c; }}
                      style={[styles.input, { width: 230 }]}
                      onChangeText={this.onChangeNumeroCartao}
                      value={this.state.numero_cartao}
                    />
                    {Components.renderIfElse(this.state.bandeira,
                      <View style={styles.flagContainer}>
                        <Text style={styles.flagText} uppercase={true}>{this.state.bandeira}</Text>
                      </View>,
                      <TouchableOpacity onPress={() => { this.scanCard() }} style={{ position: "absolute", right: 1 }}>
                        <Icon name="camera" size={25} color={"#000000"} />
                      </TouchableOpacity>
                    )}
                  </View>
                  {Components.renderIf(Platform.OS === 'ios',
                    <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
                  )}
                  {Components.renderIf(this.state.numeroCartaoError,
                    <Text style={styles.inputError} uppercase={false}>{this.state.numeroCartaoError}</Text>
                  )}
                </View>

                <View style={[styles.item, { width: 90 }]}>
                  <Text style={styles.label}>{"Validade"}</Text>
                  <TextInput
                    maxLength={5}
                    multiline={false}
                    style={styles.input}
                    keyboardType={"numeric"}
                    ref={(c) => { this.iExpiredDate = c; }}
                    onChangeText={this.onChangeValidade}
                    value={this.state.validade}
                  />
                  {Components.renderIf(Platform.OS === 'ios',
                    <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
                  )}
                  {Components.renderIf(this.state.validadeError,
                    <Text style={styles.inputError} uppercase={false}>{this.state.validadeError}</Text>
                  )}
                </View>

                <View style={[styles.item, { width: 90 }]}>
                  <Text style={styles.label}>{"CVV"}</Text>
                  <TextInput
                    maxLength={3}
                    multiline={false}
                    secureTextEntry={true}
                    keyboardType={"numeric"}
                    style={styles.input}
                    ref={(c) => { this.iCvv = c; }}
                    onChangeText={(cvv) => this.setState({ cvv })}
                    value={this.state.cvv}
                  />

                  {Components.renderIf(Platform.OS === 'ios',
                    <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
                  )}

                  {Components.renderIf(this.state.cvvError,
                    <Text style={styles.inputError} uppercase={false}>{this.state.cvvError}</Text>
                  )}
                </View>
              </ScrollView>

            </ScrollView>

          </KeyboardAvoidingView>
        </View>

        {Components.renderIf(this.props.isLoading === true,
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <Loading />
          </View>
        )}

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,

    isLoading: state.creditCards.isLoading,
    error: state.creditCards.error,
    success: state.creditCards.success,
  };
}

export default connect(mapStateToProps)(AddCreditCardScreen);
