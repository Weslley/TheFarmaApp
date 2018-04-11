import React, { Component } from "react";
import { View, ScrollView, Image, TextInput } from "react-native";
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

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {

    if (this.props.cities.length > 0) {
      this._loadBairros(this.props.cities[0].ibge.toString);
      this.setState({ cidade: this.props.cities[0].ibge.toString });
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
      this._loadBairros(this.state.cidade);
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
    this.setState({ cidade, bairro: null })
    this._loadBairros(cidade);
  }

  _loadBairros(cidade) {
    let bairros = this.props.districts.filter(d => d.cidade.ibge.toString() === cidade)

    if (bairros.length > 0) {
      this.setState({ bairro: bairros[0].id.toString() })
    }

    this.setState({ bairros })

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
            <MenuItem icon="check" onPress={() => { this.submit() }} />
          }
        />

        <ScrollView style={{ paddingHorizontal: 24, paddingTop: 18}}>

          <View floatingLabel style={styles.formitem}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#CCC"
              multiline={false}
              onChangeText={(nome_endereco) => this.setState({ nome_endereco })}
              value={this.state.nome_endereco}
            />
            {Components.renderIfElse(this.state.nomeError,
              <Text style={styles.inputError} uppercase={false}>{this.state.nomeError}</Text>,
              <Text style={styles.example} uppercase={false}>{"Ex: Casa, Trabalho..."}</Text>
            )}
          </View>

          <View floatingLabel style={styles.formitem}>
            <Text style={styles.label} >CEP</Text>
            <TextInput
              keyboardType={"numeric"}
              style={styles.input}
              placeholderTextColor="#CCC"
              multiline={false}
              onChangeText={this.onChangeCep.bind(this)}
              value={this.state.cep}
            />
            {Components.renderIf(this.state.cepError,
              <Text style={styles.inputError} uppercase={false}>{this.state.cepError}</Text>
            )}
          </View>

          <View floatingLabel style={styles.formitem}>
            <Text style={styles.label} style={styles.label}>Cidade</Text>
            <Picker
              selectedValue={this.state.cidade}
              onValueChange={(cidade) => { this.onCityChange(cidade) }}
              itemTextStyle={styles.input}
            >
              {this.props.cities.map((city) => {
                return (<Picker.Item label={`${city.nome}-${city.uf.sigla}`} key={city.ibge} value={`${city.ibge}`} />)
              })}
            </Picker>
            <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: -6 }} />
            {Components.renderIf(this.state.cidadeError,
              <Text style={styles.inputError} uppercase={false}>{this.state.cidadeError}</Text>
            )}
          </View>

          <View floatingLabel style={styles.formitem}>
            <Text style={styles.label} style={styles.label}>Bairro</Text>
            <Picker
              selectedValue={this.state.bairro}
              onValueChange={(district) => { this.onDistrictChange(district) }}>
              {this.state.bairros.map((bairro) => {
                return (<Picker.Item label={bairro.nome} key={bairro.id} value={`${bairro.id}`} />)
              })}
            </Picker>
            <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: -6 }} />
            {Components.renderIf(this.state.bairroError,
              <Text style={styles.inputError} uppercase={false}>{this.state.bairroError}</Text>
            )}
          </View>

          <View floatingLabel style={styles.formitem}>
            <Text style={styles.label}>Logradouro</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#CCC"
              multiline={false}
              onChangeText={(logradouro) => this.setState({ logradouro })}
              value={this.state.logradouro}
            />
            {Components.renderIf(this.state.logradouroError,
              <Text style={styles.inputError} uppercase={false}>{this.state.logradouroError}</Text>
            )}
          </View>

          <View floatingLabel style={styles.formitem}>
            <Text style={styles.label}>Número</Text>
            <TextInput
              keyboardType={"numeric"}
              style={styles.input}
              placeholderTextColor="#CCC"
              multiline={false}
              onChangeText={(numero) => this.setState({ numero })}
              value={this.state.numero}
            />
            {Components.renderIf(this.state.numeroError,
              <Text style={styles.inputError} uppercase={false}>{this.state.numeroError}</Text>
            )}
          </View>

          <View floatingLabel style={[styles.formitem, { marginBottom: 64 }]}>
            <Text style={styles.label}>Complemento</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor="#CCC"
              multiline={false}
              onChangeText={(complemento) => this.setState({ complemento })}
              value={this.state.complemento}
            />
            {Components.renderIf(this.state.complementoError,
              <Text style={styles.inputError} uppercase={false}>{this.state.complementoError}</Text>
            )}
          </View>

        </ScrollView>
      </View >
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