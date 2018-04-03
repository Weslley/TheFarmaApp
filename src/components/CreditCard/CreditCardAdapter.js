import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "native-base";
import { Icon } from "../Icon";
import { Components } from "../../helpers";
import styles from "./styles";

class CreditCardAdapter extends Component {
  static defaultProps = {
    checked: false
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[styles.background, { backgroundColor: this.props.backgroundColor, width: "100%" }]}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.flag}>{this.props.creditCard.bandeira}</Text>
            {Components.renderIf(this.props.checked,
              <Icon name="ios-checkmark-empty" color="#00C7BD" size={30} />
            )}
          </View>
          <View>
            <Text style={[styles.text, { marginBottom: 8 }]}>
              {`**** **** **** ${this.props.creditCard.numero_cartao}`}
            </Text>
            <Text style={styles.text}>{this.props.creditCard.nome_proprietario}</Text>
          </View>
        </View>
      </View>);
  }

}

export default CreditCardAdapter;