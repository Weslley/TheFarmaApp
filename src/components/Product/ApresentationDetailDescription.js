import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text, Button, Thumbnail, Icon } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Components } from "../../helpers";

import styles from "./styles";

const imgDefault = require("./images/ic_default_medicine.png");
class ApresentationDetailDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View style={{}}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={[styles.Maker, { fontSize: 12, marginBottom: 8 }]} uppercase>
            {this.props.apresentation.produto.fabricante}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.ApresentationName}>
            {this.props.apresentation.nome}
          </Text>
        </TouchableOpacity>

        <View style={[styles.Footer, { marginTop: 16, marginBottom: 16 }]}>
          <TouchableOpacity onPress={this.props.onPress}>
            <TextMask style={[styles.Price, { fontSize: 24 }]} value={this.props.apresentation.pmc} type={"money"} options={{}} />
          </TouchableOpacity>

          {Components.renderIfElse(this.props.showActions, <View style={styles.Actions}>
              <TouchableOpacity style={[styles.Button, { marginRight: 8 }]} onPress={this.props.onPressMinus}>
                <Icon name="remove" style={styles.Icon} />
              </TouchableOpacity>
              <Text style={styles.Quantity}>
                {this.props.apresentation.quantidade || 0}
              </Text>
              <TouchableOpacity style={styles.Button} onPress={this.props.onPressPlus}>
                <Icon name="add" style={styles.Icon} />
              </TouchableOpacity>
            </View>, <View />)}
        </View>
      </View>;
  }
}

export default ApresentationDetailDescription;
