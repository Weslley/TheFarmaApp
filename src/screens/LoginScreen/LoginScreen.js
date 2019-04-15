import React, { Component } from "react";
import {
  KeyboardAvoidingView,
  View,
  Image,
  Linking,
  TouchableOpacity,
  BackHandler
} from "react-native";
import { Text, Button } from "native-base";

import Snackbar from "react-native-snackbar";
import { NavigationActions, StackActions } from "react-navigation";

import { connect } from "react-redux";

import styles from "./styles";
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      facebook_id: null,

      emailError: null,
      passwordError: null,
      facebook_user: null,
      actionBack: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null, tabBarVisible: false };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (
          nextProps.error.response &&
          (nextProps.error.response.status >= 400 &&
            nextProps.error.response.status <= 403)
        ) {
          if (nextProps.error.response.data.email) {
            this.setState({
              emailError: nextProps.error.response.data.email[0]
            });
          }

          if (nextProps.error.response.data.facebook_id) {
            if (this.state.facebook_user) {
              let params = {
                login_type: 1,
                facebook_user: this.state.facebook_user
              };
              this.props.navigation.navigate({
                key: "email1",
                routeName: "Email",
                params
              });
            }
          }

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
          this.setState({ showNetworkError: true });
        }
      }

      if (nextProps && nextProps.client) {
        this.onBack();
      }
    } catch (e) {
      console.log(e);
    }
  };

  componentWillMount() {
    let params = this.props.navigation.state.params;
    let actionBack = params ? params.actionBack : null;
    this.setState({ actionBack });

    BackHandler.addEventListener("hardwareBackPress", this.onBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBack);
  }

  /** Private functions */
  onBack() {
    let props = this.props;
    try {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Tabs", params: {} })]
      });
      props.navigation.dispatch(resetAction);
    } catch (err) {
      console.log(err);
    }
    return true;
  }

  openTerms() {
    try {
      Linking.openURL("http://thefarma.com.br/termos_de_uso");
    } catch (error) {
      console.log(error);
      Snackbar.show({
        title: "Erro ao abrir os termos de uso.",
        duration: Snackbar.LENGTH_SHORT
      });
    }
  }

  openPoliticy() {
    try {
      Linking.openURL("http://thefarma.com.br/politica_de_privacidade");
    } catch (error) {
      console.log(error);
      Snackbar.show({
        title: "Erro ao abrir a política de privacidade.",
        duration: Snackbar.LENGTH_SHORT
      });
    }
  }

  showHome() {
    this.props.navigation.navigate("Home");
  }

  loginEmail() {
    this.props.navigation.navigate({
      key: "email1",
      routeName: "Email",
      params: { login_type: 0, actionBack: this.state.actionBack }
    });
  }

  loginPhone() {
    this.props.navigation.navigate({
      key: "phone1",
      routeName: "Phone",
      params: { login_type: 2, actionBack: this.state.actionBack }
    });
  }

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

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Image
          resizeMode={"cover"}
          style={styles.background}
          source={this.getBackgroundScreen()}
        />

        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: " rgba(56,191,192,0.88)",
            paddingHorizontal: 24,
            paddingTop: 64
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/images/logotipo-white.png")}
              style={styles.logo}
            />
          </View>

          <View style={{ marginBottom: 24 }}>
            <Button
              style={[styles.button]}
              transparent
              bordered
              onPress={() => this.loginPhone()}
            >
              <Text style={styles.buttonText} uppercase={false}>
                {"Logar"}
              </Text>
            </Button>

            <Button
              style={[
                styles.button,
                { backgroundColor: "rgba(0, 0, 0, 0.24)", marginBottom: 16 }
              ]}
              transparent
              onPress={() => this.showHome()}
            >
              <Text
                style={[styles.buttonText, { color: "#FFF" }]}
                uppercase={false}
              >
                {"Agora não"}
              </Text>
            </Button>

            <TouchableOpacity />
            <Text style={styles.InfoText}>
              Continuando, você concorda com os
              <Text
                style={[styles.InfoText, styles.InfoTextBold]}
                onPress={() => {
                  this.openPoliticy();
                }}
              >
                {" termos de uso "}
              </Text>{" "}
              e
              <Text
                style={[styles.InfoText, styles.InfoTextBold]}
                onPress={() => {
                  this.openPoliticy();
                }}
              >
                {" política de privacidade."}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    error: state.clients.error
  };
}

export default connect(mapStateToProps)(LoginScreen);
