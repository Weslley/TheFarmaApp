import React, { Component } from "react";
import { View, Text } from "react-native";

import { Icon } from "../../components/Icon";

import { Components, CurrencyUtils } from "../../helpers";
import styles from "./styles";
class ProposalDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getName() {
    let pharmacy = this.props.proposal.farmacia;
    if (pharmacy.nome_fantasia.length > 20) {
      return `${pharmacy.nome_fantasia.substring(0, 17)}...`;
    }
    return pharmacy.nome_fantasia;
  }

  getPrice() {
    return CurrencyUtils.toMoney("" + this.props.proposal.valor_total_com_frete);
  }

  getFrete() {
    if (this.props.proposal.valor_frete) {
      return (
        <Text style={styles.Frete}>
          {` + ${CurrencyUtils.toMoney("" + this.props.proposal.valor_frete)}`}
        </Text>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.Header}>
          <View>
            <Text style={styles.PharmaName}>{this.getName()}</Text>
            {Components.renderIfElse(this.props.proposal.possui_todos_itens,
              <View style={styles.TagContainer}>
                <Text style={styles.TagText}>{"Estoque completo"}</Text>
              </View>,
              <View style={styles.TagContainerImcomplete}>
                <Text style={styles.TagTextImcomplete}>{"Estoque imcompleto"}</Text>
              </View>
            )}
          </View>
          <Text style={styles.Price}>
            {this.getPrice()}
          </Text>
        </View>

        <View>
          <View style={styles.InfoContainer}>
            <Icon name="place" size={18} color={"#000"} style={{ marginRight: 8 }} />
            <Text style={styles.InfoTextBold}>
              {this.props.proposal.farmacia.distancia}
              <Text style={styles.InfoText}>{" do endereço indicado"}</Text>
            </Text>
          </View>

          <View style={[styles.InfoContainer, { marginBottom: 8 }]}>
            <Icon name="clock-o" size={18} color={"#000"} style={{ marginRight: 8 }} />
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
