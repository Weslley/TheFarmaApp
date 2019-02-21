import React, { Component } from "react";
import { AsyncStorage, StatusBar, KeyboardAvoidingView, View, TouchableOpacity, Text, Image, Alert, ActivityIndicator, Platform } from "react-native";
import firebase from 'react-native-firebase';

import Snackbar from 'react-native-snackbar';
import Permissions from 'react-native-permissions';

import { connect } from "react-redux";
import { getCurrentClient, setFcmToken } from "../../actions/clients"
import { getNotifications } from "../../actions/notifications"
import { updateLocation, getGeocodeAddress } from "../../actions/locations"

import { Icon } from "../../components/Icon";
import { NotificationItem } from "../../components/NotificationItem";

import styles from "./styles";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: '',
      latitude: null,
      longitude: null,
      error: null,
      bg: null
    }
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {

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

    this.props.dispatch(getCurrentClient());
    setTimeout(() => {
      if (this.props.client) {
        let params = { client: this.props.client, filters: {} }
        this.props.dispatch(getNotifications(params));
      }
    }, 1000);
  }


  componentDidMount() {
    StatusBar.setHidden(true);

    //Seta imagem de background
    this.setState({ bg: this.getBackgroundScreen() });

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

    //Envia FCM Token ao servidor
    this.checkPermission();
    this.createNotificationListeners();
    setTimeout(() => { this.sendFcmToken(); }, 1000)
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken', null);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async sendFcmToken() {
    let client = this.props.client;
    let token = await AsyncStorage.getItem('fcmToken', null);
    console.log(token);
    if (client && token) {
      let params = { client: this.props.client, fields: { fcm: token } }
      this.props.dispatch(setFcmToken(params));
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      //this.showAlert(title, body);
      console.log(notification);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      //this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      //this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  /** Private functions */
  getTitle() {
    let msg = "Bem vindo."
    let now = new Date().getHours();
    if (now >= 6 && now < 12) { msg = `Bom dia`; }
    if (now >= 12 && now < 19) { msg = `Boa tarde`; }
    if (now >= 19 || now < 5) { msg = `Boa noite`; }

    let client = this.props.client;
    let name = client ? client.nome : "";
    name = name.split(" ")[0]
    if (name) msg = `Oi, ${name}`
    return msg;
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

  requestLocationPermission() {
    Permissions.request('location').then(response => {
      if (response === 'authorized') this.getLocation();
      this.setState({ locationPermission: response });
    });
  }

  onSearch = (showCamera) => {
    Permissions.request('location').then(response => {
      if (response === 'authorized') {
        this.getLocation();
      } else {
        this.alertLocation();
      }
    });
    this.props.navigation.navigate('SearchMedicine', { showCamera });
  };

  showCart() {
    this.props.navigation.navigate({ key: 'cart1', routeName: 'Cart', params: { title: "Cestinha" } });
  }

  showMenuScreen() {
    this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: {} });
  }

  getPhoto() {
    let client = this.props.client;
    if (client && client.foto) {
      return { uri: client.foto }
    }
    return null;
  }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.nextPage) {
      let params = { client: this.props.client, url: this.props.nextPage }
      this.props.dispatch(getApresentationsNextPage(params));
    }
  }

  _renderItem = ({ item }) => (<NotificationItem notificacao={item} />);

  renderFooter = () => {
    if (!this.props.isLoading) return null;
    return (
      <View style={{ alignItems: 'center', paddingVertical: 16, }}>
        <ActivityIndicator color={"#00C7BD"} size={"large"} />
      </View>
    );
  };

  getBackgroundScreen() {
    let index = Math.floor(Math.random() * 3) + 1
    switch (index) {
      case 1:
        return require("../../assets/images/bg1.jpg");
      case 2:
        return require("../../assets/images/bg2.jpg");
      case 3:
        return require("../../assets/images/bg3.jpg");
      default:
        return require("../../assets/images/bg1.jpg");
    }
  }

  render() {
    let state = this.state;
    console.log("Render -> Home", state);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>

        <Image
          resizeMode={"cover"}
          style={styles.background}
          source={state.bg} />

        <View style={{ paddingHorizontal: 22, marginBottom: 8, position: "absolute", left: 0, right: 0, top: 200, zIndex: 1000 }}>
          <Text style={styles.title}>{this.getTitle()}</Text>
          <Text style={styles.subtitle}>{"Deseja algum medicamento?"}</Text>
          <TouchableOpacity style={[styles.searchBar, { justifyContent: 'space-between' }]} onPress={() => { this.onSearch(false) }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="search" size={24} color={"#FFF"} style={[{ marginRight: 12 }]} />
              <Text style={[styles.subtitle, Platform.OS === "ios" ? { fontSize: 12 } : {}]}>Nome do medicamento</Text>
            </View>
            <TouchableOpacity style={{ alignSelf: 'flex-end', }} onPress={() => { this.onSearch(true) }}>
              <Icon name="barcode" size={24} color={"#000"} style={styles.icon} />
            </TouchableOpacity>
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

    notifications: state.notifications.notifications,
    loading: state.notifications.loading,
    nextPage: state.notifications.next,
    error: state.notifications.error,
  };
}

export default connect(mapStateToProps)(WelcomeScreen);
