import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Icon } from "../Icon";

export default class IconWithBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      let badgeCount = this.props.badgeCount;
    return (
      <View style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
        {this.props.icon}
        {badgeCount >= 1 ? (
        <View style={{ position: "absolute", top: 3, right: 1, backgroundColor: "#FF1967", borderRadius: 100, paddingHorizontal: 5, paddingVertical: 2 }}>
            <Text style={{fontSize: 10, color: "#FFF" }}>{badgeCount}</Text>
        </View>

        ) : null}
      </View>
    );
  }
}
