import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, Button, Thumbnail, Icon } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Components } from "../../helpers";

import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class ProductDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
      
        <TouchableOpacity style={styles.ImageContainer} onPress={this.props.onPress}>
          {Components.renderIfElse(this.props.apresentation.imagem,
            <Thumbnail style={styles.Image} square size={88} source={{ uri: this.props.apresentation.imagem }} />,
            <Image style={[styles.Image, { width: 88, height: 88 }]} source={imgDefault} />
          )}
        </TouchableOpacity>

        <View style={styles.container1}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={[styles.ProductName, { width: "100%" }]}>{this.props.apresentation.produto.nome}</Text>
            <Text style={styles.ApresentationName}>{this.props.apresentation.nome}</Text>
            <Text style={styles.Maker} uppercase>{this.props.apresentation.produto.fabricante}</Text>
          </TouchableOpacity>

          <View style={styles.Footer}>
            <TouchableOpacity onPress={this.props.onPress}>
              <TextMask style={styles.Price} value={this.props.apresentation.pmc} type={"money"} options={{}} />
            </TouchableOpacity>

            {Components.renderIfElse(
              this.props.showActions,
              <View style={styles.Actions}>
                <TouchableOpacity style={[styles.Button, { marginRight: 8 }]} onPress={this.props.onPressMinus}>
                  <Icon name="remove" style={styles.Icon} />
                </TouchableOpacity>
                
                <Text style={styles.Quantity}>{this.props.apresentation.quantidade || 0}</Text>

                <TouchableOpacity style={styles.Button} onPress={this.props.onPressPlus}>
                  <Icon name="add" style={styles.Icon} />
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
