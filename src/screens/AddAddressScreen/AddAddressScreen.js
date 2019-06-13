import React, { Component } from "react";
import { View, ScrollView, KeyboardAvoidingView, Image, TextInput, Picker, Platform, Switch } from "react-native";

import { Button, Text, Picker as NBPicker } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";

import Snackbar from 'react-native-snackbar';

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { updateLocation, getGeocodeAddress, getAddressByCep } from "../../actions/locations"
import { getDistricts, clearDistricts } from "../../actions/districts";
import { getAddresses, saveAddress, updateAddress, clearError } from "../../actions/addresses";

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
      principal: false,

      nomeError: null,
      cepError: null,
      logradouroError: null,
      numeroError: null,
      complementoError: null,
      cidadeError: null,
      bairroError: null,
      showCep: true,
      useLocation: true,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {

      if (nextProps && nextProps.success === true) {
        this.onBack();
        this.props.dispatch(getAddresses({ client: this.props.client }));
      }

      if (nextProps.currenty_address && this.state.useLocation) {
        this.completeAddress(nextProps.currenty_address);
      }

      if (nextProps.address_by_cep !== this.props.address_by_cep && this.state.useLocation === false) {
        let address = nextProps.address_by_cep
        if (address && address.localidade) {
          address.cidade = { ibge: address.ibge, nome: address.localidade }
        }
        this.completeAddress(address);
      }

      if (nextProps && nextProps.error) {

        if (nextProps.error.response && (nextProps.error.response.status >= 500 && nextProps.error.response.status <= 504)) {
          Snackbar.show({ title: "Erro ao conectar com o servidor!", duration: Snackbar.LENGTH_SHORT });
        }

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
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    const { state: { params } } = this.props.navigation;
    let address = params ? params.address : null;
    if (address) {
      this.completeAddress(address);
    } else {
      if (this.props.cities.length > 0) {
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

  completeAddress(addr) {
    if (addr) {
      if (addr.id) this.setState({ id: addr.id, useLocation: false });
      if (addr.nome_endereco) this.setState({ nome_endereco: addr.nome_endereco });
      if (addr.cep) this.setState({ cep: addr.cep });
      if (addr.logradouro) this.setState({ logradouro: addr.logradouro });

      this.setState({ numero: (addr.numero) ? addr.numero.toString() : '' })
      this.setState({ complemento: (addr.complemento) ? addr.complemento : '' });
      this.setState({ bairro: (addr.bairro) ? addr.bairro : '' })

      if (addr.cidade && addr.cidade.ibge) {
        this.setState({ cidade: +addr.cidade.ibge });
      } else {
        let c = this.props.cities.find((i) => i.nome === addr.cidade)
        if (c) this.setState({ cidade: c.ibge });
      }

      if (addr.principal) this.setState({ principal: addr.principal });
    }
  }

  clearFormErrors() {
    this.setState({ nomeError: null, cepError: null, logradouroError: null, numeroError: null, complementoError: null, cidadeError: null, bairroError: null })
  }

  getLocation() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.props.dispatch(updateLocation('PI', position.coords.latitude, position.coords.longitude));
      this.props.dispatch(getGeocodeAddress(position.coords));
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  onChangeCity = (cidade, index) => {
    this.setState({ cidade, bairro: '' });
  }

  _loadBairros(cidade) {
    this.props.dispatch(getDistricts(cidade))
  }

  onChangeCep = cep => {
    let cepMask = MaskService.toMask('zip-code', cep);
    this.setState({ cep: cepMask })

    if (StringUtils.removeMask(cepMask).length >= 8 && this.state.useLocation === false) {
      setTimeout(() => {
        this.props.dispatch(getAddressByCep({ cep: StringUtils.removeMask(cepMask) }));
      }, 500);
    } else {
      this.setState({ button_disabled: true, cep_error: null })
    }
  }

  onChangeUseLocation = value => {
    this.setState({ useLocation: value });
    if (value) {
      this.getLocation();
      this.props.dispatch(getGeocodeAddress({ latitude: this.props.latitude, longitude: this.props.longitude }));
    }
  }

  onChangePrincipal = value => {
    this.setState({ principal: value });
  }

  validForm() {
    this.clearFormErrors();

    if (this.state.nome_endereco == null || this.state.nome_endereco == "") {
      this.setState({ nomeError: "Este campo é obrigatório" })
      return false;
    }

    if (this.state.cep) {
      if (StringUtils.removeMask(this.state.cep).length < 8) {
        this.setState({ cepError: "Este campo é inválido" })
        return false;
      }
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
      address["principal"] = this.state.principal;

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
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>

          <Header
            title={"Novo Endereço"}
            subtitle={"Preencha as informações do endereço"}
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
              <Text style={[styles.label, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Nome</Text>
              <TextInput
                multiline={false}
                style={styles.input}
                placeholderTextColor="#CCC"
                value={this.state.nome_endereco}
                underlineColorAndroid={"transparent"}
                onChangeText={(nome_endereco) => this.setState({ nome_endereco })}
              />
              <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
              {Components.renderIfElse(this.state.nomeError,
                <Text style={styles.inputError} uppercase={false}>{this.state.nomeError}</Text>,
                <Text style={styles.example} uppercase={false}>{"Ex: Casa, Trabalho..."}</Text>
              )}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 24 }}>
              <Text style={styles.text}>{'Usar minha localização'}</Text>
              <Switch
                onValueChange={this.onChangeUseLocation.bind(this)}
                value={this.state.useLocation} />
            </View>

            {Components.renderIf(this.state.showCep,
              <View floatingLabel style={styles.formitem}>
                <Text style={[styles.label, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]} >CEP</Text>
                <TextInput
                  maxLength={9}
                  multiline={false}
                  style={styles.input}
                  value={this.state.cep}
                  keyboardType={"numeric"}
                  placeholderTextColor="#CCC"
                  underlineColorAndroid={"transparent"}
                  onChangeText={this.onChangeCep.bind(this)}
                />
                <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
                {Components.renderIf(this.state.cepError, <Text style={styles.inputError} uppercase={false}>{this.state.cepError}</Text>)}
              </View>
            )}

            <View floatingLabel style={styles.formitem}>
              <Text style={[styles.label, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Cidade</Text>
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
              <Text style={[styles.label, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Bairro</Text>
              <TextInput
                multiline={false}
                style={styles.input}
                value={this.state.bairro}
                placeholderTextColor="#CCC"
                underlineColorAndroid={"transparent"}
                onChangeText={(bairro) => this.setState({ bairro })}
              />
              <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
              {Components.renderIf(this.state.bairroError, <Text style={styles.inputError} uppercase={false}>{this.state.bairroError}</Text>)}
            </View>

            <View floatingLabel style={styles.formitem}>
              <Text style={[styles.label, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Logradouro</Text>
              <TextInput
                multiline={false}
                style={styles.input}
                placeholderTextColor="#CCC"
                value={this.state.logradouro}
                underlineColorAndroid={"transparent"}
                onChangeText={(logradouro) => this.setState({ logradouro })}
              />
              <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
              {Components.renderIf(this.state.logradouroError, <Text style={styles.inputError} uppercase={false}>{this.state.logradouroError}</Text>)}
            </View>

            <View floatingLabel style={styles.formitem}>
              <Text style={[styles.label, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Número</Text>
              <TextInput
                multiline={false}
                style={styles.input}
                keyboardType={"numeric"}
                value={this.state.numero}
                placeholderTextColor="#CCC"
                underlineColorAndroid={"transparent"}
                onChangeText={(numero) => this.setState({ numero })}
              />
              <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
              {Components.renderIf(this.state.numeroError, <Text style={styles.inputError} uppercase={false}>{this.state.numeroError}</Text>)}
            </View>

            <View floatingLabel style={styles.formitem}>
              <Text style={[styles.label, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Complemento</Text>
              <TextInput
                multiline={false}
                style={styles.input}
                placeholderTextColor="#CCC"
                value={this.state.complemento}
                underlineColorAndroid={"transparent"}
                onChangeText={(complemento) => this.setState({ complemento })}
              />
              <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
              {Components.renderIf(this.state.complementoError, <Text style={styles.inputError} uppercase={false}>{this.state.complementoError}</Text>)}
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8, marginBottom: 64 }}>
              <Text style={styles.text}>{'Meu endereço principal'}</Text>
              <Switch
                onValueChange={this.onChangePrincipal.bind(this)}
                value={this.state.principal} />
            </View>

          </ScrollView>
        </KeyboardAvoidingView>

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

    uf: state.locations.uf,
    address: state.locations.address,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,
    currenty_address: state.locations.address,
    address_by_cep: state.locations.address_by_cep,

    cities: state.cities.cities,
    districts: state.districts.districts,

    addresses: state.addresses.addresses,
    isLoading: state.addresses.isLoading,
    error: state.addresses.error,
    success: state.addresses.success,
  };
}

export default connect(mapStateToProps)(AddAddressScreen);
