import React, { Component } from "react";
import { View, Image } from "react-native";

import { Text } from "native-base";
import { TextMask } from "react-native-masked-text";

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

const imgDefault = require("../../assets/images/ic_default_medicine.png");

class ProposalApresentationV2 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getPhoto() {
    let apresentation = this.props.apresentation;
    if (apresentation.imagem && apresentation.imagem !== null && apresentation.imagem !== {}) {
      return (<Image style={[styles.Image, { width: 64, height: 64 }]} source={{ uri: apresentation.imagem }} /> )
    }
    return (<Image style={[styles.Image, { width: 64, height: 64 }]} source={imgDefault} />)
  }

  render() {
    let item = this.props.proposalItem;

    let apresentation = this.props.apresentation;
    let produto = apresentation.produto;
    let nome = StringUtils.truncate(`${produto.nome} ${apresentation.nome}`,62)

    let styleDisable = item.possui? {} : styles.txtDisable
    return (
      <View style={{paddingVertical: 20}}>
        <View style={[styles.container, { paddingVertical: 0 }]}>
          <View style={styles.ImageContainer}>
            {this.getPhoto()}
          </View>

          <View style={styles.container1}>
            <Text style={[styles.ApresentationName, styleDisable]}>{nome}</Text>
            <View style={styles.Footer}>
              {Components.renderIfElse(item.possui,
                <TextMask style={styles.priceV2} value={ item.valor_unitario } type={"money"} />,
                <View/>
              )}
              {Components.renderIfElse(item.possui,
                <Text style={styles.Quantity}>{ `x${item.quantidade}`}</Text>,
                <View style={[styles.tag, styles.tagDisable]}>
                  <Text style={[styles.tagText, styles.tagDisableText]}>{"sem estoque"}</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          {Components.renderIfElse(item.possui && item.quantidade_inferior,
            <View style={[styles.tag, styles.tagDanger]}>
              <Text style={[styles.tagText, styles.tagDangerText]}>
                {"Estoque incompleto"}
              </Text>
            </View>,
            <View/>
          )}

          {Components.renderIfElse(item.possui && item.produto_pesquisado && item.produto_pesquisado!==produto.nome,
            <View style={[styles.tag, styles.tagWarning]}>
              <Text style={[styles.tagText, styles.tagWarningText]}>
                {`Similiar ao ${item.produto_pesquisado}`}
              </Text>
            </View>,
            <View/>
          )}
        </View>
        
      </View>
    );
  }
}

export default ProposalApresentationV2;
