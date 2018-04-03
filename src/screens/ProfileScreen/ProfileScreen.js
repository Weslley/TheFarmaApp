import React, { Component } from "react";
import { ScrollView, Image } from "react-native";
import { Container } from "native-base";

import { connect } from "react-redux";
import { getCities } from "../../actions/cities";

import { MenuScreen } from "../MenuScreen";
import { LoginScreen } from "../LoginScreen";

import { Components } from "../../helpers";

import styles from "./styles";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    let { state: { params } } = navigation;
    return {
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <Image source={require("../../assets/images/ic_user.png")} style={[styles.tabIcon, { tintColor }]} />
      ),
      tabBarLabel: "Perfil"
    };
  };

  componentDidMount() {
    this.props.dispatch(getCities());
  }

  /** Private functions */

  render() {
    return (
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      {Components.renderIfElse(this.props.client,
        <MenuScreen navigation={this.props.navigation} />,
        <LoginScreen navigation={this.props.navigation} />
      )}
    </Container>);
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    error: state.clients.error
  };
}

export default connect(mapStateToProps)(ProfileScreen);