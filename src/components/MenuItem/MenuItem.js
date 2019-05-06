import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "../Icon";

import { Components } from "../../helpers";
import styles from "./styles";
class MenuItem extends Component {
  static defaultProps = {
    iconStyle: {},
    iconSize: 24,
    iconColor: "#000",
    style: {}
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          {Components.renderIf(this.props.icon,
            <Icon
              name={this.props.icon}
              size={this.props.iconSize}
              color={this.props.iconColor}
              style={this.props.iconStyle} />
          )}
          {Components.renderIf(this.props.text, <Text style={styles.text}>{this.props.text}</Text>)}
        </View>
      </TouchableOpacity>
    );
  }
}

export default MenuItem;
