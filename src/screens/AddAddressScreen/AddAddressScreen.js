import React, { Component } from "react";
import { View, ScrollView, Image, TextInput, Picker, Platform } from "react-native";
import { Button, Text, Picker as NBPicker } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { getAddresses, saveAddress, updateAddress, clearError } from "../../actions/addresses";
import { getDistricts, clearDistricts } from "../../actions/districts";

import { Header } from "../../layout/Header"
import { Icon } from "../../components/Icon"
import { Loading } from "../../components/Loading"
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
      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {

          if (nextProps.error.response.data.nome_endereco) {
            this.setState({ nomeError: nextProps.error.response.data.nome_endereco[0] })
          }

          if (nextProps.error.response.data.cep) {
            this.setState({ cepError: nextProps.error.response.data.cep[0] })
          }

          if (nextProps.error.response.data.logradouro) {
            this.setState({ logradouroError: nextProps.error.response.data.logradouro[0] })
          }

          if (nextProps.error.response.data.numero) {
            this.setState({ numeroError: nextProps.error.response.data.numero[0] })
          }

          if (nextProps.error.response.data.cidade) {
            this.setState({ cidadeError: nextProps.error.response.data.cidade[0] })
          }

          if (nextProps.error.response.data.bairro) {
            this.setState({ bairroError: nextProps.error.response.data.bairro[0] })
          }

          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }

        }
      }

      if (nextProps && nextProps.success === true) {
        this.onBack();
        this.props.dispatch(getAddresses({ client: this.props.client }));
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    const { state: { params } } = this.props.navigation;
    let address = params ? params.address : null;
    if (address) {
      if (address.id) this.setState({ id: address.id })
      if (address.nome_endereco) this.setState({ nome_endereco: address.nome_endereco })
      if (address.cep) this.setState({ cep: address.cep })
      if (address.logradouro) this.setState({ logradouro: address.logradouro })
      if (address.numero) this.setState({ numero: address.numero.toString() })
      if (address.complemento) this.setState({ complemento: address.complemento })
      if (address.cidade) {
        this.setState({ cidade: address.cidade.ibge })
        this._loadBairros(address.cidade.ibge);
      }
      if (address.bairro) this.setState({ bairro: address.bairro.id })

    } else {

      if (this.props.cities.length > 0) {
        this._loadBairros(this.props.cities[0].ibge);
        this.setState({ cidade: this.props.cities[0].ibge });
      }

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

  onChangeCity = (cidade, index) => {
    this.setState({ cidade, bairro: '' })
    if (cidade !== 0) this._loadBairros(cidade);
  }

  _loadBairros(cidade) {
    this.props.dispatch(getDistricts(cidade))
  }

  onChangeCep = cep => {
    let cepMask = MaskService.toMask('zip-code', cep);
    this.setState({ cep: cepMask })
  }

  validForm() {
    this.clearFormErrors();

    if (this.state.nome_endereco == null || this.state.nome_endereco == "") {
      this.setState({ nomeError: "Este campo é obrigatório" })
      return false;
    }

    if (this.state.cep == null || this.state.cep == "") {
      this.setState({ cepError: "Este campo é obrigatório" })
      return false;
    }

    if ((this.state.cep != null || this.state.cep == "") && StringUtils.removeMask(this.state.cep).length < 8) {
      this.setState({ cepError: "Este campo é inválido" })
      return false;
    }

    if (this.state.logradouro == null || this.state.logradouro == "") {
      this.setState({ logradouroError: "Este campo é obrigatório" })
      return false;
    }

    if (this.state.numero == null || this.state.numero == "") {
      this.setState({ numeroError: "Este campo é obrigatório" })
      return false;
    }

    if (this.state.cidade == null || this.state.cidade == "") {
      this.setState({ cidadeError: "Este campo é obrigatório" })
      return false;
    }

    if (this.state.bairro == null || this.state.bairro == "") {
      this.setState({ bairroError: "Este campo é obrigatório" })
      return false;
    }
    return true;
  }

  submit() {
    if (this.validForm()) {

      let address = {}
      address["nome_endereco"] = this.state.nome_endereco;
      address["cep"] = StringUtils.removeMask(this.state.cep);
      address["logradouro"] = this.state.logradouro;
      address["numero"] = this.state.numero;
      address["complemento"] = this.state.complemento;
      address["cidade"] = this.state.cidade;
      address["bairro"] = this.state.bairro;

      let params = { client: this.props.client, address }

      if (this.state.id) {
        params["address"]["id"] = this.state.id;
        this.props.dispatch(updateAddress(params));
      } else {
        this.props.dispatch(saveAddress(params));
      }

    }
  }

  _renderCitiesOptions() {
    let options = this.props.cities.map((i) => {
      return (<NBPicker.Item label={`${i.nome}-${i.uf.sigla}`} key={"c" + i.ibge} value={i.ibge} />)
    })
    options.unshift(<NBPicker.Item key="c0" label="Selecione uma cidade" value='' />)
    return options;
  }

  _renderDistrictOptions() {
    let options = this.props.districts.map((i) => {
      return (<NBPicker.Item label={`${i.nome}`} key={"s" + i.id} value={i.id} />)
    })
    options.unshift(<NBPicker.Item key="d0" label="Selecione um bairro" value='' />)
    return options;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <Header
            title={"Novo Endereço"}
            subtitle={"Prencha as informações do endereço"}
            menuLeft={
              <MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }}
                style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }} />
            }
            menuRight={
              <MenuItem icon="check" onPress={() => { this.submit() }}
                style={{ paddingRight: 24, paddingVertical: 12 }} />
            }
          />

          <ScrollView style={{ paddingHorizontal: 24, paddingTop: 18 }}>
            <View floatingLabel style={styles.formitem}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholderTextColor="#CCC"
                multiline={false}
                onChangeText={(nome_endereco) => this.setState({ nome_endereco })}
                value={this.state.nome_endereco}
              />
              {Components.renderIf(Platform.OS === 'ios',
                <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
              )}
              {Components.renderIfElse(this.state.nomeError,
                <Text style={styles.inputError} uppercase={false}>{this.state.nomeError}</Text>,
                <Text style={styles.example} uppercase={false}>{"Ex: Casa, Trabalho..."}</Text>
              )}
            </View>

            <View floatingLabel style={styles.formitem}>
              <Text style={styles.label} >CEP</Text>
              <TextInput
                maxLength={9}
                keyboardType={"numeric"}
                style={styles.input}
                placeholderTextColor="#CCC"
                multiline={false}
                onChangeText={this.onChangeCep.bind(this)}
                value={this.state.cep}
              />
              {Components.renderIf(Platform.OS === 'ios',
                <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
              )}
              {Components.renderIf(this.state.cepError,
                <Text style={styles.inputError} uppercase={false}>{this.state.cepError}</Text>
              )}
            </View>

            <View floatingLabel style={styles.formitem}>
              <Text style={styles.label} style={styles.label}>Cidade</Text>
              <NBPicker
                mode={Platform.OS === 'ios' ? "dropdown" : 'dialog'}
                iosHeader="Selecione uma cidade"
                iosIcon={<Icon name="ios-arrow-down" size={24} color={"#000"} />}
                headerBackButtonText="voltar"
                itemStyle={styles.nbItem}
                textStyle={styles.nbTextItem}
                selectedValue={this.state.cidade}
                onValueChange={this.onChangeCity.bind(this)}>
                {this._renderCitiesOptions()}
              </NBPicker>
              <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: -6 }} />
              {Components.renderIf(this.state.cidadeError,
                <Text style={styles.inputError} uppercase={false}>{this.state.cidadeError}</Text>
              )}
            </View>

            <View floatingLabel style={styles.formitem}>
              <Text style={styles.label} style={styles.label}>Bairro</Text>
              <NBPicker
                mode={Platform.OS === 'ios' ? "dropdown" : 'dialog'}
                iosHeader="Selecione um bairro"
                iosIcon={<Icon name="ios-arrow-down" size={24} color={"#000"} />}
                headerBackButtonText="voltar"
                itemStyle={styles.nbItem}
                textStyle={styles.nbTextItem}
                selectedValue={this.state.bairro}
                onValueChange={(value, index) => this.setState({ bairro: value })}>
                {this._renderDistrictOptions()}
              </NBPicker>
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
              {Components.renderIf(Platform.OS === 'ios',
                <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
              )}
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
              {Components.renderIf(Platform.OS === 'ios',
                <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
              )}
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
              {Components.renderIf(Platform.OS === 'ios',
                <View style={{ borderBottomColor: '#000', borderWidth: 0.5, marginTop: 4, }} />
              )}
              {Components.renderIf(this.state.complementoError,
                <Text style={styles.inputError} uppercase={false}>{this.state.complementoError}</Text>
              )}
            </View>

          </ScrollView>
        </View >

        {Components.renderIf(this.props.isLoading === true,
          <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <Loading />
          </View>
        )}

      </View >
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    cities: state.cities.cities,
    districts: state.districts.districts,
    isLoading: state.addresses.isLoading,
    error: state.addresses.error,
    success: state.addresses.success,
  };
}

export default connect(mapStateToProps)(AddAddressScreen);
