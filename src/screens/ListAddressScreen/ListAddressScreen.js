import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from "react-redux";
import { logout } from "../../actions/clients";
import { getCities } from "../../actions/cities";
import { createOrder } from "../../actions/orders";
import { updateLocation, getGeocodeAddress } from "../../actions/locations"
import { selectAddress, getAddresses, clearError, clearAddresses, removeAddress } from "../../actions/addresses"

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { Container } from '../../layout/Container';

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading";
import { MenuItem } from "../../components/MenuItem";
import { AddressAdapter } from "../../components/Address/";
import { ButtonCustom } from "../../components/ButtonCustom";

import { Components } from "../../helpers";
import styles from "./styles";

class ListAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBottomBar: false,
      scroll: true
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.detail) {
            if (nextProps.error.response.data.detail === "Token inválido.") {
              this.props.dispatch(clearError());
              this.props.dispatch(logout());
            }
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(getAddresses({ client: this.props.client }));
    this.getLocation();
  }

  componentDidMount() {
    let { state: { params } } = this.props.navigation;
    if (params && params.showBottomBar) {
      this.setState({ showBottomBar: true })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  _removeAddress(address) {
    let params = { client: this.props.client, address }
    this.props.dispatch(removeAddress(params));

    setTimeout(() => { this.props.dispatch(getAddresses({ client: this.props.client })); }, 1000);
  }

  _showAddress(address) {
    let p_address = this.props.currenty_address;
    if (address !== null) p_address = address;
    this.props.navigation.navigate({ key: 'new_address1', routeName: 'NewAddress', params: { address: p_address } });
  }

  getLocation() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.props.dispatch(updateLocation(this.props.uf, position.coords.latitude, position.coords.longitude));
      this.props.dispatch(getGeocodeAddress(position.coords));
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.rowFront}
      onPress={() => { this._selectAddress(item) }}>

      <AddressAdapter
        address={item}
        checked={(this.props.address && item.id === this.props.address.id)} />

    </TouchableOpacity>
  );

  _selectAddress(address) {
    this.props.dispatch(selectAddress(address))
  }

  _renderActions = (data) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => { this._showAddress(data.item) }} >
          <Icon name="edit" size={24} style={{ color: "#FFF" }} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => { this._removeAddress(data.item) }} >
          <Icon name="trash" size={24} style={{ color: "#FFF" }} />
        </TouchableOpacity>
      </View>
    );
  };

  _showListProposals() {
    if (this.props.client) {
      if (this.props.address) {
        let order = this.props.order;
        let itens = []
        this.props.cartItems.map((item) => { itens.push({ apresentacao: item.id, quantidade: item.quantidade }) })
        order.itens = itens
        order.latitude = this.props.latitude;
        order.longitude = this.props.longitude;
        order.endereco = this.props.address.id;
        order.delivery = true;
        let params = { client: this.props.client, order: order }
        this.props.dispatch(createOrder(params));
        this.props.navigation.navigate({ key: 'list_proposals1', routeName: 'ListProposals', params: {} });
      } else {
        Snackbar.show({ title: "Selecione um endereço", duration: Snackbar.LENGTH_SHORT });
      }
    } else {
      this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: {} });
    }
    this.setState({ showDeliveryDialog: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#FFFFFF" }}>

          <Header
            title={"Meus Endereços"}
            subtitle={"Seus endereços para futuras entregas"}
            menuLeft={
              <MenuItem
                icon="md-arrow-back"
                onPress={() => { this.onBack() }}
                style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
              />
            }
            menuRight={
              <MenuItem
                icon="add-circle"
                onPress={() => { this._showAddress(null) }}
                style={{ paddingRight: 24, paddingVertical: 12 }}
              />
            }
          />

          <ScrollView>
            <SwipeListView
              scrollEnabled={this.state.scroll}
              onRowOpen={() => this.setState({ scroll: false })}
              onRowDidClose={() => this.setState({ scroll: true })}
              useFlatList
              disableRightSwipe={true}
              data={this.props.addresses}
              keyExtractor={item => item.id.toString()}
              renderItem={this._renderItem}
              renderHiddenItem={this._renderActions}
              rightOpenValue={-150}
            />
          </ScrollView>
        </View>

        {Components.renderIf(this.props.addresses && this.props.addresses.length === 0 && this.props.isLoading === true, <Loading />)}

        {Components.renderIf(this.state.showBottomBar,
          <BottomBar
            buttonTitle="Continuar"
            onButtonPress={() => { this._showListProposals() }}
          />
        )}

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    address: state.addresses.address,
    addresses: state.addresses.addresses,
    isLoading: state.addresses.isLoading,
    error: state.addresses.error,    

    cities: state.cities.cities,
    districts: state.districts.districts,

    currenty_address: state.locations.address,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,

    cartItems: state.carts.cartItems,
    client: state.clients.client,
    order: state.orders.order,
    errorOrder: state.orders.error
  };
}

export default connect(mapStateToProps)(ListAddressScreen);
