import React, { Component } from "react";
import { View, Image } from "react-native";
import { Text, Button, Thumbnail, Icon } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Components } from "../../helpers";
import styles from "./styles";
const imgDefault = require("./images/ic_default_medicine.png");
class ProposalApresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.ImageContainer}>
          {Components.renderIfElse(this.props.apresentation.imagem,
            <Thumbnail style={styles.Image} square size={88} source={{ uri: this.props.apresentation.imagem }} />,
            <Image style={[styles.Image, { width: 88, height: 88 }]} source={imgDefault} />
          )}
        </View>

        <View style={styles.container1}>

          <Text style={[styles.ProductName, { width: "100%" }]}>{this.props.apresentation.produto.nome}</Text>
          <Text style={styles.ApresentationName}>{this.props.apresentation.nome}</Text>
          <Text style={styles.Maker} uppercase>{this.props.apresentation.produto.fabricante}</Text>

          <View style={styles.Footer}>
            <View>
              <TextMask style={styles.Price} value={this.props.proposalItem.valor_unitario} type={"money"} />
            </View>

            {Components.renderIfElse(this.props.proposalItem.possui,
              <Text style={styles.Quantity}>
                {this.props.proposalItem.quantidade || 0}
              </Text>,
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
