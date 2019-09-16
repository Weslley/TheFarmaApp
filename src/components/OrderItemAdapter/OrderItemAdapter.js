import React, { Component } from "react";
import { View, Image, Text } from "react-native";
import { Thumbnail } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Icon } from "../Icon";

import { Components } from "../../helpers";
import styles from "./styles";

const imgDefault = require("../../assets/images/ic_default_medicine.png");
class OrderAdapter extends Component {
  static defaultProps = {
    iconSize: 24,
    iconColor: "#000",
    iconStyle: {}
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPhoto() {
    let apresentation = this.props.item.apresentacao;
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
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {this.getPhoto()}

            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text style={[styles.text, { marginBottom: 4 }]}>{this.props.item.apresentacao.produto.nome}</Text>
              <Text style={styles.apresentation}>{this.props.item.apresentacao.nome}</Text>
            </View>
          </View>

          <View>
            <Text style={[styles.text, { fontFamily: "Roboto-Medium" }]}>{this.props.item.quantidade}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default OrderAdapter;
