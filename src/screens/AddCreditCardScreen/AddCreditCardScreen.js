import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TextInput } from "react-native";
import { Container, Text, Form, Item as FormItem, Label, Input, Button, Picker } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";

Input.defaultProps.selectionColor = "black";
Input.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { saveAddress, clearError } from "../../actions/creditCards";

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
      numero_cartao: '',
      validade: '',
      cvv: '',
      bandeira: '',

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
      if (nextProps && nextProps.error && nextProps.error.response && (nextProps.error.response.status == 400 && nextProps.error.response.status == 401)) {

        if (nextProps.error.response.data.numero_cartao)
          this.setState({ nomeError: nextProps.error.response.data.numero_cartao[0] })

        if (nextProps.error.response.data.cvv)
          this.setState({ cepError: nextProps.error.response.data.cvv[0] })

        if (nextProps.error.response.data.non_field_errors)
          Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });

        if (nextProps.error.response.data.detail)
          Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.clearFormErrors();
  }

  componentDidMount(){
    //this.props.dispatch(clearError());
  }

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
  }

  onChangeValidade = value => {
    let valueMask = MaskService.toMask('custom', value, {mask: "99/99"} );
    this.setState({ validade: valueMask })
  }

  validForm() {
    this.clearFormErrors();

    if (this.state.numero_cartao == null || this.state.numero_cartao == "") {
      this.setState({ nomeError: "campo obrigatório" })
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
      let params = { client: this.props.client }
      let creditCard = {}
      creditCard["numero_cartao"] = this.state.numero_cartao;
      creditCard["mes_expiracao"] = this.state.mes_expiracao;
      creditCard["ano_expiracao"] = this.state.ano_expiracao;
      creditCard["bandeira"] = this.state.bandeira;
      creditCard["cvv"] = this.state.cvv;
      params["creditCard"] = creditCard
      this.props.dispatch(saveAddress(params));
    }
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          title={"Novo Cartão"}
          subtitle={"Preencha todos os dados necessários"}
          menuLeft={
            <MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />
          }
          menuRight={
            <MenuItem icon="ios-checkmark-empty" iconSize={40} onPress={() => { this.submit() }} />
          }
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

              <TouchableOpacity onPress={() => { }} style={{ position: "absolute", right: 1 }}>
                <Icon name="camera" size={25} color={"#000000"} />
              </TouchableOpacity>

            </View>
          </View>

          <View style={[styles.item, { width: 90 }]}>
            <Text style={styles.label}>{"Validade"}</Text>
            <TextInput
              keyboardType={"numeric"}
              style={styles.input}
              multiline={false}
              onChangeText={this.onChangeValidade}
              value={this.state.validade} />
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
          </View>
          
        </ScrollView>
      </View>
    );
  }
}

export default AddCreditCardScreen;
