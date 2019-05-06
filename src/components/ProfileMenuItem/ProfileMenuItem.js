import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";

import { Icon } from "../Icon";

import { Components } from "../../helpers";
import styles from "./styles";

class ProfileMenuItem extends Component {
  static defaultProps = {
    iconSize: 24,
    iconColor: "#000",
    iconStyle: {},
    divider: false
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>

          {Components.renderIf(this.props.icon,
            <Icon
              style={[styles.icon, this.props.iconStyle]}
              name={this.props.icon}
              size={this.props.iconSize}
              color={this.props.iconColor} />
          )}

          <View style={{flex: 2 }}>
            <Text style={styles.text}>{this.props.text}</Text>
            {Components.renderIf(this.props.divider,
                <View style={{ borderBottomColor: "#EEEEEE", borderWidth: 0.5 }} />
            )}
          </View>

          {Components.renderIf(this.props.badge,
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{this.props.badge}</Text>
            </View>
          )}

        </View>
      </TouchableOpacity>
    );
  }
}

export default ProfileMenuItem;
