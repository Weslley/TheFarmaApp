import React, { Component } from "react";
import { StatusBar, View, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { Text } from "native-base";

import Permissions from "react-native-permissions";
import RNGooglePlaces from "react-native-google-places";

import { connect } from "react-redux";
import { createOrder } from "../../actions/orders";
import { rankingView } from "../../actions/apresentations";
import { addItemToCart, removeItemToCart } from "../../actions/carts";
import { getGenerics, clearError, clearGenerics } from "../../actions/generics";
import { getLocation, getGeocodeAddress, updateLocation } from "../../actions/locations";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ViewCartBar } from "../../layout/ViewCartBar";
import { ActionSheet } from "../../layout/ActionSheet";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { GooglePlaces } from "../../components/GooglePlaces";
import { ProductDescription } from "../../components/Product";
import { LocationListItem } from "../../components/LocationListItem";
import { ApresentationDetailDescription } from "../../components/Product";

import { Components, CartUtils } from "../../helpers";
import { TipoMedicamento } from "../../models/enums"

import styles from "./styles";

const ic_walking = require("../../assets/images/ic_walking.png");
const imgDefault = require("../../assets/images/ic_default_medicine.png");

class ApresentationDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apresentation: null,
      generics: [],
      show_delivery_dialog: false,
      places: [],
      show_places: false,
      show_delivery_dialog: false,
      location_permission: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    if (this.state.apresentation) {
      let apresentation = this.state.apresentation;
      apresentation.quantity = this.getApresentationQuantity(nextProps, apresentation);
      this.setState({ apresentation })
    }
    this.setState({ generics: nextProps.generics })
  };

  componentWillMount() {
    let apresentation = this.props.navigation.state.params.apresentation
    this.setState({ apresentation });

    Permissions.check("location").then(response => {
      this.setState({ location_permission: response });
      if (response === "authorized") {
        this.props.dispatch(getLocation());
      }
    });
  }

  componentDidMount() {
    StatusBar.setHidden(false);
    StatusBar.setTranslucent(true);

    this.props.dispatch(clearError());
    this.props.dispatch(clearGenerics());
    this.props.dispatch(getGenerics(this.props.uf, this.state.apresentation.id));
    this._rankingView();
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null)
  }

  showCart() {
    this.props.navigation.navigate({ key: 'cart1', routeName: 'Cart', params: {} });
  }

  getCartSize() {
    let cItems = this.props.cartItems;
    return (cItems && cItems.length) ? cItems.length : 0;
  }

  setPlace(place) {
    if (place.place_id) {
      RNGooglePlaces.lookUpPlaceByID(place.place_id).then(result => {
        let latitude = result.location.latitude;
        let longitude = result.location.longitude;

        this.props.dispatch(getGeocodeAddress({ latitude, longitude }));
        this.props.dispatch(updateLocation(this.props.uf, latitude, longitude));
        this._createOrder({ latitude, longitude });
        this.setState({ show_places: false });

      }).catch(error => {
        console.log(error.message);
        Alert.alert("TheFarma", "Não foi possível obter as coordenadas. Verifique sua conexão.",
          [{ text: "OK", onPress: () => { } }],
          { cancelable: false }
        );
      });
    }
  }

  _renderPlaceItem = ({ item }) => (
    <LocationListItem address={item} onPress={() => { this.setPlace(item); }} />
  );

  _rankingView() {
    setTimeout(() => {
      this.props.dispatch(rankingView(this.state.apresentation.id));
    }, 3000);
  }

  getApresentationQuantity(nextProps, apresentation) {
    try {
      const cItem = nextProps.cartItems.find(item => item.id === apresentation.id);
      return cItem ? cItem.quantity : 0;
    } catch (error) {
      return 0;
    }
  }

  getPhoto() {
    let apresentation = this.state.apresentation;
    if (apresentation.imagem && apresentation.imagem !== null && apresentation.imagem !== {}) {
      let imagem = apresentation.imagem
      if (imagem.square_crop) {
        return { uri: imagem.square_crop }
      }
    }
    return imgDefault;
  }

  _addItemToCart(apresentation) {
    this.props.dispatch(addItemToCart({ apresentation }));
  }

  _removeItemToCart(apresentation) {
    this.props.dispatch(removeItemToCart({ apresentation }));
  }

  _showGenerics(generic) {
    this.props.navigation.navigate({ key: `ApresentationDetail${generic.id}`, routeName: 'ApresentationDetail', params: { apresentation: generic } });
  }

  _showDeliveryDialog() { this.setState({ show_delivery_dialog: true }); }

  _renderDeliveryDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => { this.setState({ show_delivery_dialog: false }); }}
        content={
          <View style={styles.containerDelivery}>
            <Text style={styles.titleDialog}>Como deseja obter os seus medicamentos?</Text>
            <View style={styles.row}>
              <ButtonCustom
                image={require("../../assets/images/ic_walking.png")}
                title="Buscar"
                description="Opta em ir buscar seu medicamento em uma farmácia mais próxima."
                onPress={() => { this._showListProposals(); }}
              />
              <ButtonCustom
                image={require("../../assets/images/ic_delivery.png")}
                title="Entregar"
                description="Seu medicamento é entregue em um local de sua escolha."
                onPress={() => { this._showListAddress(); }}
              />
            </View>
          </View>
        }
      />
    )
  }

  _createOrder(coords = {}) {
    let itens = [];
    let order = this.props.order;
    let client = this.props.client;
    let cItems = this.props.cartItems;

    let latitude = coords.latitude || this.props.latitude;
    let longitude = coords.longitude || this.props.longitude;

    if (client) {
      cItems.map(i => { itens.push({ apresentacao: i.id, quantidade: i.quantidade }); });
      order.itens = itens;
      order.latitude = latitude;
      order.longitude = longitude;
      order.delivery = false;
      let params = { client, order };
      this.props.dispatch(createOrder(params));
      this.props.navigation.navigate({ key: "list_proposals1", routeName: "ListProposals", params: {} });
    } else {
      this.props.navigation.navigate({ key: "login1", routeName: "Login", params: { actionBack: "MedicineApresentations" } });
    }
  }

  _showListProposals() {
    let location_permission = this.state.location_permission;
    if (location_permission === 'authorized') {
      this.props.dispatch(getLocation());
      this._createOrder();
    } else {
      this.setState({ show_places: true })
    }
    this.setState({ show_delivery_dialog: false });
  }

  _showListAddress() {
    let key = "login1";
    let routeName = "Login";
    let params = { actionBack: "MedicineApresentations" }

    if (this.props.client) {
      key = "list_address1";
      routeName = "ListAddress";
      params = { showBottomBar: true };
    }

    this.props.navigation.navigate({ key, routeName, params });
    this.setState({ show_delivery_dialog: false });
  }

  renderFooter = () => {
    if (!this.props.isLoading) return null;
    return (
      <View style={{ alignItems: 'center', paddingVertical: 16, }}>
        <ActivityIndicator color={"#00C7BD"} size={"large"} />
      </View>
    );
  };

  _renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <ProductDescription
        apresentation={item}
        onPress={() => { this._showGenerics(item) }}
      />
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {Components.renderIfElse(this.state.show_places,
          <GooglePlaces
            renderPlaceItem={this._renderPlaceItem}
            onBackPress={() => { this.setState({ show_places: false }) }}
          />,
          <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <ScrollView>
              <Header
                title={this.state.apresentation.produto.nome}
                image={this.getPhoto()}
                menuLeft={
                  <MenuItem
                    icon="md-arrow-back"
                    onPress={() => { this.onBack() }}
                    style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                  />
                }
                menuRight={
                  <View style={{ paddingRight: 12 }}>
                    <ShoppingBagIcon value={this.props.cartItems.length} onPress={() => { this.showCart() }} />
                  </View>
                }
              />

              {Components.renderIf(this.state.apresentation,
                <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
                  <ApresentationDetailDescription
                    apresentation={this.state.apresentation}
                    showActions={true}
                    onPressMinus={() => this._removeItemToCart(this.state.apresentation)}
                    onPressPlus={() => this._addItemToCart(this.state.apresentation)}
                  />
                </View>
              )}

              {Components.renderIf(this.props.generics.length > 0,
                <View style={{ marginBottom: 16 }}>
                  <View style={styles.containerLabel}>
                    <Text style={styles.label}>{"Selecione a fabricante"}</Text>
                  </View>

                  <FlatList
                    style={styles.list}
                    horizontal={true}
                    data={this.props.generics}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={this._renderItem}
                    ListFooterComponent={this.renderFooter()}
                  />
                </View>
              )}

              <View style={[styles.containerLabel, { marginTop: 16 }]}>
                <Text style={styles.label}>{"Sobre este medicamento"}</Text>
              </View>

              <View style={styles.table}>
                <Text style={styles.tableLabel} uppercase>
                  {"Princípio Ativo"}
                </Text>
                <Text style={styles.tableValue}>{this.state.apresentation.produto.principio_ativo.nome}</Text>
              </View>

              <View style={[styles.table, { backgroundColor: "#FAFAFA" }]}>
                <Text style={styles.tableLabel} uppercase>
                  {"TIPO"}
                </Text>
                <Text style={styles.tableValue}>{TipoMedicamento[this.state.apresentation.produto.tipo][1]}</Text>
              </View>

              <View style={[styles.table]}>
                <Text style={styles.tableLabel} uppercase>
                  {"Forma Farmacêutica"}
                </Text>
                <Text style={styles.tableValue}>{this.state.apresentation.forma_farmaceutica}</Text>
              </View>

              <View style={[styles.table, { backgroundColor: "#FAFAFA"}]}>
                <Text style={styles.tableLabel} uppercase>
                  {"Quantidade"}
                </Text>
                <Text style={styles.tableValue}>{this.state.apresentation.quantidade_rec}</Text>
              </View>

              <View style={[styles.table, { marginBottom: 120 }]}>
                <Text style={styles.tableLabel} uppercase>
                  {"Código de barras"}
                </Text>
                <Text style={styles.tableValue}>{this.state.apresentation.codigo_barras}</Text>
              </View>

            </ScrollView>

            {Components.renderIf(this.getCartSize() > 0,
              <ViewCartBar  value={this.getCartSize()} onPress={() => {this.showCart()}} />
            )}

            {Components.renderIf(this.state.show_delivery_dialog,
              this._renderDeliveryDialog()
            )}
          </View>
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    uf: state.locations.uf,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,

    client: state.clients.client,
    cartItems: state.carts.cartItems,
    order: state.orders.order,

    generics: state.generics.generics,
    isLoading: state.generics.isLoading,
    nextPage: state.generics.next,
    error: state.generics.error,
  };
}

export default connect(mapStateToProps)(ApresentationDetailScreen);
