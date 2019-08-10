import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text } from "native-base";

import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";
import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class ProductDescriptionV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPhoto() {
    let cartItem = this.props.item;
    if (cartItem.apresentations[0].imagem && cartItem.apresentations[0].imagem !== null && cartItem.apresentations[0].imagem !== {}) {
      let imagem = cartItem.apresentations[0].imagem
      if (imagem) {
        return (
          <Image style={[styles.Image, { width: 88, height: 88 }]} source={{ uri: imagem }} />
        )
      }
    }
    return (
      <Image style={[styles.Image, { width: 88, height: 88 }]} source={imgDefault} />
    )
  }

  render() {
    let cartItem = this.props.item;
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.ImageContainer} onPress={this.props.onPress}>
          {this.getPhoto()}
        </TouchableOpacity>

        <View style={styles.container1}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={[styles.ProductName, { width: "100%" }]}>{cartItem.product.nome}</Text>
            <Text uppercase style={styles.dosage}>{cartItem.dosage}</Text>
            <Text uppercase style={styles.dosage}>{cartItem.packing}</Text>
          </TouchableOpacity>

          <View style={styles.Footer}>
            <View/>

            <View style={styles.Actions}>
              <TouchableOpacity style={[styles.Button, { marginRight: 8 }]} onPress={this.props.onPressMinus}>
                <Icon name="minus" size={24} color={"#000000"} style={styles.Icon} />
              </TouchableOpacity>

              <Text style={styles.Quantity}>{cartItem.quantity || 1}</Text>

              <TouchableOpacity style={styles.Button} onPress={this.props.onPressPlus}>
                <Icon name="plus" size={24} color={"#00C7BD"} style={styles.Icon} />
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>
    );
  }
}

export default ProductDescriptionV2;
