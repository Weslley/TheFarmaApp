import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Text, Form, Item as FormItem, Label, Input, Button, Picker } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";

Input.defaultProps.selectionColor = "black";
Input.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { getAddresses, saveAddress, updateAddress, clearError } from "../../actions/addresses";
import { getDistricts } from "../../actions/districts";

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class AddAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bairros: [],

      id: null,
      nome_endereco: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      cidade: '',
      bairro: '',

      nomeError: null,
      cepError: null,
      logradouroError: null,
      numeroError: null,
      complementoError: null,
      cidadeError: null,
      bairroError: null,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error && nextProps.error.response && (nextProps.error.response.status == 400 && nextProps.error.response.status == 401)) {
        if (nextProps.error.response.data.nome_endereco)
          this.setState({ nomeError: nextProps.error.response.data.nome_endereco[0] })

        if (nextProps.error.response.data.cep)
          this.setState({ cepError: nextProps.error.response.data.cep[0] })

        if (nextProps.error.response.data.logradouro)
          this.setState({ logradouroError: nextProps.error.response.data.logradouro[0] })

        if (nextProps.error.response.data.numero)
          this.setState({ numeroError: nextProps.error.response.data.numero[0] })

        if (nextProps.error.response.data.cidade)
          this.setState({ cidadeError: nextProps.error.response.data.cidade[0] })

        if (nextProps.error.response.data.bairro)
          this.setState({ bairroError: nextProps.error.response.data.bairro[0] })

        if (nextProps.error.response.data.non_field_errors)
          Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });

        if (nextProps.error.response.data.detail)
          Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
      }

      if (nextProps && nextProps.actionSuccess) {
        this.onBack();
        this.props.dispatch(getAddresses({ client: this.props.client }));
      }

      if (nextProps && nextProps.districts) {
        this._loadBairros();
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {

    if (this.props.cities.length > 0) {
      this.setState({ cidade: this.props.cities[0].ibge.toString })
    }

    if (this.state.cidade && this.props.districts.length > 0) {
      let bairros = this.props.districts.filter(d => d.cidade.ibge == this.state.cidade)
      this.setState({ bairros, bairro: bairros[0].id.toString })
    }

    const { state: { params } } = this.props.navigation;
    let address = params ? params.address : null;
    if (address) {
      if (address.id) this.setState({ id: address.id })
      if (address.nome_endereco) this.setState({ nome_endereco: address.nome_endereco })
      if (address.cep) this.setState({ cep: address.cep })
      if (address.logradouro) this.setState({ logradouro: address.logradouro })
      if (address.numero) this.setState({ numero: address.numero.toString() })
      if (address.complemento) this.setState({ complemento: address.complemento })
      if (address.cidade) this.setState({ cidade: address.cidade.ibge.toString() })
      if (address.bairro) this.setState({ bairro: address.bairro.id.toString() })
    }

    this.clearFormErrors();
    this.props.dispatch(clearError());
  }

  /** Private functions */
  onBack() {
    this.props.dispatch(clearError());
    this.props.navigation.goBack(null);
  }

  clearFormErrors() {
    this.setState({ nomeError: null, cepError: null, logradouroError: null, numeroError: null, complementoError: null, cidadeError: null, bairroError: null })
  }

  onCityChange = (cidade) => {
    this.props.dispatch(getDistricts(cidade));
    this.setState({ cidade, bairro: null })
    this._loadBairros();
  }

  _loadBairros() {
    let bairros = this.props.districts.filter(d => d.cidade.ibge === parseInt(this.state.cidade))
    this.setState({ bairros })
    if (bairros.length > 0) {
      this.setState({ bairro: bairros[0].id.toString() })
    }

    console.log("Cidade: " + this.state.cidade);
    console.log("Bairros ->");
    console.log(bairros);
  }

  onDistrictChange = (bairro) => {
    this.setState({ bairro });
  }

  onChangeCep = cep => {
    let cepMask = MaskService.toMask('zip-code', cep);
    this.setState({ cep: cepMask })
  }

  validForm() {
    this.clearFormErrors();

    if (this.state.nome_endereco == null || this.state.nome_endereco == "") {
      this.setState({ nomeError: "campo obrigatório" })
      return false;
    }

    if (this.state.cep == null || this.state.cep == "") {
      this.setState({ cepError: "campo obrigatório" })
      return false;
    }

    if ((this.state.cep != null || this.state.cep == "") && StringUtils.removeMask(this.state.cep).length < 8) {
      this.setState({ cepError: "campo inválido" })
      return false;
    }

    if (this.state.logradouro == null || this.state.logradouro == "") {
      this.setState({ logradouroError: "campo obrigatório" })
      return false;
    }

    if (this.state.numero == null || this.state.numero == "") {
      this.setState({ numeroError: "campo obrigatório" })
      return false;
    }

    if (this.state.cidade == null || this.state.cidade == "") {
      this.setState({ cidadeError: "campo obrigatório" })
      return false;
    }

    if (this.state.bairro == null || this.state.bairro == "") {
      this.setState({ bairroError: "campo obrigatório" })
      return false;
    }
    return true;
  }

  submit() {
    if (this.validForm()) {
      let params = { client: this.props.client }
      let address = {}
      address["nome_endereco"] = this.state.nome_endereco;
      address["cep"] = StringUtils.removeMask(this.state.cep);
      address["logradouro"] = this.state.logradouro;
      address["numero"] = this.state.numero;
      address["complemento"] = this.state.complemento;
      address["cidade"] = this.state.cidade;
      address["bairro"] = this.state.bairro;

      params["address"] = address

      if (this.state.id) {
        params["address"]["id"] = this.state.id;
        this.props.dispatch(updateAddress(params));
      } else {
        this.props.dispatch(saveAddress(params));
      }

    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

        <Header
          title={"Novo Endereço"}
          subtitle={"Prencha as informações do endereço"}
          menuLeft={
            <MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />
          }
          menuRight={
            <MenuItem icon="ios-checkmark-empty" iconSize={40} onPress={() => { this.submit() }} />
          }
        />

        <ScrollView style={{ paddingHorizontal: 24 }}>
          <Form style={styles.form}>
            <FormItem floatingLabel style={styles.formitem}>
              <Label>Nome</Label>
              <Input
                style={styles.input}
                placeholderTextColor="#CCC"
                multiline={false}
                onChangeText={(nome_endereco) => this.setState({ nome_endereco })}
                value={this.state.nome_endereco}
              />
            </FormItem>

            {Components.renderIf(this.state.nomeError,
              <Text style={styles.inputError} uppercase={false}>{this.state.nomeError}</Text>
            )}

            <FormItem floatingLabel style={styles.formitem}>
              <Label >CEP</Label>
              <Input
                keyboardType={"numeric"}
                style={styles.input}
                placeholderTextColor="#CCC"
                multiline={false}
                onChangeText={this.onChangeCep.bind(this)}
                value={this.state.cep}
              />
            </FormItem>

            {Components.renderIf(this.state.cepError,
              <Text style={styles.inputError} uppercase={false}>{this.state.cepError}</Text>
            )}

            <View floatingLabel style={styles.formitem}>
              <Label style={styles.label}>Cidade</Label>
              <Picker
                mode="dropdown"
                selectedValue={this.state.cidade}
                onValueChange={(cidade) => { this.onCityChange(cidade) }}
                itemTextStyle={styles.input}
              >
                {this.props.cities.map((city) => {
                  return (
                    <Picker.Item
                      label={`${city.nome}-${city.uf.sigla}`}
                      key={city.ibge}
                      value={`${city.ibge}`} />
                  )
                })}
              </Picker>
              <View style={{ borderBottomColor: "rgba(0,0,0,0.32)", borderBottomWidth: 1 }} />
            </View>

            {Components.renderIf(this.state.cidadeError,
              <Text style={styles.inputError} uppercase={false}>{this.state.cidadeError}</Text>
            )}

            <View floatingLabel style={styles.formitem}>
              <Label style={styles.label}>Bairro</Label>
              <Picker
                mode="dropdown"
                textStyle={{ borderWidth: 1, borderColor: 'blue' }}
                selectedValue={this.state.bairro}
                onValueChange={(district) => { this.onDistrictChange(district) }}>
                {this.state.bairros.map((bairro) => {
                  return (
                    <Picker.Item
                      label={bairro.nome}
                      key={bairro.id}
                      value={`${bairro.id}`} />
                  )
                })}
              </Picker>
              <View style={{ borderBottomColor: "rgba(0,0,0,0.32)", borderBottomWidth: 1 }} />
            </View>

            {Components.renderIf(this.state.bairroError,
              <Text style={styles.inputError} uppercase={false}>{this.state.bairroError}</Text>
            )}

            <FormItem floatingLabel style={styles.formitem}>
              <Label>Logradouro</Label>
              <Input
                style={styles.input}
                placeholderTextColor="#CCC"
                multiline={false}
                onChangeText={(logradouro) => this.setState({ logradouro })}
                value={this.state.logradouro}
              />
            </FormItem>

            {Components.renderIf(this.state.logradouroError,
              <Text style={styles.inputError} uppercase={false}>{this.state.logradouroError}</Text>
            )}

            <FormItem floatingLabel style={styles.formitem}>
              <Label>Número</Label>
              <Input
                keyboardType={"numeric"}
                style={styles.input}
                placeholderTextColor="#CCC"
                multiline={false}
                onChangeText={(numero) => this.setState({ numero })}
                value={this.state.numero}
              />
            </FormItem>

            {Components.renderIf(this.state.numeroError,
              <Text style={styles.inputError} uppercase={false}>{this.state.numeroError}</Text>
            )}

            <FormItem floatingLabel style={styles.formitem}>
              <Label>Complemento</Label>
              <Input
                style={styles.input}
                placeholderTextColor="#CCC"
                multiline={false}
                onChangeText={(complemento) => this.setState({ complemento })}
                value={this.state.complemento}
              />
            </FormItem>

            {Components.renderIf(this.state.complementoError,
              <Text style={styles.inputError} uppercase={false}>{this.state.complementoError}</Text>
            )}
          </Form>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cities: state.cities.cities,
    districts: state.districts.districts,
    client: state.clients.client,
    error: state.clients.error,
    actionSuccess: state.addresses.actionSuccess,
  };
}

export default connect(mapStateToProps)(AddAddressScreen);
