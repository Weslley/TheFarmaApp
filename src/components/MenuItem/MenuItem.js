import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../Icon";

import { Components } from "../../helpers";
import styles from "./styles";
class MenuItem extends Component {
  static defaultProps = {
    iconSize: 24,
    iconColor: "#000",
    iconStyle: {}
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <TouchableOpacity onPress={this.props.onPress}>
      <View style={styles.container}>
      
        {Components.renderIf(this.props.icon,
          <Icon
            style={this.props.iconStyle}
            name={this.props.icon}
            size={this.props.iconSize}
            color={this.props.iconColor} />
        )}

        {Components.renderIf(this.props.text, <Text style={styles.text}>{this.props.text}</Text>)}
      </View>
    </TouchableOpacity>;
  }
}

export default MenuItem;
