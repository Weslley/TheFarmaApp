import React, { Component } from "react";
import { NavigationEvents } from 'react-navigation';
import { Container } from "native-base";

import { connect } from "react-redux";

import { MenuScreen } from "../MenuScreen";
import { LoginScreen } from "../LoginScreen";

import { Components } from "../../helpers";
import styles from "./styles";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionBack: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation);
    console.log(this.props);
    return { header: null }
  };

  /* 
  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.email) {
            this.setState({ emailError: nextProps.error.response.data.email[0] })
          }

          if (nextProps.error.response.data.facebook_id) {
            if (this.state.facebook_user) {
              let params = { login_type: 1, facebook_user: this.state.facebook_user }
              this.props.navigation.navigate({ key: 'email1', routeName: 'Email', params });
            }
          }

          if (nextProps.error.response.data.non_field_errors) {
            Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT, });
          }

          if (nextProps.error.response.data.detail) {
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
        }

        if (nextProps.error.message && nextProps.error.message === 'Network Error') {
          this.setState({ showNetworkError: true });
        }
      }

      if (nextProps && nextProps.client && this.state.actionBack) {
        this.onBack()
      }

    } catch (e) {
      console.log(e);
    }
  }
  */

  componentWillMount() {
    let params = this.props.navigation.state.params;
    let actionBack = params ? params.actionBack : null;
    this.setState({ actionBack })
  }

  componentDidMount() { }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  showLogin() {
    let client = this.props.client;
    if (!client) {
      this.props.navigation.navigate('Login')
    }
  }

  showHome() {
    let client = this.props.client;
    if (client) {
      this.props.navigation.navigate('Home')
    }
  }

  render() {
    let client = this.props.client;
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <NavigationEvents
          onWillFocus={payload => this.showLogin()}
        />
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
/*
  onDidFocus={payload => console.log('did focus', payload)}
  onWillBlur={payload => console.log('will blur', payload)}
  onDidBlur={payload => console.log('did blur', payload)}
*/