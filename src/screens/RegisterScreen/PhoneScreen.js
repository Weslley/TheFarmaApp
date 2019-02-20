import React, { Component } from "react";
import { View, KeyboardAvoidingView, Text, TextInput, Image, TouchableOpacity, Keyboard } from "react-native";

import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";
import { TextInputMask, MaskService } from "react-native-masked-text";

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { login, register, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"

import { Loading } from "../../components/Loading"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class PhoneScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      email: "",
      celular: "",
      password: "",
      cpf: "",
      data_nascimeento: "",
      sexo: "",
      facebook_id: "",
      nomeError: null,
      emailError: null,
      celularError: null,
      passwordError: null,
      actionBack: null,
      showNetworkError: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {

      if (nextProps && nextProps.error) {

        if (nextProps.error.response && (nextProps.error.response.status >= 500 && nextProps.error.response.status <= 504)) {
          Snackbar.show({ title: "Erro ao conectar no servidor!", duration: Snackbar.LENGTH_SHORT });
        }

        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {

          if (nextProps.error.response.data.email) {
            this.setState({ emailError: nextProps.error.response.data.email[0] })
          }

          if (nextProps.error.response.data.celular) {
            this.setState({ celularError: nextProps.error.response.data.celular[0] })
          }

          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
        }

        if (nextProps.error.message && nextProps.error.message === 'Network Error') {
          this.setState({ showError: true });
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    const { state: { params } } = this.props.navigation;
    if (params) {
      if (params.nome) this.setState({ nome: params.nome })
      if (params.email) this.setState({ email: params.email })
      if (params.facebook_id) this.setState({ facebook_id: params.facebook_id })
      if (params.foto) this.setState({ foto: params.foto })
      if (params.data_nascimento) this.setState({ data_nascimento: params.data_nascimento })
      if (params.sexo) this.setState({ sexo: params.sexo })
      if (params.actionBack) this.setState({ actionBack: params.actionBack })
    }

    this.setState({ nomeError: null, emailError: null, celularError: null, passwordError: null })
    this.props.dispatch(clearError());
  }

  componentDidMount() { }

  /** Private functions */
  onBack() {
    this.props.dispatch(clearError());
    this.props.navigation.goBack(null);
  }

  validForm() {
    this.setState({ nomeError: null, emailError: null, celularError: null, passwordError: null })

    if (this.state.celular == null || this.state.celular == "") {
      this.setState({ celularError: "Este campo é obrigatório" })
      return false;
    }

    if (this.state.celular.length > 1) {
      if (StringUtils.removeMask(this.state.celular).length <= 10) {
        this.setState({ celularError: "Número incompleto" })
        return false;
      }
    }

    return true;
  }

  submit() {
    if (this.validForm()) {

      Keyboard.dismiss()

      let params = {}
      params["login_type"] = 2;
      params["celular"] = StringUtils.removeMask(this.state.celular);
      params["actionBack"] = this.state.actionBack

      this.props.dispatch(login(params));
      this.props.navigation.navigate({ key: 'verification_code1', routeName: 'VerificationCode', params });
    }
  }

  onPhoneChange = phone => {
    let celularMask = MaskService.toMask('cel-phone', phone);
    this.setState({ celular: celularMask })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <Image
          resizeMode={"cover"}
          style={styles.background}
          source={require("../../assets/images/background-register.jpg")} />

        <Header
          style={{ paddingHorizontal: 24, paddingTop: 24, backgroundColor: "transparent" }}
          separator={false}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
              onPress={() => { this.onBack() }} />
          }
        />

        <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: "space-between" }}>
          <View style={{ paddingTop: 40 }}>
            <Text style={[styles.title, { paddingBottom: 40 }]}>{"Digite o número do seu telefone"}</Text>
            <TextInput
              maxLength={15}
              keyboardType="phone-pad"
              multiline={false}
              autoFocus={true}
              style={[styles.input]}
              onChangeText={this.onPhoneChange.bind(this)}
              value={this.state.celular}
              underlineColorAndroid={'transparent'}
            />

            <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />

            {Components.renderIf(this.state.celularError,
              <Text style={styles.inputError} uppercase={false}>{this.state.celularError}</Text>
            )}
          </View>

          <View style={{ paddingVertical: 16, flexDirection: 'row', }}>
            <View style={{ width: '50%' }} />
            <TouchableOpacity style={{ width: '50%' }} onPress={() => { this.submit() }} >
              <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14 }}>
                <Text style={[styles.buttonText, { textAlign: 'center' }]}>{"Continuar"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {Components.renderIf(this.props.isLoading === true,
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <Loading />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    isLoading: state.clients.loading,
    error: state.clients.error
  };
}

export default connect(mapStateToProps)(PhoneScreen);