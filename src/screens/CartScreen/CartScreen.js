import React, { Component } from "react";
import { NavigationEvents } from 'react-navigation';
import { Alert, View, ScrollView, FlatList } from "react-native";
import { Text, } from "native-base";

import Permissions from "react-native-permissions";
import RNGooglePlaces from "react-native-google-places";

import { connect } from "react-redux";
import { clearApresentations } from "../../actions/apresentations";
import { selectProduct, clearDosages, clearProduct, clearError } from "../../actions/products";
import { createOrderV2 } from "../../actions/orders";
import { addItemToCart, removeItemToCart, addItemToCartV2, removeItemToCartV2, cleanCart } from "../../actions/carts";
import { getLocation, getGeocodeAddress, updateLocation } from "../../actions/locations";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { GooglePlaces } from "../../components/GooglePlaces";
import { ProductDescriptionV2, ProductDescription } from "../../components/Product";
import { LocationListItem } from "../../components/LocationListItem";

import { Components } from "../../helpers";

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
      const cItem = nextProps.cartItems.find(item => item.id === apresentation.id);
      return cItem ? cItem.quantity : 0;
    } catch (error) {
      return 0;
    }
  }

  _addItemToCart(item) {
    if(item.dosage){
      item.quantity = 1;
      this.props.dispatch(addItemToCartV2(item));
    }else{
      this.props.dispatch(addItemToCart({apresentation: item}));
    }
  }

  _removeItemToCart(item) {
    if(item.dosage){
      this.props.dispatch(removeItemToCartV2(item));
    }else{
      this.props.dispatch(removeItemToCart({apresentation: item}));
    }
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
      cItems.map(i => { 
        if(i.dosage){
          itens.push({ apresentacao: i.apresentations[0].id, quantidade: i.quantity, generico: i.generic }); 
        }else{
          itens.push({ apresentacao: i.id, quantidade: i.quantity, generico: false });
        }
      });
      order.itens = itens;
      order.latitude = latitude;
      order.longitude = longitude;
      order.delivery = false;
      let params = { client, order };
      this.props.dispatch(createOrderV2(params));
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

  onSelect = item => {
    this.props.dispatch(clearDosages());
    this.props.dispatch(clearApresentations());
    this.props.dispatch(selectProduct(item.product));
    this.props.navigation.navigate({
      key: "SelectApresentations1",
      routeName: "SelectApresentations",
      params: { title: item.product.nome, product: item.product, item }
    });
  };

  _showProductDetail = item => {
    this.props.navigation.navigate({ key: "apresentation_detail1", routeName: "ApresentationDetail", params: { apresentation: item } });
  }

  _renderItem = ({ item }) => {
    if(item.dosage){
      return( 
        <ProductDescriptionV2
          item={item}
          showActions={true}
          onPressMinus={() => this._removeItemToCart(item)}
          onPressPlus={() => this._addItemToCart(item)}
          onPress={()=>{ this.onSelect(item) }}
        />
      )
    }else{
      return(
        <ProductDescription
          apresentation={item}
          showActions={true}
          onPressMinus={() => this._removeItemToCart(item)}
          onPressPlus={() => this._addItemToCart(item)}
          onPress={()=>{ this._showProductDetail(item) }}
        />
      )
    }    
  }
  
  render() {
    let cItems = this.props.cartItems;
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <NavigationEvents onWillFocus = { payload => this.props.dispatch(clearError()) } />
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
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this._renderItem} />
              </ScrollView>,
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 90 }}>
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: 'rgba(0,0,0,0.48)', textAlign: 'center' }}>{"Cestinha vazia"}</Text>
              </View>
            )}

            {Components.renderIfElse(cItems.length > 0,
              <BottomBar
                buttonTitle="Consultar os Preços"
                buttonStyle={{ width: '100%' }}
                onButtonPress={() => { this._showDeliveryDialog() }}
              />,
              <BottomBar
                buttonTitle="Adicionar Itens"
                buttonStyle={{ width: '100%' }}
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
    
    cartItems: state.carts.cartItems,

    error: state.apresentations.error,
    client: state.clients.client,
    order: state.orders.order,
    errorOrder: state.orders.error
  };
}

export default connect(mapStateToProps)(CartScreen);
