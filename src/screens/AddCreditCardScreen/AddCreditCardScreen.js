import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Container, Text, Form, Item as FormItem, Label, Input, Button, Picker } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";

Input.defaultProps.selectionColor = "black";
Input.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { getCreditCards, saveCreditCard, clearError } from "../../actions/creditCards";

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";
import { Icon } from "../../components/Icon";

class AddCreditCardScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome_proprietario: '',
      numero_cartao: '5162 3096 1953 9999',
      validade: '10/20',
      cvv: '123',
      bandeira: 'master',
      mes_expiracao: '10',
      ano_expiracao: '20',

      numeroCartaoError: null,
      validadeError: null,
      cvvError: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error && nextProps.error.response && (nextProps.error.response.status == 400 || nextProps.error.response.status == 401)) {

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

      if (nextProps && nextProps.actionSuccess) {
        this.props.dispatch(getCreditCards({ client: this.props.client }));
        this.onBack();
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() { }

  componentDidMount() { }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  clearFormErrors() {
    this.setState({ numeroCartaoError: null, validadeError: null, cvvError: null })
  }

  onChangeNumeroCartao = value => {
    let valueMask = MaskService.toMask('credit-card', value);
    this.setState({ numero_cartao: valueMask })
    let bandeira = this.getCreditCardLabel(valueMask.replace(/\D/g, ""));
    this.setState({ bandeira });
  }

  onChangeValidade = value => {
    let valueMask = MaskService.toMask('custom', value, { mask: "99/99" });
    this.setState({ validade: valueMask })
    if (valueMask.length === 5) {
      mes_expiracao = valueMask.split("/")[0]
      ano_expiracao = valueMask.split("/")[1]
      this.setState({ mes_expiracao, ano_expiracao })
    }
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
      this.setState({ numeroCartaoError: "campo obrigatório" })
      return false;
    }

    if (this.state.bandeira == null || this.state.bandeira == "") {
      this.setState({ numeroCartaoError: "campo inválido" })
      return false;
    }

    if (this.state.validade == null || this.state.validade == "") {
      this.setState({ validadeError: "campo obrigatório" })
      return false;
    }

    if (this.state.validade.length < 5) {
      this.setState({ validadeError: "campo inválido" })
      return false;
    }

    if (this.state.cvv == null || this.state.cvv == "") {
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
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          title={"Novo Cartão"}
          subtitle={"Preencha todos os dados necessários"}
          menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />}
          menuRight={<MenuItem icon="check" iconSize={24} onPress={() => { this.submit() }} />}
        />

        <View style={{ alignItems: "center", paddingVertical: 32 }}>
          <Image style={{ width: 128, height: 88 }} source={require("../../assets/images/CreditCard.png")} />
        </View>

        <ScrollView horizontal={true}>
          <View style={[styles.item, { marginLeft: 24 }]}>
            <Text style={styles.label}>{"Número do cartão"}</Text>
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <TextInput
                autoFocus={true}
                keyboardType={"numeric"}
                style={[styles.input, { width: 230 }]}
                multiline={false}
                onChangeText={this.onChangeNumeroCartao}
                value={this.state.numero_cartao}
              />

              {Components.renderIfElse(this.state.bandeira,
                <View style={styles.flagContainer}>
                  <Text style={styles.flagText} uppercase={true}>{this.state.bandeira}</Text>
                </View>,
                <TouchableOpacity onPress={() => { }} style={{ position: "absolute", right: 1 }}>
                  <Icon name="camera" size={25} color={"#000000"} />
                </TouchableOpacity>
              )}
            </View>
            {Components.renderIf(this.state.numeroCartaoError,
              <Text style={styles.inputError} uppercase={false}>{this.state.numeroCartaoError}</Text>
            )}
          </View>

          <View style={[styles.item, { width: 90 }]}>
            <Text style={styles.label}>{"Validade"}</Text>
            <TextInput
              keyboardType={"numeric"}
              style={styles.input}
              multiline={false}
              onChangeText={this.onChangeValidade}
              value={this.state.validade} />

            {Components.renderIf(this.state.validadeError,
              <Text style={styles.inputError} uppercase={false}>{this.state.validadeError}</Text>
            )}
          </View>

          <View style={[styles.item, { width: 90 }]}>
            <Text style={styles.label}>{"CVV"}</Text>
            <TextInput
              keyboardType={"numeric"}
              style={styles.input}
              multiline={false}
              secureTextEntry={true}
              onChangeText={(cvv) => this.setState({ cvv })}
              value={this.state.cvv} />

            {Components.renderIf(this.state.cvvError,
              <Text style={styles.inputError} uppercase={false}>{this.state.cvvError}</Text>
            )}
          </View>

        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    error: state.creditCards.error,
    actionSuccess: state.creditCards.actionSuccess,
  };
}

export default connect(mapStateToProps)(AddCreditCardScreen);
