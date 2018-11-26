import React, { Component } from "react";
import { View, Text } from "react-native";

import { Icon } from "../Icon";

import { Components } from "../../helpers";
import styles from "./styles";

class AddressAdapter extends Component {
  static defaultProps = {
    checked: false
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  getLogradouro() {
    let address = this.props.address;
    if (address.logradouro && address.numero) {
      return `${address.logradouro}, ${address.numero}`;
    }
    return `${address.logradouro}`;
  }

  getBairro() {
    let address = this.props.address;
    if (address.bairro && address.cidade) {
      return `${address.bairro}, ${address.cidade.nome}`;
    }
    return `${address.bairro}`;
  }

  render() {
    let address = this.props.address;
    let checked = this.props.checked;
    return (
      <View style={[styles.background, { backgroundColor: this.props.backgroundColor, width: "100%" }]}>
        <View style={styles.container}>
          {Components.renderIf(address.nome_endereco,
            <View style={styles.header}>
              <Text style={[styles.addressName, (checked) ? { color: '#38BFC0' } : {}]}>
                {address.nome_endereco}
              </Text>
              {Components.renderIf(checked, <Icon name="check" color="#00C7BD" size={24} />)}
            </View>
          )}

          <View>
            <Text style={[styles.text, { marginBottom: 8 }]}>{this.getLogradouro()}</Text>
            <Text style={styles.text}>{this.getBairro()}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AddressAdapter;