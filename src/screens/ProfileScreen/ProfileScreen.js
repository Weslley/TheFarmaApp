import React, { Component } from "react";
import { NavigationEvents } from 'react-navigation';
import { Container } from "native-base";

import { connect } from "react-redux";

import { MenuScreen } from "../MenuScreen";
import { LoginScreen } from "../LoginScreen";

import { Components } from "../../helpers";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actionBack: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null }
  };

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
          onWillFocus = { payload => this.showLogin()}
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