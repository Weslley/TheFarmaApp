import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Badge,Text } from "native-base";
import PropTypes from "prop-types";

import styles from "./styles";
import { Components } from "../../helpers";

class ShoppingBagIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Image source={require("../../assets/images/ic_shopping_bag.png")} style={styles.icon} />
        {this.props.value >= 1 ? <Badge style={styles.badge}>
            <Text style={styles.text}>{this.props.value}</Text>
          </Badge> : null}
      </TouchableOpacity>;
  }
}

ShoppingBagIcon.props = {
  value: PropTypes.number
};

export default ShoppingBagIcon;
