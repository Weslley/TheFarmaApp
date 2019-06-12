import React, { Component } from "react";
import { NavigationEvents } from "react-navigation";
import { StatusBar, KeyboardAvoidingView, View, TouchableOpacity, Text, Image, Alert, ActivityIndicator, Platform } from "react-native";

import firebase from "react-native-firebase";
import type { Notification, NotificationOpen } from "react-native-firebase";

import Snackbar from "react-native-snackbar";
import Permissions from "react-native-permissions";
import LinearGradient from "react-native-linear-gradient";
import Geolocation from "react-native-geolocation-service";
import AsyncStorage from "@react-native-community/async-storage";

import { connect } from "react-redux";
import { getCurrentClient, setFcmToken } from "../../actions/clients";
import { getNotifications } from "../../actions/notifications";
import { updateLocation, getGeocodeAddress } from "../../actions/locations";

import { Icon } from "../../components/Icon";
import { NotificationItem } from "../../components/NotificationItem";

import styles from "./styles";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationPermission: "",
      latitude: null,
      longitude: null,
      error: null,
      bg: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (
          nextProps.error.response &&
          (nextProps.error.response.status >= 400 &&
            nextProps.error.response.status <= 403)
        ) {
          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({
              title: nextProps.error.response.data.non_field_errors[0],
              duration: Snackbar.LENGTH_SHORT
            });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({
              title: nextProps.error.response.data.detail,
              duration: Snackbar.LENGTH_SHORT
            });
          }
        }

        if (
          nextProps.error.message &&
          nextProps.error.message === "Network Error"
        ) {
          this.setState({ showError: true });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentWillMount() {

    Permissions.checkMultiple(["camera", "photo", "location"]).then(
      response => {
        this.setState({
          cameraPermission: response.camera,
          photoPermission: response.photo,
          locationPermission: response.location
        });
      }
    );

    let params = this.props.navigation.state.params;
    let actionBack = params ? params.actionBack : null;

    if (actionBack) {
      switch (actionBack) {
        case "MedicineApresentations":
          this.props.navigation.navigate({
            key: "MedicineApresentations1",
            routeName: "MedicineApresentations"
          });
          break;
        case "ApresentationDetail":
          this.props.navigation.navigate({ key: "cart1", routeName: "Cart" });
          break;
        case "Cart":
          this.props.navigation.navigate({ key: "cart1", routeName: "Cart" });
          break;
        case "ListOrders":
          this.props.navigation.navigate({
            key: "list_orders1",
            routeName: "ListOrders"
          });
          break;
        default:
          break;
      }
    }

    this.props.dispatch(getCurrentClient());

    setTimeout(() => {
      if (this.props.client) {
        let params = { client: this.props.client, filters: {} };
        this.props.dispatch(getNotifications(params));
      }
    }, 1000);

  }

  componentDidMount() {
    StatusBar.setHidden(false);
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setBarStyle("light-content");

    //Seta imagem de background
    this.setState({ bg: this.getBackgroundScreen() });

    if (this.state.locationPermission === "authorized") {
      this.getLocation();
    } else {
      Permissions.request("location").then(response => {
        this.setState({ locationPermission: response });
        if (response === "authorized") {
          this.getLocation();
        }
      });
    }

    //Envia FCM Token ao servidor
    this.checkPermission();
    this.createNotificationListeners();
    setTimeout(() => {
      this.sendFcmToken();
    }, 1000);
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  /******************** FCM *********************** */
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("@fcm_token", null);
    console.log(fcmToken);
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken);
        await AsyncStorage.setItem("@fcm_token", fcmToken);
      }
    }
  }

  async sendFcmToken() {
    let client = this.props.client;
    let token = await AsyncStorage.getItem("@fcm_token", null);
    console.log(token);
    if (client && token) {
      let params = { client: this.props.client, fields: { fcm: token } };
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
      console.log("permission rejected");
    }
  }

  async createNotificationListeners() {
    //.setSound('taxi');
    const channel = new firebase.notifications.Android.Channel(
      "fcm_default_channel",
      "TheFarma",
      firebase.notifications.Android.Importance.Max
    ).setDescription("TheFarma");
    firebase.notifications().android.createChannel(channel);

    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body } = notification;
        console.log("notificationListener", notification);
        this.handleFcmMessage(notification.data, title, body);
      });

    this.notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed(notification => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        console.log("notificationDisplayed", notification);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        console.log("notificationOpenedListener", notificationOpen);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    firebase
      .notifications()
      .getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          try {
            console.log("notificationOpen", notificationOpen);

            const action = notificationOpen.action;
            const notification: Notification = notificationOpen.notification;

            this.handleFcmMessage(notification.data);
          } catch (error) {
            console.log("notificationOpenError", error);
          }
        }
      });

    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log("MessageListener", message);
    });
  }

  handleFcmMessage(message = {}, title = null, body = null) {
    try {
      let data = JSON.parse(message.data);

      if (data.pedido) {
        return;
      }

      if (data.notificacao_id) {
        return;
      }

      if (title && body) {
        this.showAlert(title, body);
      }
    } catch (error) {
      console.log("Erro ao tratar notificação");
    }
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      { cancelable: false }
    );
  }

  /******************** END FCM *********************** */

  /** Private functions */
  getTitle() {
    let msg = "Bem vindo.";
    let now = new Date().getHours();
    if (now >= 6 && now < 12) {
      msg = `Bom dia`;
    }
    if (now >= 12 && now < 19) {
      msg = `Boa tarde`;
    }
    if (now >= 19 || now < 5) {
      msg = `Boa noite`;
    }

    let client = this.props.client;
    let name = client ? client.nome : "";
    name = name.split(" ")[0];
    if (name) msg = `Oi, ${name}`;
    return msg;
  }

  getLocation() {
    Permissions.check('location').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      if (response === 'authorized') {
        Geolocation.getCurrentPosition(
          position => {
            this.props.dispatch(getGeocodeAddress(position.coords));
            this.props.dispatch(updateLocation(this.props.uf, position.coords.latitude, position.coords.longitude));
          },
          error => this.setState({ error: error.message }),
          { enableHighAccuracy: false, timeout: 10000, maximumAge: 1000, distanceFilter: 10 }
        );
      }
    });
  }

  onSearch = showCamera => {
    this.props.navigation.navigate("SearchMedicine", { showCamera });
    this.getLocation();
  };

  showCart() {
    this.props.navigation.navigate({
      key: "cart1",
      routeName: "Cart",
      params: { title: "Cestinha" }
    });
  }

  showMenuScreen() {
    this.props.navigation.navigate({
      key: "profile1",
      routeName: "Profile",
      params: {}
    });
  }

  getPhoto() {
    let client = this.props.client;
    if (client && client.foto) {
      return { uri: client.foto };
    }
    return null;
  }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.nextPage) {
      let params = { client: this.props.client, url: this.props.nextPage };
      this.props.dispatch(getApresentationsNextPage(params));
    }
  };

  _renderItem = ({ item }) => <NotificationItem notificacao={item} />;

  renderFooter = () => {
    if (!this.props.isLoading) return null;
    return (
      <View style={{ alignItems: "center", paddingVertical: 16 }}>
        <ActivityIndicator color={'#00C7BD'} size={'large'}></ActivityIndicator>
      </View>
    );
  };

  getBackgroundScreen() {
    let index = Math.floor(Math.random() * 3) + 1;
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

  _onWillFocus() {
    this.setState({ bg: this.getBackgroundScreen() });
    StatusBar.setBarStyle("light-content");
  }

  _onWillBlur() {
    StatusBar.setBarStyle("dark-content");
  }

  render() {
    let state = this.state;
    console.log("Render -> Home", state);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>

        <NavigationEvents
          onWillFocus={payload => { this._onWillFocus() }}
          onWillBlur={payload => { this._onWillBlur() }}
        />

        <Image resizeMode={"cover"} style={styles.background} source={state.bg} />

        <LinearGradient
          colors={["rgba(255,255,255,0.00)", "rgba(0,0,0,0.48)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        >
          <View
            style={{
              paddingHorizontal: 22,
              marginBottom: 8,
              position: "absolute",
              left: 0,
              right: 0,
              top: 200,
              zIndex: 1000
            }}
          >
            <Text style={styles.title}>{this.getTitle()}</Text>
            <Text style={styles.subtitle}>{"Deseja algum medicamento?"}</Text>
            <TouchableOpacity
              style={[styles.searchBar, { justifyContent: "space-between" }]}
              onPress={() => { this.onSearch(false); }}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon name="search" size={24} color={"rgba(0,0,0,0.32)"} style={[{ marginRight: 12 }]} />
                <Text style={[styles.searchBarText, Platform.OS === "ios" ? {} : {}]} >
                  {"Nome do medicamento"}
                </Text>
              </View>
              <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { this.onSearch(true); }} >
                <Icon
                  name="barcode"
                  size={24}
                  color={"#000"}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
    error: state.notifications.error
  };
}

export default connect(mapStateToProps)(WelcomeScreen);
