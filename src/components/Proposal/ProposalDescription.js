import React, { Component } from "react";
import { View, Text } from "react-native";

import { Icon } from "../../components/Icon";

import { Components, CurrencyUtils } from "../../helpers";
import styles from "./styles";
class ProposalDescription extends Component {
  static defaultProps = {
    delivery: true
  };

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
    let price = CurrencyUtils.toMoney(
      "" + this.props.proposal.valor_total_com_frete
    );
    return price;
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
    let proposal = this.props.proposal;
    let delivery = this.props.delivery;
    return (
      <View style={styles.Container}>
        <View style={styles.Header}>
          <Text style={styles.PharmaName}>{this.getName()}</Text>
          <Text style={styles.Price}>{this.getPrice()}</Text>
        </View>

        <View>
          <View style={styles.InfoContainer}>
            <Icon
              name="place"
              size={18}
              color={"#000"}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.InfoTextBold}>
              {proposal.farmacia.distancia}
              <Text style={styles.InfoText}>{" do endereço indicado"}</Text>
            </Text>
          </View>

          {Components.renderIf(delivery,
            <View style={[styles.InfoContainer, { marginBottom: 10 }]}>
              <Icon
                name="clock-o"
                size={18}
                color={"#000"}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.InfoTextBold}>
                {proposal.farmacia.tempo_entrega}
                <Text style={[styles.InfoText, { marginBottom: 0 }]}>
                  {" em média para entregar"}
                </Text>
              </Text>
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {Components.renderIfElse(proposal.possui_todos_itens,
            <View style={styles.TagContainer}>
              <Text style={styles.TagText}>{"Estoque completo"}</Text>
            </View>,
            <View style={[styles.TagContainer, styles.TagContainerImcomplete]}>
              <Text style={[styles.TagText, styles.TagTextImcomplete]}>
                {"Estoque incompleto"}
              </Text>
            </View>
          )}
          <Text style={styles.view}>{"VISUALIZAR"}</Text>
        </View>
      </View>
    );
  }
}

export default ProposalDescription;
