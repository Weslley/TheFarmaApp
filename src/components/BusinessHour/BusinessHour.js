import React, { Component } from "react";
import { View } from "react-native";
import { Text } from "native-base";

import styles from "./styles";

class BusinessHour extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <Text style={styles.value}>{this.props.value}</Text>
      </View>
    );
  }
}

export default BusinessHour;
