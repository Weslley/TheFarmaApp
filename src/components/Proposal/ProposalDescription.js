import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Text } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";

import styles from "./styles";

class ProposalDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Header}>
          <View>
            <Text style={styles.PharmaName}>{this.props.proposal.farmacia.nome_fantasia}</Text>
            {Components.renderIfElse(this.props.proposal.possui_todos_itens,
              <View style={styles.TagContainer}>
                <Text style={styles.TagText}>{"Estoque completo"}</Text>
              </View>,
              <View style={styles.TagContainerImcomplete}>
                <Text style={styles.TagTextImcomplete}>{"Estoque imcompleto"}</Text>
              </View>
            )}
          </View>
          <TextMask style={styles.Price} value={`${parseFloat(this.props.proposal.valor_total).toFixed(2)}`} type={"money"} options={{}} />
        </View>

        <View>
          <View style={styles.InfoContainer}>
            <Icon name="place" size={18} color={"#000"} style={{marginRight: 8}} />
            <Text style={styles.InfoTextBold}>
              {this.props.proposal.farmacia.distancia}
              <Text style={styles.InfoText}>{" do endereço indicado"}</Text>
            </Text>
          </View>

          <View style={[styles.InfoContainer, { marginBottom: 8 }]}>
            <Icon name="clock-o" size={18} color={"#000"} style={{marginRight: 8}} />
            <Text style={styles.InfoTextBold}>
              {this.props.proposal.farmacia.tempo_entrega}
              <Text style={[styles.InfoText, { marginBottom: 0 }]}>{" em média para entregar"}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ProposalDescription;
