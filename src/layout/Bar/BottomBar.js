import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { TextMask } from "react-native-masked-text";

import LinearGradient from "react-native-linear-gradient";

import { Components } from "../../helpers";
import styles from "./styles";

class BottomBar extends Component {
  static defaultProps = {
    label: "Total",
    buttonStyle: {}
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, { minHeight: 80 }]}>
        {Components.renderIf(this.props.price > 0,
          <View>
            <Text style={styles.label}>{this.props.label}</Text>
            <TextMask style={styles.price} value={this.props.price} type={"money"} options={{}} />
          </View>
        )}

        <TouchableOpacity onPress={this.props.onButtonPress} style={this.props.buttonStyle} >
          <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14, textAlign: 'center' }}>
            <Text style={styles.buttonText}>{this.props.buttonTitle}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BottomBar;
