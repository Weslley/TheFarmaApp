import React, { Component } from "react";
import { NavigationActions } from 'react-navigation';
import { StatusBar, KeyboardAvoidingView, View, TouchableOpacity, Image, Alert } from "react-native";
import { Text, Button } from "native-base";

import Snackbar from 'react-native-snackbar';
import Permissions from 'react-native-permissions';

import { connect } from "react-redux";
import { getCurrentClient } from "../../actions/clients"
import { getLocation, updateLocation, getGeocodeAddress } from "../../actions/locations"

import { Header } from "../../layout/Header";
import { Container } from "../../layout/Container";

import { Icon } from "../../components/Icon";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { Components } from "../../helpers";
import styles from "./styles";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: '',
      latitude: null,
      longitude: null,
      error: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {

      if (this.props.client) {
        if (!this.props.client.nome && nextProps.client && nextProps.client.nome === '') {
          const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ key: 'name1', routeName: 'Name', params: {} })],
          });
          this.props.navigation.dispatch(resetAction);
        }
      }

      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
        }

        if (nextProps.error.message && nextProps.error.message === 'Network Error') {
          this.setState({ showError: true });
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.props.dispatch(getCurrentClient());
    Permissions.checkMultiple(['camera', 'photo', 'location']).then(response => {
      this.setState({ cameraPermission: response.camera, photoPermission: response.photo, locationPermission: response.location });
    });

    let params = this.props.navigation.state.params;
    let actionBack = params ? params.actionBack : null;
    if (actionBack) {
      switch (actionBack) {
        case 'MedicineApresentations':
          this.props.navigation.navigate({ key: 'MedicineApresentations1', routeName: 'MedicineApresentations' });
          break;
        case 'ApresentationDetail':
          this.props.navigation.navigate({ key: 'cart1', routeName: 'Cart' });
          break;
        case 'Cart':
          this.props.navigation.navigate({ key: 'cart1', routeName: 'Cart' });
          break;
        case 'ListOrders':
          this.props.navigation.navigate({ key: 'list_orders1', routeName: 'ListOrders' });
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    if (this.state.locationPermission === 'authorized') {
      this.getLocation();
    } else {
      Permissions.request('location').then(response => {
        this.setState({ locationPermission: response });
        if (response === 'authorized') {
          this.getLocation();
        }
      });
    }
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  /** Private functions */
  getTitle() {
    let msg = "Bom dia"
    let now = new Date().getHours();
      if (now >= 6 && now < 12) { msg = `Bom dia`; }
      if (now >= 12 && now < 19) { msg = `Boa tarde`; }
      if (now >= 19 || now < 5) { msg = `Boa noite`; }

    let clientName = this.props.client ? this.props.client.nome : "";
    clientName = clientName.split(" ")[0]
    if (clientName) msg = msg + `, ${clientName}`
    return msg;
  }

  getLocation() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.props.dispatch(updateLocation(this.props.uf, position.coords.latitude, position.coords.longitude));
      this.props.dispatch(getGeocodeAddress(position.coords.latitude, position.coords.longitude));
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  alertLocation() {
    Alert.alert(
      '',
      'Para lhe oferecer as melhores propostas o TheFarma requer acesso a sua localização?',
      [
        { text: 'NÃO', onPress: () => { console.log('cancelou.'); } },
        { text: 'SIM', onPress: () => { this.requestLocationPermission() } },
      ],
      { cancelable: false }
    )
  }

  requestLocationPermission(){
    Permissions.request('location').then(response => {
      if (response === 'authorized') this.getLocation();
      this.setState({ locationPermission: response });
    });
  }

  onSearch = () => {
    this.getLocation();
    this.props.navigation.navigate({ key: 'search_medicine1', routeName: 'SearchMedicine', params: {} });
  };

  showCart() {
    this.props.navigation.navigate({ key: 'cart1', routeName: 'Cart', params: { title: "Cestinha" } });
  }

  showMenuScreen() {
    this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: {} });
  }

  getPhoto() {
    if (this.props.client && this.props.client.foto) {
      return { uri: this.props.client.foto }
    } else {
      return require("../../assets/images/avatar.png");
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Image
          resizeMode={"cover"}
          style={styles.background}
          source={require("../../assets/images/background-home.png")} />

        <Header
          style={{ paddingHorizontal: 24, backgroundColor: "transparent" }}
          title={this.getTitle()}
          menuLeft={
            <View style={{ paddingLeft: 24, }}>
              <Image source={require('../../assets/images/logo.png')} style={{ width: 50, height: 50 }} />
            </View>
          }
          menuRight={
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => { this.showMenuScreen() }} style={{ padding: 12, }}>
                <View style={styles.avatarContainer}>
                  {Components.renderIfElse(this.props.client && this.props.client.foto !== null,
                    <Image style={styles.avatar} resizeMode="contain" source={this.getPhoto()} />,
                    <Icon name="md-person" color={"#000"} size={16} style={{ width: 16, height: 16, textAlign: 'center' }} />
                  )}
                </View>
              </TouchableOpacity>
              <View style={{ paddingRight: 12 }}>
                <ShoppingBagIcon value={this.props.cartItems.length} onPress={() => { this.showCart() }} />
              </View>
            </View>
          }
        />

        <View style={{ paddingHorizontal: 24 }}>
          <TouchableOpacity style={styles.searchBar} onPress={() => { this.onSearch() }}>
            <Image source={require("../../assets/images/ic_search.png")} style={styles.icon} />
            <Text style={styles.text}>Qual medicamento você deseja?</Text>
            <Icon name="barcode" size={24} color={"#000"} style={styles.icon} />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    cartItems: state.carts.cartItems,

    latitude: state.locations.latitude,
    longitude: state.locations.longitude,
    uf: state.locations.uf,
  };
}

export default connect(mapStateToProps)(WelcomeScreen);
