import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from "react-redux";


import { logout } from "../../actions/clients";
import { getCities } from "../../actions/cities";
import { getDistricts } from "../../actions/districts";
import { createOrder } from "../../actions/orders";
import { selectAddress, getAddresses, clearError, clearAddresses, removeAddress } from "../../actions/addresses"

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { Container } from '../../layout/Container';

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { AddressAdapter } from "../../components/Address/";
import { ButtonCustom } from "../../components/ButtonCustom";

import { Components } from "../../helpers";
import styles from "./styles";

class ListAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBottomBar: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    let { state: { params } } = navigation;
    return {
      header: () => (
        <Header
          title={"Meus Endereços"}
          subtitle={"Seus endereços para futuras entregas"}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => { navigation.goBack(null) }}
            />
          }
          menuRight={
            <MenuItem
              icon="add-circle"
              onPress={() => { navigation.navigate("NewAddress") }}
            />
          }
        />
      )
    };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error && nextProps.error.response && (nextProps.error.response.status == 400 || nextProps.error.response.status == 401)) {
        if (nextProps.error.response.data.detail) {

          if (nextProps.error.response.data.detail === "Token inválido.") {
            this.props.dispatch(clearError());
            this.props.dispatch(logout());
          }

          Snackbar.show({
            title: nextProps.error.response.data.detail,
            duration: Snackbar.LENGTH_SHORT,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(getAddresses({ client: this.props.client }));

    if (this.props.cities.length > 0) {
      this.props.cities.map((c) => {
        return this.props.dispatch(getDistricts(c.ibge));
      })
    }
  }

  componentDidMount() {
    let { state: { params } } = this.props.navigation;
    if (params && params.showBottomBar){
      this.setState({ showBottomBar: true })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  /** Private functions */
  _removeAddress(address) {
    let params = { client: this.props.client, address }
    this.props.dispatch(removeAddress(params));
    this.props.dispatch(getAddresses({ client: this.props.client }));
  }

  _showUpdateAddress(address) {
    this.props.navigation.navigate("NewAddress", { address });
  }

  _renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => { this._selectAddress(item) }} style={styles.rowFront} underlayColor={'#F6F6F6'}>
      <AddressAdapter address={item} checked={(this.props.address && item.id === this.props.address.id)} />
    </TouchableHighlight>
  );

  _selectAddress(address) {
    console.log(address);
    this.props.dispatch(selectAddress(address))
  }

  _renderActions = (data) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => { this._showUpdateAddress(data.item) }} >
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
        this.props.navigation.navigate("ListProposals");
      } else {
        Snackbar.show({ title: "Selecione um endereço", duration: Snackbar.LENGTH_SHORT });
      }
    } else {
      this.props.navigation.navigate("Profile");
    }
    this.setState({ showDeliveryDialog: false });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>

        <View style={{ backgroundColor: "#FFFFFF" }}>
          <ScrollView>
            <SwipeListView
              useFlatList
              data={this.props.addresses}
              keyExtractor={item => item.id.toString()}
              renderItem={this._renderItem}
              renderHiddenItem={this._renderActions}
              rightOpenValue={-150}
            />
          </ScrollView>
        </View>

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
    cities: state.cities.cities,
    districts: state.districts.districts,
    addresses: state.addresses.addresses,
    address: state.addresses.address,
    error: state.addresses.error,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,
    cartItems: state.carts.cartItems,
    client: state.clients.client,
    order: state.orders.order,
    errorOrder: state.orders.error
  };
}

export default connect(mapStateToProps)(ListAddressScreen);
