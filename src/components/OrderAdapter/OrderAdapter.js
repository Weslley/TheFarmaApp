import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { TextMask } from "react-native-masked-text";

import { Icon } from "../Icon";
import { OrderItemAdapter } from "../OrderItemAdapter";

import { StatusPedido } from "../../models/enums"
import { Components, Date as DateUtils } from "../../helpers";
import styles from "./styles";

class OrderAdapter extends Component {
  static defaultProps = {
    iconSize: 24,
    iconColor: "#000",
    iconStyle: {}
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  _getOrderStatus() {
    let order = this.props.order;
    let status = StatusPedido[order.status][1];
    switch (order.status) {
      case 2:
      case 3:
      case 9:
        return (
          <View style={[styles.tag, styles.tagWarning]}>
            <Text style={[styles.tagText, styles.tagWarningText]}>{status}</Text>
          </View>
        )
      case 4:
      case 5:
        return (
          <View style={[styles.tag]}>
            <Text style={styles.tagText}>{status}</Text>
          </View>
        )
      case 6:
      case 7:
      case 8:
        return (
          <View style={[styles.tag, styles.tagDanger]}>
            <Text style={[styles.tagText, styles.tagDangerText]}>{status}</Text>
          </View>
        )
      default:
        return (<Text style={styles.text}>{status}</Text>)
    }
  }

  _keyExtractor = (item, index) => item.apresentacao.id.toString();

  _renderItem = ({ item }) => {
    if (item.status !== 4) {
      return (<OrderItemAdapter item={item} />);
    }
  }

  render() {
    return (
      <View style={{}}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <Text style={styles.text}>{DateUtils.toDate(this.props.order.log.data_criacao)}</Text>
          {this._getOrderStatus()}
        </View>

        <View style={{ marginBottom: 8 }}>
          <FlatList
            data={this.props.order.itens}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.text, { marginRight: 16 }]}>{"Total"}</Text>
            <TextMask style={styles.text} value={this.props.order.valor_bruto} type={"money"} options={{}} />
          </View>
        </View>

      </View>
    );
  }
}

export default OrderAdapter;
