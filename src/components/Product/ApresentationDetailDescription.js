import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";
import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class ApresentationDetailDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPrice() {
    let pmc = this.props.apresentation.pmc
    if (pmc && (pmc === "0, 00" || pmc === "0,00" || pmc === 0 || pmc === 0.0)) {
      return (
        <Text style={[styles.Price, { fontSize: 12, }]}>{"Preço indisponível"}</Text>
      )
    } else {
      return (
        <TextMask style={styles.Price} value={this.props.apresentation.pmc} type={"money"} options={{}} />
      )
    }
  }

  render() {
    return <View style={{}}>
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={[styles.Maker, { fontSize: 12, marginBottom: 8 }]} uppercase>
          {this.props.apresentation.produto.fabricante}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.ApresentationName}>
          {this.props.apresentation.nome}
        </Text>
      </TouchableOpacity>

      <View style={[styles.Footer, { marginTop: 16, marginBottom: 16 }]}>
        <TouchableOpacity onPress={this.props.onPress}>{this.getPrice()}</TouchableOpacity>
        {Components.renderIfElse(this.props.showActions, <View style={styles.Actions}>
          <TouchableOpacity style={[styles.Button, { marginRight: 8 }]} onPress={this.props.onPressMinus}>
            <Icon name="minus" size={24} color={"rgba(0,0,0,0.60)"} style={styles.Icon} />
          </TouchableOpacity>
          <Text style={styles.Quantity}>
            {this.props.apresentation.quantity || 0}
          </Text>
          <TouchableOpacity style={styles.Button} onPress={this.props.onPressPlus}>
            <Icon name="plus" size={24} color={"#00C7BD"} style={styles.Icon} />
          </TouchableOpacity>
        </View>, <View />)}
      </View>
    </View>;
  }
}

export default ApresentationDetailDescription;
