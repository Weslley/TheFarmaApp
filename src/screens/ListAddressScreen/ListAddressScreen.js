import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from "react-redux";
import { logout } from "../../actions/clients";
import { getAddresses, clearError, clearAddresses, removeAddress } from "../../actions/addresses"
import { getCities } from "../../actions/cities";
import { getDistricts } from "../../actions/districts";

import { Icon } from "../../components/Icon";
import { Header } from "../../layout/Header";
import { Container } from '../../layout/Container';
import { MenuItem } from "../../components/MenuItem";
import { AddressAdapter } from "../../components/Address/";

import styles from "./styles";

class ListAddressScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    //this.props.dispatch(clearAddresses());
    this.props.dispatch(getAddresses({ client: this.props.client }));
    this.props.dispatch(getCities());
  }

  componentDidMount() {
    if (this.props.cities.length > 0) {
      this.props.cities.map((c) => {
        return this.props.dispatch(getDistricts(c.ibge));
      })
    }
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  /** Private functions */
  _removeAddress(address) {
    let params = { client: this.props.client, address }
    this.props.dispatch(removeAddress(params));
  }

  _showUpdateAddress(address) {
    this.props.navigation.navigate("NewAddress", { address });
  }

  _renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => { }} style={styles.rowFront} underlayColor={'#F6F6F6'}>
      <AddressAdapter address={item} checked={true} />
    </TouchableHighlight>
  );

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

  render() {
    return (
      <View style={{ backgroundColor: "#FFFFFF" }}>
        <SwipeListView
          useFlatList
          data={this.props.addresses}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderItem}
          renderHiddenItem={this._renderActions}
          rightOpenValue={-150}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cities: state.cities.cities,
    districts: state.districts.districts,
    client: state.clients.client,
    addresses: state.addresses.addresses,
    address: state.addresses.address,
    error: state.addresses.error
  };
}

export default connect(mapStateToProps)(ListAddressScreen);
