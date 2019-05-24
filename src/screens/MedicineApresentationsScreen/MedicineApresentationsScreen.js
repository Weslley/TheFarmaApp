import React, { Component } from "react";
import { Alert, View, Text, ScrollView, ActivityIndicator, FlatList } from "react-native";

import Snackbar from "react-native-snackbar";
import Permissions from "react-native-permissions";
import RNGooglePlaces from "react-native-google-places";

import { connect } from "react-redux";

import { createOrder } from "../../actions/orders";
import { getLocation, getGeocodeAddress, updateLocation } from "../../actions/locations";
import { addItemToCart, removeItemToCart } from "../../actions/carts";
import { getApresentations, getApresentationsNextPage, clearError } from "../../actions/apresentations";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { Loading } from "../../components/Loading";
import { MenuItem } from "../../components/MenuItem";
import { ButtonCustom } from "../../components/ButtonCustom";
import { ApresentationDescription } from "../../components/Product";;

import { GooglePlaces } from "../../components/GooglePlaces";
import { LocationListItem } from "../../components/LocationListItem";

import { Components, CartUtils } from "../../helpers";
import styles from "./styles";

class MedicineApresentationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      apresentations: [],
      show_places: false,
      show_delivery_dialog: false,
      location_permission: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {

      if (nextProps && nextProps.error) {
        let error = nextProps.error;

        if (error.response && (error.response.status >= 400 && error.response.status <= 403)) {
          if (error.response.data.detail) {
            <Header
              title={this.props.selected.nome}
              style={{ backgroundColor: "#FFF" }}
              menuLeft={
                <MenuItem
                  icon="md-arrow-back"
                  onPress={() => { this.onBack(); }}
                  style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                />
              }
              menuRight={
                <View style={{ paddingRight: 12 }}>
                  <ShoppingBagIcon
                    value={this.getCartSize()}
                    onPress={() => { this.showCart(); }}
                  />
                </View>
              }
            />
            Snackbar.show({ title: error.response.data.detail, duration: Snackbar.LENGTH_SHORT, });
            return;
          }
          Snackbar.show({ title: nextProps.error.message, duration: Snackbar.LENGTH_SHORT });
        }

        if (error.response && (error.response.status >= 500 && error.response.status <= 504)) {
          Snackbar.show({ title: "Erro ao conectar com o servidor!", duration: Snackbar.LENGTH_SHORT });
        }

        if (error.message && error.message === "Network Error") {
          Snackbar.show({ title: "Sem conexão com a internet", duration: Snackbar.LENGTH_SHORT });
        }
      }

      this.setState({ apresentations: this.props.apresentations });

      const apresentations = nextProps.apresentations.map(apresentation => ({
        ...apresentation,
        quantidade: this.getApresentationQuantity(nextProps, apresentation)
      }));

      this.setState({ apresentations });

      if (nextProps.nextPage !== null) {
        setTimeout(() => { this.onEndReached(0); }, 500);
      }

    } catch (error) {
      Snackbar.show({ title: e.message, duration: Snackbar.LENGTH_SHORT });
    }
  };

  componentWillMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(getApresentations(this.props.uf, this.props.selected.nome));

    Permissions.check("location").then(response => {
      this.setState({ location_permission: response });
      if (response === "authorized") {
        this.props.dispatch(getLocation());
      }
    });
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  setPlace(place) {
    if (place.place_id) {
      RNGooglePlaces.lookUpPlaceByID(place.place_id).then(result => {
        let latitude = result.location.latitude;
        let longitude = result.location.longitude;

        this.props.dispatch(getGeocodeAddress({latitude, longitude}));
        this.props.dispatch(updateLocation(this.props.uf, latitude, longitude));
        this._createOrder({ latitude, longitude });
        this.setState({show_places: false});

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

  showCart() {
    this.props.navigation.navigate({ key: "cart1", routeName: "Cart", params: {} });
  }

  getCartSize() {
    let cItems = this.props.cartItems;
    return (cItems && cItems.length) ? cItems.length : 0;
  }

  getApresentationQuantity(nextProps, apresentation) {
    try {
      const cItem = nextProps.cartItems.find(item => item.id === apresentation.id);
      return cItem ? cItem.quantidade : 0;
    } catch (error) {
      return 0;
    }
  }

  _addItemToCart(apresentation) {
    this.props.dispatch(addItemToCart(apresentation));
  }

  _removeItemToCart(apresentation) {
    this.props.dispatch(removeItemToCart(apresentation));
  }

  _showDeliveryDialog() {
    this.setState({ show_delivery_dialog: true });
  }

  _showGooglePlaces() {
    this.setState({ show_places: true });
  }

  _renderDeliveryDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => {
          this.setState({ show_delivery_dialog: false });
        }}
        content={
          <View style={styles.containerDelivery}>
            <Text style={styles.titleDialog}>{"Como deseja obter os seus medicamentos?"}</Text>
            <View style={styles.row}>
              <ButtonCustom
                image={require("../../assets/images/ic_walking.png")}
                title="Buscar"
                description="Opta em ir buscar seu medicamento em uma farmácia mais próxima."
                onPress={() => {
                  this._showListProposals();
                }}
              />
              <ButtonCustom
                image={require("../../assets/images/ic_delivery.png")}
                title="Entregar"
                description="Seu medicamento é entregue em um local de sua escolha."
                onPress={() => {
                  this._showListAddress();
                }}
              />
            </View>
          </View>
        }
      />
    );
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
      this.props.navigation.navigate({ key: "profile1", routeName: "Profile", params: { actionBack: "MedicineApresentations" } });
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
    let key = "profile1";
    let routeName = "Profile";
    let params = { actionBack: "MedicineApresentations" }

    if (this.props.client) {
      key = "list_address1";
      routeName = "ListAddress";
      params = { showBottomBar: true };
    }

    this.props.navigation.navigate({ key, routeName, params });
    this.setState({ show_delivery_dialog: false });
  }

  _showProductDetail(item) {
    this.props.navigation.navigate({ key: "apresentation_detail1", routeName: "ApresentationDetail", params: { apresentation: item } });
  }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.nextPage) {
      let params = { client: this.props.client, url: this.props.nextPage };
      this.props.dispatch(getApresentationsNextPage(params));
    }
  };

  _renderItem = ({ item }) => (
    <ApresentationDescription
      apresentation={item}
      showActions={true}
      onPress={() => { this._showProductDetail(item); }}
      onPressMinus={() => this._removeItemToCart(item)}
      onPressPlus={() => this._addItemToCart(item)}
    />
  );

  renderFooter = () => {
    if (!this.props.loading) return null;
    return (
      <View style={{ alignItems: "center", paddingVertical: 16 }}>
        <ActivityIndicator color={"#00C7BD"} size={"large"} />
      </View>
    );
  };

  _renderPlaceItem = ({ item }) => (
    <LocationListItem address={item} onPress={() => { this.setPlace(item) }} />
  );

  render() {
    let cItems = this.props.cartItems;
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {Components.renderIfElse(this.state.show_places,
          <GooglePlaces
            renderPlaceItem={this._renderPlaceItem}
            onBackPress={() => { this.setState({ show_places: false }) }}
          />,
          <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <Header
              title={this.props.selected.nome}
              style={{ backgroundColor: "#FFF" }}
              menuLeft={
                <MenuItem
                  icon="md-arrow-back"
                  onPress={() => { this.onBack(); }}
                  style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                />
              }
              menuRight={
                <View style={{ paddingRight: 12 }}>
                  <ShoppingBagIcon
                    value={this.getCartSize()}
                    onPress={() => { this.showCart(); }}
                  />
                </View>
              }
            />

            {Components.renderIfElse(
              this.props.apresentations &&
              this.props.apresentations.length === 0 &&
              this.props.loading === true,
              <Loading />,
              <ScrollView
                style={{ paddingHorizontal: 24 }}
                onScroll={e => {
                  let paddingToBottom = 0;
                  paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                  if (
                    e.nativeEvent.contentOffset.y.toFixed(1) ===
                    (e.nativeEvent.contentSize.height - paddingToBottom).toFixed(1)
                  ) {
                    this.onEndReached(0);
                  }
                }}
              >
                <FlatList
                  style={{ paddingBottom: 90 }}
                  data={this.state.apresentations}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={this._renderItem}
                  ListFooterComponent={this.renderFooter()}
                />
              </ScrollView>
            )}

            {Components.renderIf(this.state.show_delivery_dialog, this._renderDeliveryDialog())}

            {Components.renderIf(cItems.length > 0,
              <BottomBar
                buttonTitle="Ver propostas"
                price={CartUtils.getValueTotal(cItems)}
                onButtonPress={() => { this._showDeliveryDialog(); }}
              />
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
    selected: state.products.selected,
    client: state.clients.client,
    cartItems: state.carts.cartItems,
    order: state.orders.order,

    apresentations: state.apresentations.apresentations,
    loading: state.apresentations.isLoading,
    nextPage: state.apresentations.next,
    error: state.apresentations.error
  };
}

export default connect(mapStateToProps)(MedicineApresentationScreen);
