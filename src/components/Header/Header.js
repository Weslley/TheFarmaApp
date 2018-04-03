import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";

import styles from "./styles";
import { Components } from "../../helpers";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.actions}>
          {Components.renderIf(
            this.props.menuLeft,
            <View style={styles.menuLeft}>{this.props.menuLeft}</View>
          )}
          {Components.renderIf(
            this.props.menuRight,
            <View style={styles.menuRight}>{this.props.menuRight}</View>
          )}
        </View>
      </View>
    );
  }
}

export default Header;
