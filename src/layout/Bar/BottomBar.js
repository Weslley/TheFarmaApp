import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { TextMask } from "react-native-masked-text";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";

import styles from "./styles";
import { Components } from "../../helpers";

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          {Components.renderIf(this.props.price,
            <View>
              <Text style={styles.label}>Total aproximado</Text>
              <TextMask style={styles.price} value={this.props.price} type={"money"} options={{}} />
            </View>
          )}
        </View>

        <TouchableOpacity onPress={this.props.onButtonPress}>
          <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14 }}>
            <Text style={styles.buttonText}>{this.props.buttonTitle}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

export default BottomBar;
