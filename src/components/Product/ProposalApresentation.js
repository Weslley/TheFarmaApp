import React, { Component } from "react";
import { View, Image } from "react-native";
import { Text, Button, Thumbnail, Icon } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Components } from "../../helpers";
import styles from "./styles";

const imgDefault = require("../../assets/images/ic_default_medicine.png");

class ProposalApresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    let apresentation = this.props.apresentation;
    let produto = apresentation.produto;

    let item = this.props.proposalItem;
    return (
      <View style={styles.container}>

        <View style={styles.ImageContainer}>
          {this.getPhoto()}
        </View>

        <View style={styles.container1}>

          <Text style={[styles.ProductName, { width: "100%" }]}>{ produto.nome }</Text>
          <Text style={styles.ApresentationName}>{ apresentation.nome}</Text>
          <Text style={styles.Maker} uppercase>{ produto.fabricante }</Text>

          <View style={styles.Footer}>
            <View>
              <TextMask style={styles.Price} value={ item.valor_unitario } type={"money"} />
            </View>

            {Components.renderIfElse(item.possui,
              <Text style={styles.Quantity}>{ item.quantidade || 0}</Text>,
              <View style={styles.TagContainerImcomplete}>
                <Text style={styles.TagTextImcomplete}>{"sem estoque"}</Text>
              </View>
            )}

          </View>
        </View>
      </View>
    );
  }
}

export default ProposalApresentation;
