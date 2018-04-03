import React, { Component } from "react";
import { View, Image } from "react-native";

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFF" }}>
        {this.props.content}
      </View>
    );
  }
}

export default Splash;
