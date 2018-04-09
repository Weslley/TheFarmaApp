import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, Button, Thumbnail, Icon } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Components } from "../../helpers";

import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class OrderItemAdapter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.ImageContainer}>
          {Components.renderIfElse(
            this.props.item.apresentacao.imagem,
            <Thumbnail style={styles.Image} square size={88} source={{ uri: this.props.item.apresentacao.imagem }} />,
            <Image style={[styles.Image, { width: 88, height: 88 }]} source={imgDefault} />
          )}
        </View>

        <View style={styles.container1}>
          <View>
            <Text style={[styles.ProductName, { width: "100%" }]}>{this.props.item.apresentacao.produto.nome}</Text>
            <Text style={styles.ApresentationName}>{this.props.item.apresentacao.nome}</Text>
            <Text style={styles.Maker} uppercase>{this.props.item.apresentacao.produto.fabricante}</Text>
          </View>

          <View style={styles.Footer}>
            <TextMask style={styles.Price} value={this.props.item.valor_unitario} type={"money"} options={{}} />
            <Text style={styles.Quantity}>{this.props.item.quantidade}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderItemAdapter;
