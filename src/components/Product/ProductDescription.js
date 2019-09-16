import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";
import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class ProductDescription extends Component {
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

  getPhoto() {
    let apresentation = this.props.apresentation;
    if (apresentation.imagem && apresentation.imagem !== null && apresentation.imagem !== {}) {
        return (
          <Image style={[styles.Image, { width: 88, height: 88 }]} source={{ uri: apresentation.imagem }} />
        )
    }
    return (
      <Image style={[styles.Image, { width: 88, height: 88 }]} source={imgDefault} />
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.ImageContainer} onPress={this.props.onPress}>
          {this.getPhoto()}
        </TouchableOpacity>

        <View style={styles.container1}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={[styles.ProductName, { width: "100%" }]}>{this.props.apresentation.produto.nome}</Text>
            <Text uppercase style={styles.dosage}>{this.props.apresentation.nome}</Text>
            <Text uppercase style={styles.dosage}>{this.props.apresentation.produto.fabricante}</Text>
          </TouchableOpacity>

          <View style={styles.Footer}>
            <View/>

            {Components.renderIfElse(
              this.props.showActions,
              <View style={styles.Actions}>
                <TouchableOpacity style={[styles.Button, { marginRight: 8 }]} onPress={this.props.onPressMinus}>
                  <Icon name="minus" size={24} color={"#000"} style={styles.Icon} />
                </TouchableOpacity>

                <Text style={styles.Quantity}>{this.props.apresentation.quantity || 0}</Text>

                <TouchableOpacity style={styles.Button} onPress={this.props.onPressPlus}>
                  <Icon name="plus" size={24} color={"#00C7BD"} style={styles.Icon} />
                </TouchableOpacity>
              </View>,
              null
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default ProductDescription;
