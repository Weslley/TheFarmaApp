import React, { Component } from "react";
import { Alert, View, ScrollView, FlatList } from "react-native";
import { Text, } from "native-base";

import Permissions from "react-native-permissions";
import RNGooglePlaces from "react-native-google-places";

import { connect } from "react-redux";

import { createOrder } from "../../actions/orders";
import { addItemToCart, removeItemToCart, cleanCart } from "../../actions/carts";
import { getLocation, getGeocodeAddress, updateLocation } from "../../actions/locations";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { GooglePlaces } from "../../components/GooglePlaces";
import { ProductDescription } from "../../components/Product";
import { LocationListItem } from "../../components/LocationListItem";

import { Components, CartUtils } from "../../helpers";

import styles from "./styles";

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      places: [],
      show_places: false,
      show_delivery_dialog: false,
      location_permission: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    Permissions.check("location").then(response => {
      this.setState({ location_permission: response });
      if (response === "authorized") {
        this.props.dispatch(getLocation());
      }
    });
  }

  componentDidMount() {
    if (this.props.cartItems.length > 0) {
      this.setState({ cartItems: this.props.cartItems, showBottomBar: true });
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ cartItems: this.props.cartItems });
    const cartItems = nextProps.cartItems.map(apresentation => ({
      ...apresentation,
      quantidade: this.getApresentationQuantity(nextProps, apresentation)
    }));
    this.setState({ cartItems });
  };

  /** Private functions */
  onBack = () => {
    this.props.navigation.goBack(null);
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

  onClearCart = () => {
    Alert.alert(
      '',
      'Você gostaria de limpar a cestinha?',
      [
        { text: 'NÃO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'SIM', onPress: () => { this.props.dispatch(cleanCart()) } },
      ],
      { cancelable: false }
    )
  }

  getApresentationQuantity(nextProps, apresentation) {
    try {
      const cItem = nextProps.cartItems.find(
        item => item.id === apresentation.id
      );
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

  _showSearchMedicine() {
    this.props.navigation.navigate({ key: 'search_medicine1', routeName: 'SearchMedicine', params: {} });
  }

  _showDeliveryDialog() {
    this.setState({ show_delivery_dialog: true });
  }

  _renderDeliveryDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => { this.setState({ show_delivery_dialog: false }); }}
        content={
          <View style={styles.containerDelivery}>
            <Text style={styles.titleDialog}>Como deseja obter os seus medicamentos?</Text>
            <View style={styles.row}>
              <ButtonCustom
                style={{ width: '48%' }}
                image={require("../../assets/images/ic_walking.png")}
                title="Buscar"
                description="Opta em ir buscar seu medicamento em uma farmácia mais próxima."
                onPress={() => { this._showListProposals(); }}
              />
              <ButtonCustom
                style={{ width: '48%' }}
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

  _renderItem = ({ item }) => (
    <ProductDescription
      apresentation={item}
      showActions={true}
      onPressMinus={() => this._removeItemToCart(item)}
      onPressPlus={() => this._addItemToCart(item)}
    />
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
              title={"Cestinha"}
              menuLeft={
                <MenuItem
                  icon="md-arrow-back"
                  onPress={() => { this.onBack() }}
                  style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                />
              }
              menuRight={
                <MenuItem
                  icon="trash"
                  onPress={() => { this.onClearCart() }}
                  style={{ paddingRight: 24, paddingVertical: 12 }}
                />
              }
            />

            {Components.renderIfElse(this.state.cartItems.length > 0,
              <ScrollView style={{ paddingHorizontal: 24 }}>
                <FlatList
                  style={{ paddingBottom: 90 }}
                  data={this.state.cartItems}
                  keyExtractor={item => item.id.toString()}
                  renderItem={this._renderItem} />
              </ScrollView>,
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 90 }}>
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: 'rgba(0,0,0,0.48)', textAlign: 'center' }}>{"Cestinha vazia"}</Text>
              </View>
            )}

            {Components.renderIfElse(cItems.length > 0,
              <BottomBar
                buttonTitle="Ver propostas"
                price={CartUtils.getValueTotal(cItems)}
                onButtonPress={() => { this._showDeliveryDialog() }}
              />,
              <BottomBar
                buttonTitle="Adicionar"
                price={0}
                onButtonPress={() => { this._showSearchMedicine() }}
              />
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
    selected: state.products.selected,
    isLoading: state.products.isLoading,
    apresentations: state.apresentations.apresentations,
    cartItems: state.carts.cartItems,
    error: state.apresentations.error,
    client: state.clients.client,
    order: state.orders.order,
    errorOrder: state.orders.error
  };
}

export default connect(mapStateToProps)(CartScreen);
