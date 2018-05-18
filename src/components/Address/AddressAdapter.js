import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Text } from "native-base";
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

  render() {
    return (
      <View style={[styles.background, { backgroundColor: this.props.backgroundColor, width: "100%" }]}>
        <View style={styles.container}>

          {Components.renderIf(this.props.address.nome_endereco,
            <View style={styles.header}>
              <Text style={styles.addressName}>{this.props.address.nome_endereco}</Text>
              {Components.renderIf(this.props.checked,
                <Icon name="check" color="#00C7BD" size={24} />
              )}
            </View>
          )}

          <View>
            <Text style={[styles.text, { marginBottom: 8 }]}>
              {`${this.props.address.logradouro}, ${this.props.address.numero}`}
            </Text>
            <Text style={styles.text}>
              {`${this.props.address.bairro.nome}`}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default AddressAdapter;