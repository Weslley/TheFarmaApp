import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Icon } from "../../components/Icon";
import LinearGradient from "react-native-linear-gradient";


import { Components } from "../../helpers";
import styles from "./styles";

class BottomBarV2 extends Component {

  static defaultProps = {
    quantity: 1,
    showActions: true,
    buttonTitle: "Adicionar"
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.container, { minHeight: 80, width: '100%' }]}>
        <View style={{ width: '48%' }}>
          {Components.renderIfElse(this.props.showActions, 
            <View style={styles.actions}>
              <TouchableOpacity style={[{}, { marginRight: 8 }]} onPress={this.props.onPressMinus}>
                <Icon name="minus" size={24} color={"#000"} style={styles.icon} />
              </TouchableOpacity>

              <Text style={[styles.quantity, {color: "#000000"}]}>
                {this.props.quantity}
              </Text>

              <TouchableOpacity style={{}} onPress={this.props.onPressPlus}>
                <Icon name="plus" size={24} color={"#00C7BD"} style={styles.icon} />
              </TouchableOpacity>
            </View>,
            <View />
          )}
        </View>

        <TouchableOpacity style={{width: '48%'}} onPress={this.props.onButtonPress}>
          <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14 }}>
            <Text style={styles.buttonText}>{this.props.buttonTitle}</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    );
  }
}

export default BottomBarV2;
