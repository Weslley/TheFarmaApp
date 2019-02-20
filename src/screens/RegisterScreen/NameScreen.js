import React, { Component } from "react";
import { NavigationActions, StackActions } from 'react-navigation';;
import { View, KeyboardAvoidingView, ScrollView, Text, Imagem, TextInput, Image, TouchableOpacity, Platform } from "react-native";

import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { updateV2, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"

import { Loading } from "../../components/Loading"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class NameScreen extends Component {
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
      nome_error: null,
      emailError: null,
      celularError: null,
      passwordError: null,
      actionBack: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.nome) {
            this.setState({ nome_error: nextProps.error.response.data.nome[0] })
          }

          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }

          if (nextProps.error.message && nextProps.error.message === 'Network Error') {
            this.setState({ showError: true });
          }
        }
      }

      if (nextProps.client && nextProps.client.nome !== '') {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Tabs', params: { actionBack: this.state.actionBack } })],
        });
        this.props.navigation.dispatch(resetAction);
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

    this.setState({ nome_error: null })
    this.props.dispatch(clearError());
  }

  /** Private functions */
  onBack() {
    this.props.dispatch(clearError());
    this.props.navigation.goBack(null);
  }

  validForm() {
    this.setState({ nome_error: null })
    if (this.state.nome == null || this.state.nome == "") {
      this.setState({ nome_error: "campo obrigatório" })
      return false;
    }
    return true;
  }

  submit() {
    if (this.validForm()) {
      let params = {}
      params["nome"] = this.state.nome;
      this.props.dispatch(updateV2({ client: this.props.client, fields: params }));
    }
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
            <Text style={[styles.title, { paddingBottom: 40 }]}>{"Digite o seu nome completo"}</Text>
            <TextInput
              autoFocus={true}
              multiline={false}
              style={[styles.input]}
              onChangeText={(nome) => this.setState({ nome })}
              value={this.state.nome}
            />

            {Components.renderIf(Platform.OS === 'ios',
              <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
            )}

            {Components.renderIf(this.state.nome_error,
              <Text style={styles.inputError} uppercase={false}>{this.state.nome_error}</Text>
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

export default connect(mapStateToProps)(NameScreen);
