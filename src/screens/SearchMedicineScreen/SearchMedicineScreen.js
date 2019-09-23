import React, { Component } from "react";
import { NavigationEvents } from 'react-navigation';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from "react-native";

import { Text, Button } from "native-base";

import Snackbar from "react-native-snackbar";
import Permissions from "react-native-permissions";
import AsyncStorage from "@react-native-community/async-storage";

import { connect } from "react-redux";
import { setFcmToken } from "../../actions/clients";
import { getLocation } from "../../actions/locations";
import { clearApresentations } from "../../actions/apresentations";
import { searchProducts, selectProduct, getHistory, searchProductsByBarcode, clearError, clearDosages, clearProduct, getDosages } from "../../actions/products";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { BarcodeScanner } from "../../components/BarcodeScanner";

import { SearchHeader } from "../../layout/Header";
import { ViewCartBar } from "../../layout/ViewCartBar";

import { Components } from "../../helpers";
import styles from "./styles";

import { orderBy, groupBy, keys } from 'lodash';

class SearchMedicineScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      showCamera: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {

      if (nextProps && nextProps.error) {
        let error = nextProps.error;
        if ( error.response && (error.response.status >= 400 && error.response.status <= 403)) {
          Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_SHORT });
        }

        if (error.message){
          if (error.message === "Network Error") {
            Snackbar.show({ title: "Sem conexão com o servidor.", duration: Snackbar.LENGTH_SHORT});
          }else{
            Snackbar.show({ title: error.message, duration: Snackbar.LENGTH_SHORT});
          }
        }
      }

      if (nextProps && nextProps.success === true && nextProps.apresentation !== null) {
        this._showProductDetail(nextProps.apresentation);
        let product = { nome: nextProps.apresentation.produto.nome, ids: [nextProps.apresentation.produto.id] };
        this.props.dispatch(selectProduct(product));
        this.props.dispatch(searchProducts(this.props.uf, product.nome));
        this.props.dispatch(clearError());
      }

      if (nextProps && nextProps.selected && nextProps.action==='GET_DOSAGES_SUCCESS') {
        let product = nextProps.selected;
        let lkeys = keys(nextProps.dosages)
        if(lkeys.length > 0 && lkeys[0]!==""){
          this.props.navigation.navigate({
            key: "SelectApresentations1",
            routeName: "SelectApresentations",
            params: { title: product.nome, product: product }
          });
        }else{
          this.props.navigation.navigate({
            key: "MedicineApresentations1",
            routeName: "MedicineApresentations",
            params: { title: product.nome, selected: product }
          });
        }

      }

    } catch (e) {
      Snackbar.show({ title: e.message, duration: Snackbar.LENGTH_SHORT });
    }
  };

  componentWillMount() {
    Permissions.check("location").then(response => {
      if (response === "authorized") this.props.dispatch(getLocation());
    });

    const { state: { params } } = this.props.navigation;
    if (params) {
      if (params.showCamera) this.setState({ showCamera: params.showCamera });
    }
  }

  componentDidMount() {
    this.props.dispatch(getHistory());
    //Envia FCM Token ao servidor
    setTimeout(() => {
      this.sendFcmToken();
    }, 1000);
  }

  async sendFcmToken() {
    let client = this.props.client;
    let fcmToken = await AsyncStorage.getItem("@fcm_token", null);
    if (client && fcmToken) {
      let params = { client: this.props.client, fields: { fcm: fcmToken } };
      this.props.dispatch(setFcmToken(params));
    }
  }

  /** Private functions */

  onBack() {
    this.props.navigation.goBack(null);
  }

  showCart() {
    this.props.navigation.navigate({
      key: "cart1",
      routeName: "Cart",
      params: { title: "Cestinha" }
    });
  }

  _showProductDetail(apresentation) {
    this.props.navigation.navigate({
      key: "apresentation_detail1",
      routeName: "ApresentationDetail",
      params: { apresentation }
    });
  }

  getCartSize() {
    let cItems = this.props.cartItems;
    return (cItems && cItems.length) ? cItems.length : 0;
  }

  onSelect = product => {
    this.props.dispatch(clearDosages());
    this.props.dispatch(clearApresentations());
    this.props.dispatch(selectProduct(product));
    this.props.dispatch(getDosages({ product }));
  };

  onQueryChange = query => {
    this.setState({ query });
    this.props.dispatch(searchProducts(this.props.uf, query));
  }

  onClearSearch = () => {
    this.setState({ query: "" });
    this.props.dispatch(getHistory());
  }

  onSuccess(e) {
    try {
      console.log(e);
      this.setState({ showCamera: false });
      let params = { uf: this.props.uf, query: e.data };
      this.props.dispatch(searchProductsByBarcode(params));
    } catch (error) {
      console.error(error);
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.itemContainer,
        { flexDirection: "row", alignItems: "center" }
      ]}
      onPress={() => {
        this.onSelect(item);
      }}
    >
      {Components.renderIfElse(
        this.props.isHistory,
        <Icon
          name="history"
          size={16}
          color={"#000"}
          style={styles.itemIcon}
        />,
        <Icon name="pills" size={16} color={"#000"} style={styles.itemIcon} />
      )}
      <Text>{item.nome}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        style={{ flex: 1, backgroundColor: "#FFFFFF" }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={-500}
      >
        <NavigationEvents onWillFocus = { payload => this.props.dispatch(clearError()) } />
        <SearchHeader
          query={this.state.query}
          onQueryChange={this.onQueryChange}
          onClearSearch={this.onClearSearch}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => {
                this.onBack();
              }}
              style={{
                paddingLeft: 24,
                paddingVertical: 12,
                paddingRight: 12
              }}
            />
          }
          menuRight={
            <MenuItem
              icon="barcode"
              onPress={() => {
                this.setState({ showCamera: true });
              }}
              style={{ paddingRight: 24, paddingVertical: 12 }}
            />
          }
        />

        <ScrollView style={{ paddingHorizontal: 24 }} keyboardShouldPersistTaps="always">

          {Components.renderIf(!this.props.isHistory,
            <Text uppercase style={styles.subheader}>{"Resultado da busca"}</Text>
          )}

          {Components.renderIf(this.props.loading,
            <ActivityIndicator size="small" style={{ marginTop: 16 }} />
          )}

          {Components.renderIf(
            this.props.products.length > 0,
            <FlatList
              data={this.props.products}
              style={{ paddingBottom: 90 }}
              renderItem={this._renderItem}
              keyboardShouldPersistTaps={"handled"}
              keyExtractor={(item, index) => item.nome.toString()}
            />
          )}
        </ScrollView>

        {Components.renderIf(this.getCartSize() > 0,
          <ViewCartBar  value={this.getCartSize()} onPress={() => {this.showCart()}} />
        )}

        {Components.renderIf(this.props.products.length <= 0,
          <View style={styles.ctnNotFoundMsg}>
            <Text style={styles.notfound}>{"Nenhum produto encontrado."}</Text>
          </View>
        )}

        {Components.renderIf(
          this.state.showCamera === true,
          <View
            style={{
              flex: 1,
              backgroundColor: "#FFF",
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              left: 0
            }}
          >
            <BarcodeScanner
              style={{ flex: 1 }}
              reactivateTimout={3000}
              showMarker={true}
              onRead={this.onSuccess.bind(this)}
              ref={node => {
                this.scanner = node;
              }}
              topContent={
                <View style={{ padding: 24 }}>
                  <Text
                    style={{
                      fontFamily: "Roboto-Light",
                      fontSize: 24,
                      color: "rgba(0,0,0,0.80)",
                      textAlign: "center",
                      marginTop: 24
                    }}
                  >
                    Aponte a câmera para o{" "}
                    <Text style={{ fontFamily: "Roboto-Bold", fontSize: 24 }}>
                      {" código de barras"}</Text>.
                    </Text>
                </View>
              }
              bottomContent={
                <View style={{ padding: 24, width: "100%" }}>
                  <Button
                    style={[styles.button]}
                    bordered
                    dark
                    onPress={() => {
                      this.setState({ showCamera: false });
                    }}
                  >
                    <Text style={[styles.buttonText]} uppercase={false}>
                      {"Cancelar"}
                    </Text>
                  </Button>
                </View>
              }
            />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    cartItems: state.carts.cartItems,

    uf: state.locations.uf,
    isHistory: state.products.isHistory,
    loading: state.products.loading,
    products: state.products.loaded,
    apresentation: state.products.apresentation,
    success: state.products.success,
    error: state.products.error,

    selected: state.products.selected,
    dosages: state.products.dosages,
    action: state.products.action,
  };
}

export default connect(mapStateToProps)(SearchMedicineScreen);
