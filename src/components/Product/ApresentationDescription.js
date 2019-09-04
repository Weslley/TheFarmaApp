import React, { Component } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { TextMask } from "react-native-masked-text";

import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";
import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class ApresentationDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPrice() {
    let apresentation = this.props.apresentation;
    let pmc = apresentation.pmc
    if (pmc && (pmc === "0, 00" || pmc === "0,00" || pmc === 0 || pmc === 0.0)) {
      return (
        <Text style={[styles.Price, { fontSize: 12, }]}>{"Preço indisponível"}</Text>
      )
    } else {
      return (
        <TextMask style={styles.Price} value={apresentation.pmc} type={"money"} options={{}} />
      )
    }
  }

  getPhoto() {
    let apresentation = this.props.apresentation;
    if (apresentation.imagem && apresentation.imagem !== null && apresentation.imagem !== {}) {
      let imagem = apresentation.imagem
      if (imagem.square_crop) {
        return (
          <Image style={[styles.Image, { width: 88, height: 88 }]} source={{ uri: imagem.square_crop }} />
        )
      }
    }
    return (
      <Image style={[styles.Image, { width: 88, height: 88 }]} source={imgDefault} />
    )
  }

  render() {
    let apresentation = this.props.apresentation;
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.ImageContainer} onPress={this.props.onPress} >
          {this.getPhoto()}
        </TouchableOpacity>

        <View style={styles.container1}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={styles.ApresentationName}>{apresentation.nome}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={styles.Maker} uppercase>{apresentation.produto.fabricante}</Text>
          </TouchableOpacity>

          <View style={styles.Footer}>
            <TouchableOpacity onPress={this.props.onPress}>{this.getPrice()}</TouchableOpacity>
            {Components.renderIfElse(
              this.props.showActions,
              <View style={styles.Actions}>
                <TouchableOpacity style={[styles.Button, { marginRight: 8 }]} onPress={this.props.onPressMinus} >
                  <Icon name="minus" size={24} color={"#000"} style={styles.Icon} />
                </TouchableOpacity>
                <Text style={styles.Quantity}>
                  {apresentation.quantity || 0}
                </Text>
                <TouchableOpacity style={styles.Button} onPress={this.props.onPressPlus} >
                  <Icon name="plus" size={24} color={"#000"} style={styles.Icon} />
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

export default ApresentationDescription;
