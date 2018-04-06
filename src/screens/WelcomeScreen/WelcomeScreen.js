import React, { Component } from "react";
import { StatusBar, View, TouchableOpacity, Image } from "react-native";
import { Text, Button } from "native-base";
import Permissions from 'react-native-permissions';

import { connect } from "react-redux";
import { getCurrentClient } from "../../actions/clients"
import { updateLocation } from "../../actions/locations"

import { Header } from "../../layout/Header";
import { Container } from "../../layout/Container";

import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";
import styles from "./styles";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    //Solicita cliente logado
    this.props.dispatch(getCurrentClient());

    Permissions.checkMultiple(['camera', 'photo', 'location']).then(response => {
      this.setState({
        cameraPermission: response.camera,
        photoPermission: response.photo,
        locationPermission: response.location
      });
    });
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
    let clientName = this.props.client ? this.props.client.nome : "";
    if (clientName) {
      let now = new Date().getHours();
      if (now >= 6 && now < 12) {
        return `Bom dia, ${clientName}`;
      }
      if (now >= 12 && now < 19) {
        return `Boa tarde, ${clientName}`;
      }
      if (now >= 19 || now < 5) {
        return `Boa noite, ${clientName}`;
      }
    }
    return "Olá";
  }

  getLocation() {
    this.watchId = navigator.geolocation.watchPosition((position) => {
      this.props.dispatch(updateLocation(this.props.uf, position.coords.latitude, position.coords.longitude));
    },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  onSearch = () => {
    if (this.state.locationPermission === 'authorized') {
      this.props.navigation.navigate("SearchMedicine");
    } else {
      Permissions.request('location').then(response => {
        this.setState({ locationPermission: response });
        if (response === 'authorized') {
          this.getLocation();
        }
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 24 }}>
          <Image
            resizeMode={"cover"}
            style={styles.background}
            source={require("../../assets/images/background-home.png")} />

          <Header
            style={{ paddingHorizontal: 0, backgroundColor: "transparent" }}
            title={this.getTitle()}
          />

          <TouchableOpacity style={styles.searchBar} onPress={this.onSearch}>
            <Image source={require("../../assets/images/ic_search.png")} style={styles.icon} />
            <Text style={styles.text}>Qual medicamento você deseja?</Text>
            <Image source={require("../../assets/images/ic_barcode.png")} style={styles.icon} />
          </TouchableOpacity>

        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,
    uf: state.locations.uf,
  };
}

export default connect(mapStateToProps)(WelcomeScreen);
