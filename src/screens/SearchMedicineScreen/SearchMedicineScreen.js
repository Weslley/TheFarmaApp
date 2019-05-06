import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Image, TouchableOpacity, FlatList } from 'react-native';
import { Text, Button } from "native-base";

import Snackbar from 'react-native-snackbar';
import AsyncStorage from "@react-native-community/async-storage";

import { connect } from 'react-redux';
import { setFcmToken } from "../../actions/clients"
import { getLocation } from "../../actions/locations"

import { searchProducts, selectProduct, getHistory, searchProductsByBarcode, clearError } from '../../actions/products';
import { clearApresentations } from '../../actions/apresentations';

import { Icon } from '../../components/Icon';
import { MenuItem } from '../../components/MenuItem';
import { BarcodeScanner } from '../../components/BarcodeScanner';

import { SearchHeader } from '../../layout/Header';

import { Components } from '../../helpers';
import styles from "./styles";

class SearchMedicineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCamera: false
    }
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null }
  }

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          Snackbar.show({ title: nextProps.error.message, duration: Snackbar.LENGTH_SHORT });
        }

        if (nextProps.error.message && nextProps.error.message === 'Network Error') {
          Snackbar.show({ title: 'Sem conexão com a internet', duration: Snackbar.LENGTH_SHORT });
        }
      }

      if (nextProps && nextProps.success === true && nextProps.apresentation !== null) {
        this._showProductDetail(nextProps.apresentation)
        let product = {
          nome: nextProps.apresentation.produto.nome,
          ids: [nextProps.apresentation.produto.id]
        }
        this.props.dispatch(selectProduct(product));
        this.props.dispatch(searchProducts(this.props.uf, product.nome));
        this.props.dispatch(clearError());
      }
    } catch (e) {
      Snackbar.show({ title: e.message, duration: Snackbar.LENGTH_SHORT });
    }
  }

  componentWillMount() {
    this.props.dispatch(getLocation());
    const { state: { params } } = this.props.navigation;
    if (params) {
      if (params.showCamera) this.setState({ showCamera: params.showCamera })
    }
  }

  componentDidMount() {
    this.props.dispatch(getHistory());
    //Envia FCM Token ao servidor
    setTimeout(() => { this.sendFcmToken(); }, 1000)
  }

  async sendFcmToken() {
    let client = this.props.client;
    let fcmToken = await AsyncStorage.getItem("@fcm_token", null);
    if (client && fcmToken) {
      let params = { client: this.props.client, fields: { fcm: fcmToken } }
      this.props.dispatch(setFcmToken(params));
    }
  }

  /** Private functions */

  onBack() {
    this.props.navigation.goBack(null);
  }

  _showProductDetail(apresentation) {
    this.props.navigation.navigate({ key: 'apresentation_detail1', routeName: 'ApresentationDetail', params: { apresentation } });
  }

  onSelect = product => {
    this.props.dispatch(selectProduct(product));
    this.props.dispatch(clearApresentations());
    this.props.navigation.navigate({ key: 'MedicineApresentations1', routeName: 'MedicineApresentations', params: { title: product.nome, selected: product } });
  }

  onSuccess(e) {
    try {
      console.log(e);
      this.setState({ showCamera: false })
      let params = { uf: this.props.uf, query: e.data }
      this.props.dispatch(searchProductsByBarcode(params))
    } catch (error) {
      console.error(error);
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.itemContainer, { flexDirection: 'row', alignItems: 'center' }]}
      onPress={() => { this.onSelect(item); }}
    >
      {Components.renderIfElse(this.props.isHistory,
        <Icon name="history" size={16} color={"#000"} style={styles.itemIcon} />,
        <Icon name="pills" size={16} color={"#000"} style={styles.itemIcon} />)}
      <Text>{item.nome}</Text>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

        <SearchHeader
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => { this.onBack() }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
            />
          }
          menuRight={
            <MenuItem
              icon="barcode"
              onPress={() => { this.setState({ showCamera: true }) }}
              style={{ paddingRight: 24, paddingVertical: 12 }}
            />
          }
        />

        <ScrollView style={{ paddingHorizontal: 24 }}>
          {Components.renderIf(!this.props.isHistory, <Text uppercase style={styles.subheader}> Resultado da busca </Text>)}
          {Components.renderIf(this.props.isLoading, <ActivityIndicator size="small" style={{ marginTop: 16 }} />)}
          {Components.renderIf(this.props.products.length > 0,
            <FlatList
              style={{ paddingBottom: 90 }}
              data={this.props.products}
              keyExtractor={(item, index) => item.nome.toString()}
              renderItem={this._renderItem}
            />
          )}
        </ScrollView>

        {Components.renderIf(this.props.products.length <= 0,
          <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.notfound}>{"Nenhum produto encontrado."}</Text>
          </View>
        )}

        {Components.renderIf(this.state.showCamera === true,
          <View style={{ flex: 1, backgroundColor: "#FFF", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
            <BarcodeScanner
              style={{ flex: 1 }}
              reactivateTimout={3000}
              showMarker={true}
              onRead={this.onSuccess.bind(this)}
              ref={(node) => { this.scanner = node }}
              topContent={
                <View style={{ padding: 24 }}>
                  <Text style={{ fontFamily: 'Roboto-Light', fontSize: 24, color: 'rgba(0,0,0,0.80)', textAlign: 'center', marginTop: 24, }}>
                    Aponte a câmera para o <Text style={{ fontFamily: 'Roboto-Bold', fontSize: 24 }}>{" código de barras"}</Text>.
                                  </Text>
                </View>
              }
              bottomContent={
                <View style={{ padding: 24, width: '100%' }}>
                  <Button style={[styles.button]} bordered dark onPress={() => { this.setState({ showCamera: false }) }}>
                    <Text style={[styles.buttonText]} uppercase={false} >{"Cancelar"}</Text>
                  </Button>
                </View>
              }
            />
          </View>
        )}

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,

    uf: state.locations.uf,
    isHistory: state.products.isHistory,
    isLoading: state.products.isLoading,
    products: state.products.loaded,
    apresentation: state.products.apresentation,
    success: state.products.success,
    error: state.products.error
  };
}

export default connect(mapStateToProps)(SearchMedicineScreen);

