import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { Badge, Text } from "native-base";
import PropTypes from "prop-types";

import { Icon } from "../../components/Icon";
import { Components } from "../../helpers";
import styles from "./styles";

class ShoppingBagIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <Icon name="shopping-bag" color={"#000"} size={24} style={styles.icon}/>
        {this.props.value >= 1 ? <Badge style={styles.badge}>
          <Text style={styles.text}>{this.props.value}</Text>
        </Badge> : null}
      </TouchableOpacity>
    );
  }
}

ShoppingBagIcon.props = {
  value: PropTypes.number
};

export default ShoppingBagIcon;
