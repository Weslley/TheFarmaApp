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
      <TouchableOpacity style={{ width: '100%' }} onPress={this.props.onPress}>
        <View style={styles.Container}>
          <View style={styles.Header}>
            <View>
              <Text style={styles.PharmaName}>Farmácia Mel</Text>
              {Components.renderIfElse(this.props.complete,
                <View style={styles.TagContainer}>
                  <Text style={styles.TagText}>{"Estoque completo"}</Text>
                </View>,
                <View style={styles.TagContainerImcomplete}>
                  <Text style={styles.TagTextImcomplete}>{"Estoque imcompleto"}</Text>
                </View>
              )}
            </View>
            <TextMask style={styles.Price} value="9,00" type={"money"} options={{}} />
          </View>

          <View>
            <View style={styles.InfoContainer}>
              <Icon name="place" size={30} color={"#000"}/>
              <Text style={styles.InfoTextBold}>
                100m
                <Text style={styles.InfoText}>
                  {" do endereço indicado"}
                </Text>
              </Text>
            </View>

            <View style={styles.InfoContainer}>
              <Icon name="clock" size={30} color={"#000"}/>
              <Text style={styles.InfoTextBold}>
                30 min
                <Text style={[styles.InfoText, { marginBottom: 0 }]}>
                  {" em média para entregar"}
                </Text>
              </Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  }
}

export default ProposalDescription;
