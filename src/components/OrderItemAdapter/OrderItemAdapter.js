import React, { Component } from "react";
import { View, Image } from "react-native";
import { Text, Thumbnail } from "native-base";
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

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {Components.renderIfElse(this.props.item.apresentacao.imagem,
              <Thumbnail square size={40} source={{ uri: this.props.item.apresentacao.imagem }} />,
              <Image style={{ width: 40, height: 40 }} source={imgDefault} />
            )}

            <View style={{marginLeft: 16}}>
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
