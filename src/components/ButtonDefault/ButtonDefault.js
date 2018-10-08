import React, { Component } from "react";
import { View, Text } from "react-native";
import { Button } from "native-base";

import { Icon } from "../Icon";
import { Components } from "../../helpers";
import styles from "./styles";
export default class ButtonDefault extends Component {
  static defaultProps = {
    iconPosition: 'right',
    style: {},
    contentStyle: {},
    textStyle: {},
    iconStyle: {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Button bordered dark style={[styles.button, this.props.style]} onPress={this.props.onPress}>
        <View style={[styles.buttonContent, this.props.contentStyle]}>

          {Components.renderIf(this.props.icon && this.props.iconPosition === "left",
            <Icon name={this.props.icon} size={24} color={"#FFF"} style={[styles.buttonIcon, { marginRight: 16 }, this.props.iconStyle]} />
          )}

          {Components.renderIf(this.props.text,
            <Text style={[styles.buttonText, this.props.textStyle]}>{this.props.text}</Text>
          )}

          {Components.renderIf(this.props.icon && this.props.iconPosition === "right",
            <Icon name={this.props.icon} size={24} color={"#FFF"} style={[styles.buttonIcon, this.props.iconStyle]} />
          )}
        </View>
      </Button>
    );
  }
}
