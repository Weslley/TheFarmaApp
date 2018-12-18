import React, { Component } from "react";
import { NavigationActions } from 'react-navigation';
import { AsyncStorage, StatusBar, KeyboardAvoidingView, ScrollView, View, TouchableOpacity, Text, Image, Alert, ActivityIndicator, FlatList, Platform } from "react-native";
import firebase from 'react-native-firebase';
//import FCM, { FCMEvent, NotificationActionType } from "react-native-fcm";

import Snackbar from 'react-native-snackbar';
import Permissions from 'react-native-permissions';

import { connect } from "react-redux";
import { getCurrentClient, setFcmToken } from "../../actions/clients"
import { getNotifications, getNotificationsNextPage } from "../../actions/notifications"
import { updateLocation, getGeocodeAddress } from "../../actions/locations"

import { Header } from "../../layout/Header";
import { Container } from "../../layout/Container";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading"
import { NotificationItem } from "../../components/NotificationItem";

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
    this.checkPermission();
    this.createNotificationListeners();
    //Envia FCM Token ao servidor
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
    console.log(fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
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
        this.props.navigation.navigate({ key: 'search_medicine1', routeName: 'SearchMedicine', params: { showCamera } });
      } else {
        this.alertLocation();
      }
    });
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

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>

        {Components.renderIf(this.props.notifications && this.props.notifications.length === 0,
          <Image
            resizeMode={"cover"}
            style={styles.background}
            source={require("../../assets/images/background-home.png")} />
        )}

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

        <View style={{ paddingHorizontal: 22, marginBottom: 8, }}>
          <TouchableOpacity style={styles.searchBar} onPress={() => { this.onSearch(false) }}>
            <Image source={require("../../assets/images/ic_search.png")} style={[styles.icon, { marginRight: 12 }]} />
            <Text style={[styles.text, Platform.OS === "ios" ? { fontSize: 12 } : {}]}>Qual medicamento você deseja?</Text>
            <TouchableOpacity style={{ alignSelf: 'flex-end', }} onPress={() => { this.onSearch(true) }}>
              <Icon name="barcode" size={24} color={"#000"} style={styles.icon} />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        {Components.renderIfElse(this.props.notifications && this.props.notifications.length === 0 && this.props.loading === true,
          <Loading />,
          <ScrollView style={{ paddingHorizontal: 24 }}
            onScroll={(e) => {
              let paddingToBottom = 0;
              paddingToBottom += e.nativeEvent.layoutMeasurement.height;
              if (e.nativeEvent.contentOffset.y.toFixed(1) === (e.nativeEvent.contentSize.height - paddingToBottom).toFixed(1)) {
                this.onEndReached(0)
              }
            }}
          >
            <FlatList
              data={this.props.notifications}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={this._renderItem}
              ListFooterComponent={this.renderFooter()}
            />

          </ScrollView>
        )}

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
