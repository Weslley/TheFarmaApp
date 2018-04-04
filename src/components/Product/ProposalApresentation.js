import React, { Component } from "react";
import { View, Image } from "react-native";
import { Text, Button, Thumbnail, Icon } from "native-base";
import { TextMask } from "react-native-masked-text";

import { connect } from "react-redux";

import { Components } from "../../helpers";
import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class ProposalApresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    let apresentation = {}
    apresentation = this.props.cartItems.find(item => item.id === this.props.proposalItem.apresentacao);
    this.setState({ apresentation })
  }

  render() {
    return (
      <View style={styles.container}>
        {Components.renderIfElse(this.state.apresentation.imagem,
          <View style={styles.ImageContainer}>
            <Thumbnail style={styles.Image} square size={88} source={{ uri: this.state.apresentation.imagem }} />
          </View>,
          <View style={styles.ImageContainer}>
            <Image style={[styles.Image, { width: 88, height: 88 }]} source={imgDefault} />
          </View>
        )}

        <View style={styles.container1}>

          <Text style={[styles.ProductName, { width: "100%" }]}>{this.state.apresentation.produto.nome}</Text>
          <Text style={styles.ApresentationName}>{this.state.apresentation.nome}</Text>
          <Text style={styles.Maker} uppercase>{this.state.apresentation.produto.fabricante}</Text>

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

function mapStateToProps(state) {
  return {
    cartItems: state.carts.cartItems
  };
}

export default connect(mapStateToProps)(ProposalApresentation);
